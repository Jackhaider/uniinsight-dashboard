import asyncio
from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.services.rag_service import vector_store, extract_text_from_bytes, get_gemini_model, HAS_GEMINI
from app.api import deps
from app.models.user import User

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str

@router.get("/documents")
def list_documents(current_user: User = Depends(deps.get_current_user)):
    return vector_store.documents

@router.delete("/documents/{doc_id}")
def delete_document(doc_id: str, current_user: User = Depends(deps.get_current_active_admin)):
    vector_store.delete_document(doc_id)
    return {"message": "Document deleted successfully."}

@router.post("/upload_document")
async def upload_document(
    file: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_user)
):
    try:
        content = await file.read()
        size_bytes = len(content)
        text = extract_text_from_bytes(content, file.filename)
        
        if not text.strip() or "[Error" in text[:30]:
            raise HTTPException(status_code=400, detail=f"Failed to extract readable text. Details: {text[:100]}")
            
        import os
        file_type = os.path.splitext(file.filename)[1].replace(".", "").upper()
        doc_id, total_chunks = vector_store.add_document(
            filename=file.filename,
            file_type=file_type,
            size_bytes=size_bytes,
            text=text
        )
        return {
            "id": doc_id,
            "filename": file.filename,
            "file_type": file_type,
            "size_bytes": size_bytes,
            "total_chunks": total_chunks,
            "message": "Document indexed."
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/chat_document")
def chat_document(
    req: ChatRequest,
    current_user: User = Depends(deps.get_current_user)
):
    query = req.prompt
    role = current_user.role
    
    matches = vector_store.search_similar(query, top_k=3)
    context_chunks = []
    citations = []
    
    for m in matches:
        chunk_data = m["chunk"]
        context_chunks.append(chunk_data["text"])
        citation_entry = f"{chunk_data['filename']} (Relevance: {round(m['score'] * 100)}%)"
        if citation_entry not in citations:
            citations.append(citation_entry)
            
    context_text = "\n\n".join(context_chunks)
    
    gemini_model = get_gemini_model()
    use_mock = gemini_model is None
    
    prompt_instruction = f"""You are UniInsight's Academic RAG Assistant. 
You are helping a {role.upper()} (Student / Teacher / Parent / Admin) interact with their uploaded documents.

CONTEXT FROM UPLOADED DOCUMENTS:
--------------------------------
{context_text if context_text else 'NO UPLOADED DOCUMENT CONTENT MATCHED THIS QUERY.'}
--------------------------------

USER QUESTION: {query}

INSTRUCTIONS:
1. Provide a comprehensive, accurate answer relying ONLY on the provided document context above.
2. If the context does not contain relevant details, state: "I cannot find the answer in the uploaded documents."
3. Adapt your tone professionally to the user's role: {role.upper()}.
4. Explicitly reference which files you obtained the facts from (e.g., "[Source: Chapter1.pdf]").
"""

    async def response_streamer():
        if use_mock:
            yield "data: ⚠️ [Running in Local Vector Simulation Mode.]\n\n"
            await asyncio.sleep(0.3)
            
            if not context_chunks:
                yield f"data: I searched our indexed database but found no uploaded documents matching your query.\n\n"
            else:
                yield f"data: ### Academic Analysis (Local Vector Query)\n\n"
                for cit in citations:
                    yield f"data: - {cit}\n\n"
        else:
            try:
                response = gemini_model.generate_content(prompt_instruction, stream=True)
                for chunk in response:
                    if chunk.text:
                        safe_chunk = chunk.text.replace("\n", "\\n").replace("\r", "")
                        yield f"data: {safe_chunk}\n\n"
                        await asyncio.sleep(0.01)
            except Exception as e:
                yield f"data: 🔴 Error calling Gemini LLM: {str(e)}\n\n"

    return StreamingResponse(response_streamer(), media_type="text/event-stream")
