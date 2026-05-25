import os

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

# The old Hero Section
old_hero = """      {/* ── HERO ── */}
      <div className="overflow-hidden">

        {/* Myntra presents — top center */}
        <div className="flex justify-center pt-10 pb-2">
          <div className="flex items-center gap-2">
            <img src="https://assets.myntassets.com/assets/images/2026/MARCH/16/gsGQkvMo_2a60944801ac4ed6a49bf2b65c883b10.png"
              alt="Myntra" className="h-7 w-auto object-contain" />
            <span className="text-[11px] text-[color:var(--mute-3)] tracking-[0.22em] uppercase font-semibold">Presents</span>
          </div>
        </div>

        {/* TECH  |  wave cards  |  WEEK */}
        <div className="relative flex items-center justify-between px-6 sm:px-10" style={{minHeight:'300px'}}>

          {/* TECH */}
          <div className="flex-shrink-0 select-none hero-in" style={{animationDelay:'0ms'}}>
            <span style={{fontSize:'clamp(22px,4.5vw,64px)', lineHeight:1, color:'#0d0d0d', display:'block', letterSpacing:'-0.02em'}}>
              TECH
            </span>
          </div>

          {/* Wave of cards — center */}
          <div className="flex-1 hero-in" style={{animationDelay:'120ms'}}>
            <WaveCards />
          </div>

          {/* WEEK */}
          <div className="flex-shrink-0 select-none hero-in" style={{animationDelay:'0ms'}}>
            <span style={{fontSize:'clamp(22px,4.5vw,64px)', lineHeight:1, color:'#0d0d0d', display:'block', letterSpacing:'-0.02em'}}>
              WEEK
            </span>
          </div>
        </div>

        {/* CTA area — below wave */}
        <div className="flex flex-col items-center gap-5 pb-12 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[color:var(--line-2)] text-[color:var(--mute-1)] text-[12px] font-medium" style={{borderRadius:'999px'}}>
            <span className="w-2 h-2 rounded-full bg-[#f97316] flex-shrink-0" style={{boxShadow:'0 0 0 3px rgba(249,115,22,0.2)'}} />
            Registration closes &nbsp;<strong className="text-[color:var(--ink-2)]">Jul 6, 2026</strong>
          </div>
          <button onClick={()=>setView('register')}
            className="inline-flex items-center gap-3 px-9 py-4 bg-[color:var(--ink-2)] hover:bg-[color:var(--ink-3)] text-white btn"
            style={{fontSize:'clamp(10px,1.4vw,13px)', letterSpacing:'0.08em'}}>
            REGISTER NOW →
          </button>
        </div>"""

new_hero = """      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{background:'var(--ink)', color:'white'}}>
        <div className="hero-mesh"><div className="b1"></div><div className="b2"></div><div className="b3"></div></div>
        <div className="absolute inset-0 dot-grid opacity-60" />
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-20 lg:pt-28 pb-24 lg:pb-32 relative">
          <div className="flex items-center gap-3 mb-12 flex-wrap fade-up" style={{animationDelay:'0.05s'}}>
            <span className="eyebrow eyebrow-white">Myntra Tech Week</span>
            <span className="w-1 h-1 rounded-full" style={{background:'rgba(255,255,255,0.3)'}}></span>
            <span className="eyebrow eyebrow-white">Edition Six · 2026</span>
            <span className="ml-auto pill pill-ghost-light"><span className="dot" style={{color:'var(--accent)'}}></span>Registration open</span>
          </div>
          <h1 className="h-display text-white mb-10 fade-up" style={{animationDelay:'0.15s', fontSize:'clamp(56px, 10vw, 156px)'}}>
            Build the future<br/>of fashion <em className="gradient-text">commerce.</em><br/>
            <span style={{color:'rgba(255,255,255,0.45)'}}>In fourteen days.</span>
          </h1>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-end fade-up" style={{animationDelay:'0.3s'}}>
            <div className="lg:col-span-7">
              <p className="text-lg lg:text-xl leading-relaxed max-w-xl" style={{color:'rgba(255,255,255,0.78)'}}>
                A cross-functional hackathon for engineers, designers, product, business, and operations. Pick a real problem from the frontline. Build it. Pitch it Shark Tank-style. Ship it within two weeks. Get rewarded.
              </p>
              <div className="flex items-center gap-3 mt-10 flex-wrap">
                <button onClick={()=>setView('register')} className="btn btn-gradient">Register your team
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
                <button onClick={()=>setView('ideas')} className="btn btn-ghost-light">Browse Idea Bazaar</button>
              </div>
            </div>
          </div>
        </div>
      </section>"""

text = text.replace(old_hero, new_hero)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
