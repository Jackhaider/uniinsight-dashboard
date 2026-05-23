/**
 * UniInsight RAG Service
 * Connects the Frontend to the FastAPI RAG Document Chat Engine
 */

import { apiFetch } from '../utils/api';

export const ragService = {
  /**
   * Fetch all uploaded documents
   */
  async listDocuments() {
    try {
      const response = await apiFetch('/rag/documents');
      if (!response.ok) throw new Error('Failed to retrieve documents');
      return await response.json();
    } catch (error) {
      console.error('Error fetching documents:', error);
      return [];
    }
  },

  /**
   * Upload an academic file (PDF, DOCX, PPTX, TXT)
   * @param {File} file - The file object from input or dropzone
   */
  async uploadDocument(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiFetch('/rag/upload_document', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload document');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  /**
   * Delete an indexed document
   * @param {string} docId - The unique ID of the document
   */
  async deleteDocument(docId) {
    try {
      const response = await apiFetch(`/rag/documents/${docId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete document');
      return await response.json();
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  /**
   * Query the RAG document assistant with SSE (Server-Sent Events) streaming
   */
  async streamChat(prompt, role, onChunk, onError, onDone) {
    try {
      const response = await apiFetch('/rag/chat_document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, role }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const payload = trimmed.substring(6).replace(/\\n/g, '\n');
            onChunk(payload);
          }
        }
      }

      if (buffer) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith('data: ')) {
          const payload = trimmed.substring(6).replace(/\\n/g, '\n');
          onChunk(payload);
        }
      }

      onDone();
    } catch (error) {
      console.error('Stream chat connection error:', error);
      onError(error);
    }
  },

  /**
   * Query the global Copilot assistant with SSE streaming
   */
  async streamCopilotChat(prompt, role, userName, currentRoute, onChunk, onError, onDone) {
    try {
      const response = await apiFetch('/copilot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, role, userName, currentRoute }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;

        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith('data: ')) {
            const payload = trimmed.substring(6).replace(/\\n/g, '\n');
            onChunk(payload);
          }
        }
      }

      if (buffer) {
        const trimmed = buffer.trim();
        if (trimmed.startsWith('data: ')) {
          const payload = trimmed.substring(6).replace(/\\n/g, '\n');
          onChunk(payload);
        }
      }

      onDone();
    } catch (error) {
      console.error('Stream Copilot connection error:', error);
      onError(error);
    }
  },

  /**
   * Fetch platform-wide analytics for indexed materials
   */
  async getAnalytics() {
    try {
      const response = await apiFetch('/rag/analytics');
      if (!response.ok) throw new Error('Failed to retrieve analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching RAG analytics:', error);
      return {
        total_documents: 0,
        total_chunks: 0,
        total_size_bytes: 0,
        file_type_distribution: {}
      };
    }
  }
};
