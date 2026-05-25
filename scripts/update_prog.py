import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Add state variables
state_vars = '''  const [awardQ,      setAwardQ]      = useState('');
  const [progQ,       setProgQ]       = useState('');
  const [progPage,    setProgPage]    = useState(1);'''

text = text.replace("  const [awardQ,      setAwardQ]      = useState('');", state_vars)

# 2. Replace Team Progress block
old_block_pattern = r"\{\/\* Team Progress \*\/\}.*?\{mTab==='progress' && \(\s*<div className=\"fade-up overflow-x-auto\">\s*<table.*?</table>\s*</div>\s*\)\}"
old_block_match = re.search(old_block_pattern, text, re.DOTALL)

if old_block_match:
    old_block = old_block_match.group(0)
    
    new_block = '''{/* Team Progress */}
          {mTab==='progress' && (
            <div className="fade-up space-y-4">
              <div className="flex justify-end">
                <div className="relative w-full max-w-sm">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--mute-3)] text-[12px]">🔍</span>
                  <input value={progQ} onChange={e=>{setProgQ(e.target.value); setProgPage(1);}}
                    placeholder="Search teams..."
                    className="w-full bg-white border border-[color:var(--line-2)] focus:border-[color:var(--accent)] rounded-[3px] pl-8 pr-3 py-2 text-[13px] text-[color:var(--ink)] placeholder-[color:var(--mute-4)] outline-none transition-colors" />
                  {progQ && <button onClick={()=>{setProgQ(''); setProgPage(1);}} className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--mute-3)] hover:text-[color:var(--mute-2)] text-[14px]">×</button>}
                </div>
              </div>
              <div className="overflow-x-auto border border-[color:var(--line)]">
                <table className="w-full min-w-[540px]">
                  <thead>
                    <tr className="border-b border-[color:var(--line)]">
                      {['Team','Git Repo','Sandbox','API Keys','InfoSec','Done'].map((h,i)=>(
                        <th key={i} className={`py-3 px-4 text-[10px] text-[color:var(--mute-3)] uppercase tracking-[0.1em] font-semibold ${i===0?'text-left':'text-center'}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const filtered = prog.filter(t=>!progQ||t.name.toLowerCase().includes(progQ.toLowerCase()));
                      const totalPages = Math.max(1, Math.ceil(filtered.length/JUDGE_PAGE_SIZE));
                      const page = Math.min(progPage, totalPages);
                      const slice = filtered.slice((page-1)*JUDGE_PAGE_SIZE, page*JUDGE_PAGE_SIZE);
                      return slice.map(t=>{
                        const checks=[t.git,t.sandbox,t.api,t.infosec];
                        const pct=Math.round(checks.filter(Boolean).length/4*100);
                        return (
                          <tr key={t.id} className="border-b border-[#f7f7f8] hover:bg-[color:var(--paper)]">
                            <td className="py-3.5 px-4"><p className="text-[14px] font-medium text-[color:var(--ink)]">{t.name}</p><p className="text-[11px] text-[color:var(--mute-3)]">{t.members.length} members</p></td>
                            {checks.map((c,i)=>(
                              <td key={i} className="py-3.5 px-4 text-center">
                                <span className={`text-[13px] font-semibold ${c?'text-[#22c55e]':'text-[color:var(--line-2)]'}`}>{c?'✓':'○'}</span>
                              </td>
                            ))}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 prog"><div className="prog-fill" style={{width:`${pct}%`,background:pct===100?'#22c55e':pct>=50?'#f97316':'#fbbf24'}} /></div>
                                <span className="text-[11px] text-[color:var(--mute-3)] w-7">{pct}%</span>
                              </div>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              {(() => {
                const filtered = prog.filter(t=>!progQ||t.name.toLowerCase().includes(progQ.toLowerCase()));
                const totalPages = Math.max(1, Math.ceil(filtered.length/JUDGE_PAGE_SIZE));
                if(totalPages <= 1) return null;
                const page = Math.min(progPage, totalPages);
                return (
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[12px] text-[color:var(--mute-3)]">Page {page} of {totalPages} · {filtered.length} teams</p>
                    <div className="flex gap-1">
                      <Btn variant="ghost" className="text-[12px] py-1.5 px-3" onClick={()=>setProgPage(1)} disabled={page===1}>«</Btn>
                      <Btn variant="ghost" className="text-[12px] py-1.5 px-3" onClick={()=>setProgPage(p=>Math.max(1,p-1))} disabled={page===1}>‹ Prev</Btn>
                      {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
                        const start = Math.max(1, Math.min(page-2, totalPages-4));
                        const p = start+i;
                        return p<=totalPages && (
                          <button key={p} onClick={()=>setProgPage(p)}
                            className={`w-8 h-8 text-[12px] font-semibold btn ${p===page?'bg-[color:var(--ink)] text-white':'bg-white border border-[color:var(--line-2)] text-[color:var(--mute-2)] hover:bg-[color:var(--paper)]'}`}>{p}</button>
                        );
                      })}
                      <Btn variant="ghost" className="text-[12px] py-1.5 px-3" onClick={()=>setProgPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages}>Next ›</Btn>
                      <Btn variant="ghost" className="text-[12px] py-1.5 px-3" onClick={()=>setProgPage(totalPages)} disabled={page===totalPages}>»</Btn>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}'''
    
    text = text.replace(old_block, new_block)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(text)
    print("Successfully replaced.")
else:
    print("Could not find the Team Progress block to replace.")
