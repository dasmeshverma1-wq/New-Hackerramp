import re

with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

new_comp = """function HowItWorksSection() {
  const HIGHLIGHTS = [
    { n:'01', color:'var(--accent)', title:'Hacker meets Hustler.', body:'No team qualifies on engineering alone. Every team carries a Hustler — Business, Product, or Operations — who owns the metric. GMV, conversion, returns. Real numbers. Real ownership.' },
    { n:'02', color:'var(--c-purple)', title:'Two departments. Minimum.', body:'The Grand Prize is reserved for teams spanning at least two departments. Backend with Product. SRE with Business. Design with Warehouse Ops. The point is friction, then breakthrough.' },
    { n:'03', color:'var(--c-amber)', title:'No meetings. No deploys.', body:'For the two days of the build phase, SLT has approved a company-wide pause. No meetings except hackathon. No production deploys except P0 incidents. The org leans in.' },
    { n:'04', color:'var(--c-cyan)', title:'Problems from the frontline.', body:'Business and Customer Support teams post problem statements weekly into the Idea Bazaar. The people closest to the customer surface the pain. Teams pick, remix, or pitch their own.' },
    { n:'05', color:'var(--c-fuchsia)', title:'Two to five. No more.', body:'Minimum two members. Maximum five. At least one Hacker, at least one Hustler. Above two members, at least one different department. The composition is the constraint.' },
  ];

  return (
    <div className="py-20 px-6 lg:px-10 max-w-[1280px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-5">
          <p className="text-[11px] text-[color:var(--mute-3)] tracking-[0.22em] uppercase font-[700] mb-4">What's different this year</p>
          <h2 className="h-display text-5xl md:text-6xl lg:text-7xl mt-6 text-[color:var(--ink)]" style={{lineHeight: 1.15}}>
            Five rules that<br/>change <em className="gradient-text">everything.</em>
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 flex items-end">
          <p className="text-lg leading-relaxed text-[color:var(--mute-1)]">
            We rebuilt TechWeek around what makes hackathons actually ship. Cross-functional teams. Real business owners. Real production. Real money. The constraints are the point.
          </p>
        </div>
      </div>
      <div className="border-t border-[color:var(--line-2)]">
        {HIGHLIGHTS.map(h => (
          <div key={h.n} className="grid lg:grid-cols-12 gap-6 lg:gap-10 py-10 lg:py-14 border-b items-start border-[color:var(--line-2)]">
            <div className="lg:col-span-2 flex items-start gap-3">
              <div className="w-1 h-12 rounded-full" style={{background: h.color}}></div>
              <span className="font-serif text-5xl" style={{fontStyle:'italic', fontWeight:300, color: h.color, lineHeight:1}}>{h.n}</span>
            </div>
            <div className="lg:col-span-4">
              <h3 className="font-serif text-3xl lg:text-4xl text-[color:var(--ink)]" style={{fontWeight:400, letterSpacing:'-0.02em', lineHeight:1.15}}>{h.title}</h3>
            </div>
            <div className="lg:col-span-6">
              <p className="text-lg leading-relaxed text-[color:var(--mute-1)]">{h.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}"""

text = re.sub(r'function HowItWorksSection\(\) \{.*?(?=function CurrentWinnersWidget)', new_comp + '\n\n', text, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
