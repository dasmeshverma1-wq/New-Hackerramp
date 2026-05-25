import re

with open('index.html', 'r', encoding='utf-8') as f: 
    text = f.read()

# Replace style object properties that use Press Start 2P
text = re.sub(r"fontFamily:\s*\"'Press Start 2P',\s*monospace\",?\s*", "", text)
text = re.sub(r"style=\{\{fontFamily:\"'Press Start 2P', monospace\"\}\}", "", text)

with open('index.html', 'w', encoding='utf-8') as f: 
    f.write(text)
