import os

with open("index (1).html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update Fun Zone UI
old_funzone = """      <div className="bg-[#18181b] text-white rounded-[3px] overflow-hidden">
        <PageIntro
          dark
          eyebrow="Fun Zone"
          title="Memes, trivia, and tiny chaos breaks."
          description="A live corner for quick laughs, leaderboard runs, and bite-sized challenges between build sessions."
          actions={['Meme Wall','Trivia Run','Daily Sparks','Leaderboard'].map(item=>(
            <span key={item} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] font-[800]">{item}</span>
          ))}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/10">
            <div className="p-5 border-r border-b border-white/10">
              <p className="text-[32px] font-[900] leading-none">{quizzes.length}</p>
              <p className="text-[11px] text-[#a1a1aa] font-[800] mt-2 uppercase tracking-[0.12em]">Questions</p>
            </div>
            <div className="p-5 border-b border-white/10">
              <p className="text-[32px] font-[900] leading-none">{memes.length}</p>
              <p className="text-[11px] text-[#a1a1aa] font-[800] mt-2 uppercase tracking-[0.12em]">Memes</p>
            </div>
            <div className="p-5 border-r border-white/10">
              <p className="text-[32px] font-[900] leading-none">{bestScore}</p>
              <p className="text-[11px] text-[#a1a1aa] font-[800] mt-2 uppercase tracking-[0.12em]">Top Score</p>
            </div>
            <div className="p-5">
              <p className="text-[32px] font-[900] leading-none">{totalReactions}</p>
              <p className="text-[11px] text-[#a1a1aa] font-[800] mt-2 uppercase tracking-[0.12em]">Reactions</p>
            </div>
        </div>
      </div>"""

new_funzone = """      <div className="bg-white text-[#18181b] border border-[#e4e4e7] rounded-[3px] overflow-hidden">
        <PageIntro
          eyebrow="Fun Zone"
          title="Memes, trivia, and tiny chaos breaks."
          description="A live corner for quick laughs, leaderboard runs, and bite-sized challenges between build sessions."
          actions={['Meme Wall','Trivia Run','Daily Sparks','Leaderboard'].map(item=>(
            <span key={item} className="px-3 py-1.5 rounded-full bg-[#f4f4f5] text-[#18181b] border border-[#e4e4e7] text-[11px] font-[800]">{item}</span>
          ))}
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-[#e4e4e7]">
            <div className="p-5 border-r border-b lg:border-b-0 border-[#e4e4e7]">
              <p className="text-[32px] font-[900] leading-none">{quizzes.length}</p>
              <p className="text-[11px] text-[#71717a] font-[800] mt-2 uppercase tracking-[0.12em]">Questions</p>
            </div>
            <div className="p-5 border-b lg:border-b-0 lg:border-r border-[#e4e4e7]">
              <p className="text-[32px] font-[900] leading-none">{memes.length}</p>
              <p className="text-[11px] text-[#71717a] font-[800] mt-2 uppercase tracking-[0.12em]">Memes</p>
            </div>
            <div className="p-5 border-r border-[#e4e4e7]">
              <p className="text-[32px] font-[900] leading-none">{bestScore}</p>
              <p className="text-[11px] text-[#71717a] font-[800] mt-2 uppercase tracking-[0.12em]">Top Score</p>
            </div>
            <div className="p-5">
              <p className="text-[32px] font-[900] leading-none">{totalReactions}</p>
              <p className="text-[11px] text-[#71717a] font-[800] mt-2 uppercase tracking-[0.12em]">Reactions</p>
            </div>
        </div>
      </div>"""

code = code.replace(old_funzone, new_funzone)

# 2. Update Nav to include mobile header
old_nav_start = """function Nav({ view, setView, user, onLogin, onLogout }) {
  return (
    <nav className="fixed top-4 inset-x-0 z-40 px-4 pointer-events-none">
      <div className="max-w-[1400px] mx-auto pointer-events-auto">
        <div className="flex items-center justify-between gap-4 bg-white/95 border border-[#ebebec] rounded-none px-4 py-3 shadow-sm" style={{backdropFilter:'blur(20px)'}}>"""

new_nav_start = """function Nav({ view, setView, user, onLogin, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-4 inset-x-0 z-40 px-4 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-auto">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between gap-4 bg-white/95 border border-[#ebebec] px-4 py-3 shadow-sm" style={{backdropFilter:'blur(20px)'}}>"""

code = code.replace(old_nav_start, new_nav_start)

old_nav_end = """        </div>
      </div>
    </nav>
  );
}"""

new_nav_end = """        </div>

          {/* Mobile Nav Header */}
          <div className="md:hidden flex items-center justify-between bg-white/95 border border-[#ebebec] px-4 py-3 shadow-sm" style={{backdropFilter:'blur(20px)'}}>
            <button onClick={() => setMobileOpen(true)} className="p-1 pointer-events-auto text-[#18181b]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            
            <div className="flex flex-col items-center">
              <img src="https://assets.myntassets.com/assets/images/2026/MARCH/16/gsGQkvMo_2a60944801ac4ed6a49bf2b65c883b10.png" alt="Myntra" className="h-[20px] w-auto object-contain mb-1" />
              <div style={{fontFamily:"'Press Start 2P', monospace", lineHeight:1.2, textAlign:'center'}}>
                <div className="text-[7px] text-[#0d0d0d]">TECH WEEK</div>
              </div>
            </div>

            <div className="w-[32px] flex items-center justify-end pointer-events-auto">
              {user && (
                <button onClick={()=>setView('notifications')} className={`text-[16px] ${view==='notifications'?'text-[#3333FF]':'text-[#a1a1aa]'}`}>
                  🔔
                </button>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* Mobile Full Screen Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden fade-up">
          <div className="p-4 flex items-center justify-between border-b border-[#ebebec]">
            <button onClick={() => setMobileOpen(false)} className="p-1 text-[#18181b]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
             {NAV_ITEMS
                .filter(item => item.id !== 'admin' || (user && user.role === 'coordinator'))
                .map(item=>(
                <button key={item.id} onClick={()=>{setView(item.id); setMobileOpen(false);}}
                  className={`block w-full text-left py-4 text-[18px] font-[800] border-b border-[#f4f4f5] ${view===item.id?'text-[#3333FF]':'text-[#18181b]'}`}>
                  {item.label}
                </button>
             ))}
          </div>
          <div className="p-6 border-t border-[#ebebec] bg-[#f9f9fa]">
             {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#3333FF] flex items-center justify-center shadow-sm">
                      <span className="text-[14px] font-bold text-white">{initials(user.name)}</span>
                    </div>
                    <div>
                      <p className="text-[14px] font-bold text-[#18181b]">{user.name.split(' ')[0]}</p>
                      <p className="text-[12px] text-[#71717a]">{user.dept}</p>
                    </div>
                  </div>
                  <button onClick={()=>{onLogout(); setMobileOpen(false);}} className="text-[12px] font-bold text-[#a1a1aa] hover:text-[#52525b] uppercase tracking-wide">Sign out</button>
                </div>
             ) : (
                <button onClick={()=>{onLogin(); setMobileOpen(false);}} className="w-full py-4 bg-[#18181b] text-white text-[14px] font-bold rounded-[3px]">
                  Sign in
                </button>
             )}
          </div>
        </div>
      )}
    </>
  );
}"""

code = code.replace(old_nav_end, new_nav_end)

with open("index (1).html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated fun zone UI and mobile nav!")
