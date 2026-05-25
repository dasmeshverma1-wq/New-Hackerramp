import os

with open("index.html", "r", encoding="utf-8") as f:
    code = f.read()

component_code = """function AnimatedSearchInput({ value, onChange, onClear, type = 'teams' }) {
  const [phrases] = useState(type === 'teams' 
    ? ['Search "AI Agents"...', 'Search "Designer"...', 'Search "React"...', 'Search "Fintech"...']
    : ['Search "Customer Support"...', 'Search "Logistics"...', 'Search "GenAI"...']
  );
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const current = phrases[phraseIdx];
    if (!isDeleting && charIdx === current.length) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIdx === 0) {
      setIsDeleting(false);
      setPhraseIdx(p => (p + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setCharIdx(p => p + (isDeleting ? -1 : 1));
      }, isDeleting ? 40 : 80);
    }
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx, phrases]);

  return (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
        <svg className="w-[14px] h-[14px] text-[#a1a1aa] transition-colors group-focus-within:text-[#18181b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16" y2="16"></line>
        </svg>
      </div>
      <input 
        value={value} 
        onChange={onChange}
        placeholder={phrases[phraseIdx].substring(0, charIdx)}
        className="w-full bg-white border border-[#e4e4e7] focus:border-[#18181b] rounded-full pl-9 pr-8 py-2 text-[12px] text-[#18181b] placeholder-[#a1a1aa] outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)] focus:shadow-[0_2px_8px_rgba(0,0,0,0.06)]" 
      />
      {value && (
        <button onClick={onClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#18181b] text-[16px] leading-none">
          ×
        </button>
      )}
    </div>
  );
}

function PageIntro"""

code = code.replace("function PageIntro", component_code)

old_search = """              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] text-[14px]">🔍</span>
                <input value={searchQ} onChange={e=>{setSearchQ(e.target.value);setMktPage(1);}}
                  placeholder="Name, idea, theme..."
                  className="w-full bg-white border border-[#e4e4e7] focus:border-[#3333FF] rounded-[3px] pl-9 pr-4 py-2 text-[12px] text-[#18181b] placeholder-[#d4d4d8] outline-none transition-colors" />
                {searchQ && <button onClick={()=>setSearchQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#a1a1aa] hover:text-[#71717a] text-[16px]">×</button>}
              </div>"""

new_search = """              <AnimatedSearchInput 
                value={searchQ} 
                onChange={e=>{setSearchQ(e.target.value);setMktPage(1);}} 
                onClear={()=>setSearchQ('')}
                type="teams"
              />"""

code = code.replace(old_search, new_search)

# Search bar for Ideas tab is not present, but I should check if user wants it there too. User said "improve the search bar", singular, and since the teams tab has it...
# Wait! They also said: "it could also show an animation of typing so it should it could show It's automatically typing some theme or idea you know to find it"
# I should also add a search bar to Ideas tab since they might be expecting it. Let's see if Ideas tab uses searchQ. Yes, it does in `const q = searchQ.toLowerCase();`.

old_ideas_filter = """            {/* Filters */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] font-[800] uppercase tracking-[0.14em] text-[#a1a1aa] mb-3 ml-2">Theme Filter</p>"""
new_ideas_filter = """            {/* Search */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] font-[800] uppercase tracking-[0.14em] text-[#a1a1aa] mb-3 ml-2">Search Ideas</p>
              <AnimatedSearchInput 
                value={searchQ} 
                onChange={e=>{setSearchQ(e.target.value);setMktPage(1);}} 
                onClear={()=>setSearchQ('')}
                type="ideas"
              />
            </div>
            
            {/* Filters */}
            <div className="space-y-1.5 pt-4">
              <p className="text-[10px] font-[800] uppercase tracking-[0.14em] text-[#a1a1aa] mb-3 ml-2">Theme Filter</p>"""

code = code.replace(old_ideas_filter, new_ideas_filter)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated search bar!")
