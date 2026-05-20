import os

with open("index (1).html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update INIT_TEAMS
old_t002 = "skillsNeeded:['Machine Learning','Frontend Development'], leadName:'Neha Singh', leadDept:'Data Science' }"
new_t002 = "skillsNeeded:['Machine Learning','Frontend Development'], rolesNeeded:['Hacker'], leadName:'Neha Singh', leadDept:'Data Science' }"
code = code.replace(old_t002, new_t002)

old_t005 = "skillsNeeded:['UX / Design','Product Management'], leadName:'Arjun Sharma', leadDept:'Engineering' }"
new_t005 = "skillsNeeded:['UX / Design','Product Management'], rolesNeeded:['Designer', 'Hustler'], leadName:'Arjun Sharma', leadDept:'Engineering' }"
code = code.replace(old_t005, new_t005)

# 2. Add state variable
old_state = "  const [skillF, setSkillF]     = useState([]);"
new_state = """  const [skillF, setSkillF]     = useState([]);
  const [roleF, setRoleF]       = useState([]);"""
code = code.replace(old_state, new_state)

# 3. Add filtering logic
old_filter_logic = """    .filter(t => {
      const q = searchQ.toLowerCase();
      const matchQ = !q || [t.name,t.subTheme,t.abstract,t.leadName,t.theme].some(v=>v?.toLowerCase().includes(q));
      const matchSkill = skillF.length===0 || !isOpen(t) || skillF.some(s=>t.skillsNeeded?.includes(s));
      return matchQ && matchSkill;
    });"""

new_filter_logic = """    .filter(t => {
      const q = searchQ.toLowerCase();
      const matchQ = !q || [t.name,t.subTheme,t.abstract,t.leadName,t.theme].some(v=>v?.toLowerCase().includes(q));
      const matchSkill = skillF.length===0 || !isOpen(t) || skillF.some(s=>t.skillsNeeded?.includes(s));
      const matchRole = roleF.length===0 || !isOpen(t) || roleF.some(r=>t.rolesNeeded?.includes(r));
      return matchQ && matchSkill && matchRole;
    });"""

code = code.replace(old_filter_logic, new_filter_logic)

# 4. Add UI for the filter
old_skill_ui = """            {/* Skill Filter */}
            {allSkills.length > 0 && ("""

new_skill_ui = """            {/* Role Filter */}
            <div className="space-y-1.5 pt-2">
              <p className="text-[10px] font-[800] uppercase tracking-[0.14em] text-[#a1a1aa] mb-3 ml-2">Seeking Persona</p>
              <div className="flex flex-wrap gap-1.5 px-2">
                {['Hacker', 'Hustler', 'Designer'].map(r=>(
                  <button key={r} onClick={()=>setRoleF(f=>f.includes(r)?f.filter(x=>x!==r):[...f,r])}
                    className={`px-2.5 py-1 rounded-[3px] text-[11px] font-[700] transition-all border ${roleF.includes(r)?'bg-[#18181b] border-[#18181b] text-white':'bg-white border-[#e4e4e7] text-[#71717a] hover:border-[#18181b] hover:text-[#18181b]'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Filter */}
            {allSkills.length > 0 && ("""

code = code.replace(old_skill_ui, new_skill_ui)

# 5. Display the role badges in the card
old_card_tags = """                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="px-2.5 py-1 bg-white/60 border border-[#0d0d0d]/15 text-[#0d0d0d] text-[10px] font-[800] rounded-[3px] uppercase tracking-wide whitespace-nowrap">{team.theme}</span>
                        {open && team.skillsNeeded && (
                          <React.Fragment>"""

new_card_tags = """                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="px-2.5 py-1 bg-white/60 border border-[#0d0d0d]/15 text-[#0d0d0d] text-[10px] font-[800] rounded-[3px] uppercase tracking-wide whitespace-nowrap">{team.theme}</span>
                        {open && team.rolesNeeded?.map(r=>(
                          <span key={r} className="px-2.5 py-1 bg-[#18181b] border border-[#18181b] text-white text-[10px] font-[800] rounded-[3px] shadow-sm whitespace-nowrap">{r}</span>
                        ))}
                        {open && team.skillsNeeded && (
                          <React.Fragment>"""

code = code.replace(old_card_tags, new_card_tags)


with open("index (1).html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated role filter successfully!")
