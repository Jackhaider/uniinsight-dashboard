import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replacements mapping
    replacements = [
        (r"background:\s*'rgba\(0,0,0,0\.2\)'", "background: 'var(--bg-main)'"),
        (r"background:\s*'rgba\(255,\s?255,\s?255,\s?0\.05\)'", "background: 'var(--bg-hover)'"),
        (r"background:\s*'rgba\(255,\s?255,\s?255,\s?0\.03\)'", "background: 'var(--bg-surface)'"),
        (r"background:\s*'rgba\(255,\s?255,\s?255,\s?0\.02\)'", "background: 'var(--bg-main)'"),
        (r"border:\s*'1px solid rgba\(255,\s?255,\s?255,\s?0\.1\)'", "border: '1px solid var(--border-subtle)'"),
        (r"border:\s*'1px solid rgba\(255,\s?255,\s?255,\s?0\.05\)'", "border: '1px solid var(--border-subtle)'"),
        (r"borderBottom:\s*'1px solid rgba\(255,\s?255,\s?255,\s?0\.05\)'", "borderBottom: '1px solid var(--border-subtle)'"),
        (r"color:\s*'white'", "color: 'var(--text-primary)'"),
        (r"color:\s*'#111827'", "color: 'var(--text-primary)'"), # Fixing tooltips contentStyle backgrounds? wait, tooltip bg should be white.
        (r"border:\s*'1px solid #374151'", "border: '1px solid var(--border-strong)'"),
        (r"CartesianGrid.*?stroke=\"rgba\(255,255,255,0\.05\)\"", 'CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} '),
        (r"background:\s*'linear-gradient\(.*?\)'", "background: 'var(--bg-surface)'"), # aggressively strip linear gradients for flat cards
        (r"color:\s*'#e5e7eb'", "color: 'var(--text-primary)'"),
        (r"backdropFilter:\s*'blur\(.*?\)'", ""), # remove inline blurs
        (r"WebkitBackdropFilter:\s*'blur\(.*?\)'", "")
    ]

    new_content = content
    for pattern, repl in replacements:
        new_content = re.sub(pattern, repl, new_content)
        
    # Tooltip specific fix
    new_content = re.sub(r"contentStyle=\{\{ background: '#111827', border: '1px solid var\(--border-strong\)', borderRadius: '8px' \}\}", "contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px', color: '#0f172a' }}", new_content)
    
    # Custom tweaks for Tooltip with cursor
    new_content = re.sub(r"cursor=\{\{fill: 'rgba\(255,255,255,0\.05\)'\}\}", "cursor={{fill: '#f1f5f9'}}", new_content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

def main():
    target_dir = os.path.join("src", "pages")
    for root, dirs, files in os.walk(target_dir):
        for file in files:
            if file.endswith(".jsx"):
                process_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
