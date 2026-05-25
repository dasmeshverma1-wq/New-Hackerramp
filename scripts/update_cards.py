import os

with open("index.html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add flex-1 to the top container
old_container = """<div className="p-5 flex flex-col gap-3" style={{background:fill}}>"""
new_container = """<div className="p-5 flex flex-col gap-3 flex-1" style={{background:fill}}>"""
code = code.replace(old_container, new_container)

# 2. Update the tags rendering to limit max visible tags and add whitespace-nowrap
old_tags = """                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="px-2.5 py-1 bg-white/60 border border-[#0d0d0d]/15 text-[#0d0d0d] text-[10px] font-[800] rounded-[3px] uppercase tracking-wide">{team.theme}</span>
                        {open && team.skillsNeeded?.map(s=>(
                          <span key={s} className="px-2.5 py-1 bg-white border border-[#3333FF]/30 text-[#3333FF] text-[10px] font-[800] rounded-[3px] shadow-sm">{s}</span>
                        ))}
                      </div>"""

new_tags = """                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="px-2.5 py-1 bg-white/60 border border-[#0d0d0d]/15 text-[#0d0d0d] text-[10px] font-[800] rounded-[3px] uppercase tracking-wide whitespace-nowrap">{team.theme}</span>
                        {open && team.skillsNeeded && (
                          <React.Fragment>
                            {team.skillsNeeded.slice(0, 2).map(s=>(
                              <span key={s} className="px-2.5 py-1 bg-white border border-[#3333FF]/30 text-[#3333FF] text-[10px] font-[800] rounded-[3px] shadow-sm whitespace-nowrap">{s}</span>
                            ))}
                            {team.skillsNeeded.length > 2 && (
                              <span className="px-2 py-1 bg-white border border-[#3333FF]/30 text-[#3333FF] text-[10px] font-[800] rounded-[3px] shadow-sm whitespace-nowrap">
                                +{team.skillsNeeded.length - 2}
                              </span>
                            )}
                          </React.Fragment>
                        )}
                      </div>"""

code = code.replace(old_tags, new_tags)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated team card layout!")
