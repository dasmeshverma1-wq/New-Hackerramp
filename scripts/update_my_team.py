import os

with open("index.html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update App
old_app_start = """function App() {
  const [view, setView]         = useState('home');"""
new_app_start = """function App() {
  const [view, setView]         = useState('home');"""
code = code.replace(old_app_start, new_app_start)

old_app_render = """  return (
    <div className="min-h-screen bg-white">
      <Nav view={view} setView={setView} user={user}
        onLogin={()=>setLogin(true)}
        onLogout={()=>{setUser(null); toast('Signed out.','info');}}
      />

      <main className="max-w-[1400px] mx-auto px-8 pt-[88px] pb-16">
        {view==='home'        && <HomeView teams={teams} winners={winners} homeStats={homeStats} />}
        {view==='register'    && <RegisterView    user={user} setTeams={setTeams} toast={toast} onLoginOpen={()=>setLogin(true)} />}
        {view==='teams'       && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="partners" setView={setView} />}
        {view==='ideabazaar'  && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="ideas" setView={setView} />}
        {view==='notifications' && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="requests" setView={setView} />}"""

new_app_render = """  const userTeam = user ? teams.find(t => t.members.some(m => m === user.id) || t.leadName === user.name) : null;

  return (
    <div className="min-h-screen bg-white">
      <Nav view={view} setView={setView} user={user}
        onLogin={()=>setLogin(true)}
        onLogout={()=>{setUser(null); toast('Signed out.','info');}}
        userTeam={userTeam}
      />

      <main className="max-w-[1400px] mx-auto px-8 pt-[88px] pb-16">
        {view==='home'        && <HomeView teams={teams} winners={winners} homeStats={homeStats} />}
        {view==='register'    && <RegisterView    user={user} setTeams={setTeams} toast={toast} onLoginOpen={()=>setLogin(true)} userTeam={userTeam} pubResults={pubResults} />}
        {view==='teams'       && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="partners" setView={setView} onLoginOpen={()=>setLogin(true)} />}
        {view==='ideabazaar'  && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="ideas" setView={setView} onLoginOpen={()=>setLogin(true)} />}
        {view==='notifications' && <MarketplaceView user={user} teams={teams} joinRequests={joinReqs} setJoinRequests={setJoinReqs} ideas={ideas} setIdeas={setIdeas} toast={toast} mode="requests" setView={setView} onLoginOpen={()=>setLogin(true)} />}"""

code = code.replace(old_app_render, new_app_render)


# 2. Update Nav
old_nav_def = "function Nav({ view, setView, user, onLogin, onLogout }) {"
new_nav_def = "function Nav({ view, setView, user, onLogin, onLogout, userTeam }) {"
code = code.replace(old_nav_def, new_nav_def)

old_nav_desktop_link = """                className={`px-3 py-1.5 text-[13px] btn ${view===item.id?'nav-active':'nav-inactive'}`}>
                {item.label}"""
new_nav_desktop_link = """                className={`px-3 py-1.5 text-[13px] btn ${view===item.id?'nav-active':'nav-inactive'}`}>
                {item.id === 'register' && userTeam ? 'My Team' : item.label}"""
code = code.replace(old_nav_desktop_link, new_nav_desktop_link)

old_nav_mobile_link = """                  className={`block w-full text-left py-4 text-[18px] font-[800] border-b border-[#f4f4f5] ${view===item.id?'text-[#3333FF]':'text-[#18181b]'}`}>
                  {item.label}"""
new_nav_mobile_link = """                  className={`block w-full text-left py-4 text-[18px] font-[800] border-b border-[#f4f4f5] ${view===item.id?'text-[#3333FF]':'text-[#18181b]'}`}>
                  {item.id === 'register' && userTeam ? 'My Team' : item.label}"""
code = code.replace(old_nav_mobile_link, new_nav_mobile_link)


# 3. Update RegisterView
old_reg_def = """function RegisterView({ user, setTeams, toast, onLoginOpen }) {
  const [step, setStep]   = useState(1);
  const [done, setDone]   = useState(false);
  const [edit, setEdit]   = useState(false);
  const [agree, setAgree] = useState(false);
  const [teamId]          = useState(`HR-2026-${Math.floor(1000+Math.random()*9000)}`);
  const [err, setErr]     = useState({});

  const makeBlank = u => ({
    teamName:'', theme:'', subTheme:'', abstract:'',
    genaiModel:'', otherAccess:'', skillsNeeded:[],
    members:[{ name:u?.name||'', email:u?.email||'', dept:u?.dept||'', role:'Team Lead' }]
  });
  const [form, setForm] = useState(makeBlank(user));

  useEffect(()=>{
    if (user) {
      setForm(makeBlank(user));
      setStep(1); setDone(false); setErr({}); setAgree(false);
    }
  }, [user?.id]);"""

new_reg_def = """function RegisterView({ user, setTeams, toast, onLoginOpen, userTeam, pubResults }) {
  const [step, setStep]   = useState(1);
  const [done, setDone]   = useState(false);
  const [edit, setEdit]   = useState(false);
  const [agree, setAgree] = useState(false);
  const [teamId]          = useState(`HR-2026-${Math.floor(1000+Math.random()*9000)}`);
  const [err, setErr]     = useState({});

  const makeBlank = u => ({
    teamName:'', theme:'', subTheme:'', abstract:'',
    genaiModel:'', otherAccess:'', skillsNeeded:[], rolesNeeded:[],
    members:[{ name:u?.name||'', email:u?.email||'', dept:u?.dept||'', role:'Team Lead' }]
  });
  const [form, setForm] = useState(makeBlank(user));

  useEffect(()=>{
    if (userTeam) {
      setForm({
        teamName:userTeam.name, theme:userTeam.theme, subTheme:userTeam.subTheme, abstract:userTeam.abstract,
        genaiModel:userTeam.genaiModel||'', otherAccess:userTeam.otherAccess||'', skillsNeeded:userTeam.skillsNeeded||[], rolesNeeded:userTeam.rolesNeeded||[],
        members: userTeam.leadName ? [
           { name: userTeam.leadName, email: user?.email||'', dept: userTeam.leadDept, role:'Team Lead' },
           ...((userTeam.members.length > 1 && userTeam.depts[1]) ? [{ name: 'Team Member', email:'', dept: userTeam.depts[1], role:'Member' }] : [])
        ] : makeBlank(user).members
      });
      setDone(true);
    } else if (user) {
      setForm(makeBlank(user));
      setStep(1); setDone(false); setErr({}); setAgree(false);
    }
  }, [user?.id, userTeam?.id]);"""
code = code.replace(old_reg_def, new_reg_def)

old_reg_submit = """  const submit = () => {
    if (!agree) { toast('Please agree to the participation terms.','error'); return; }
    const isOpen = form.members.length < 2;
    setTeams(p=>[...p,{
      id:teamId, name:form.teamName, theme:form.theme, subTheme:form.subTheme,
      abstract:form.abstract, genaiModel:form.genaiModel, otherAccess:form.otherAccess,
      members:form.members.map((_,i)=>`M${i}`), maxSize:2,
      open:isOpen, missing:isOpen?['1 member']:[],
      depts:form.members.map(m=>m.dept),
      skillsNeeded:form.skillsNeeded,
      leadName:form.members[0]?.name, leadDept:form.members[0]?.dept,
      scores:{r1:null,r2:null,r3:null}
    }]);
    setDone(true); toast('Team registered successfully!','success');
  };"""
new_reg_submit = """  const submit = () => {
    if (!agree) { toast('Please agree to the participation terms.','error'); return; }
    const isOpen = form.members.length < 2;
    if (userTeam) {
      setTeams(p=>p.map(t => t.id === userTeam.id ? {
        ...t,
        name:form.teamName, theme:form.theme, subTheme:form.subTheme,
        abstract:form.abstract, genaiModel:form.genaiModel, otherAccess:form.otherAccess,
        members:form.members.map((_,i)=> t.members[i] || `M${i}`), maxSize:2,
        open:isOpen, missing:isOpen?['1 member']:[],
        depts:form.members.map(m=>m.dept),
        skillsNeeded:form.skillsNeeded, rolesNeeded:form.rolesNeeded||[],
        leadName:form.members[0]?.name, leadDept:form.members[0]?.dept,
      } : t));
      toast('Team updated successfully!','success');
    } else {
      setTeams(p=>[...p,{
        id:teamId, name:form.teamName, theme:form.theme, subTheme:form.subTheme,
        abstract:form.abstract, genaiModel:form.genaiModel, otherAccess:form.otherAccess,
        members:form.members.map((_,i)=>`M${i}`), maxSize:2,
        open:isOpen, missing:isOpen?['1 member']:[],
        depts:form.members.map(m=>m.dept),
        skillsNeeded:form.skillsNeeded, rolesNeeded:form.rolesNeeded||[],
        leadName:form.members[0]?.name, leadDept:form.members[0]?.dept,
        scores:{r1:null,r2:null,r3:null}
      }]);
      toast('Team registered successfully!','success');
    }
    setDone(true);
  };"""
code = code.replace(old_reg_submit, new_reg_submit)


old_edit_window = """      {/* Edit window */}
      <div className="overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f1]">
          <div>
            <p className="text-[13px] font-semibold text-[#18181b]">Idea Modification</p>
            <p className="text-[11px] text-[#a1a1aa] mt-0.5">Edit window closes Jul 6, 2026</p>
          </div>
          <Btn variant={edit?'danger':'ghost'} className="text-[12px] py-1.5" onClick={()=>setEdit(e=>!e)}>
            {edit?'Cancel':'Edit details'}
          </Btn>
        </div>
        <div className="p-6 space-y-4">
          {edit ? (
            <>
              <Inp label="Team Name" value={form.teamName} onChange={e=>sf('teamName',e.target.value)} />
              <Inp label="Sub-theme" value={form.subTheme} onChange={e=>sf('subTheme',e.target.value)} />
              <Txt label="Abstract" value={form.abstract} onChange={e=>sf('abstract',e.target.value)} rows={3} />
              <Btn variant="primary" className="w-full py-2" onClick={()=>{ setEdit(false); toast('Changes saved.','success'); }}>Save changes</Btn>
            </>
          ) : (
            <div className="space-y-3">
              {[['Team Name',form.teamName],['Sub-theme',form.subTheme],['Abstract',form.abstract||'No abstract provided.']].map(([k,v])=>(
                <div key={k} className="flex gap-4">
                  <span className="text-[12px] text-[#a1a1aa] w-24 flex-shrink-0">{k}</span>
                  <span className="text-[12px] text-[#52525b]">{v}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>"""

new_edit_window = """      {/* Event Progress */}
      {userTeam && (
      <div className="overflow-hidden">
        <div className="px-6 py-4 border-b border-[#f0f0f1]">
          <p className="text-[13px] font-semibold text-[#18181b]">Event Progress & Scores</p>
        </div>
        <div className="p-6">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-[#22c55e] flex items-center justify-center text-white text-[12px] font-bold shadow-sm">✓</div>
              <div className="flex-1"><p className="text-[13px] font-[800] text-[#18181b]">Registration Confirmed</p><p className="text-[11px] text-[#71717a] font-medium">Team successfully submitted to portal.</p></div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold shadow-sm ${pubResults?.R1?.published ? 'bg-[#3333FF] text-white' : 'bg-[#f4f4f5] border border-[#e4e4e7] text-[#71717a]'}`}>{pubResults?.R1?.published?'✓':'R1'}</div>
              <div className="flex-1"><p className={`text-[13px] font-[800] ${pubResults?.R1?.published?'text-[#18181b]':'text-[#71717a]'}`}>Round 1: Jury Evaluation</p><p className="text-[11px] text-[#71717a] font-medium">{pubResults?.R1?.published ? (pubResults.R1.teams.includes(userTeam.id) ? 'Qualified for R2' : 'Not selected for R2') : 'Awaiting jury scores.'}</p></div>
              {pubResults?.R1?.published && <div className="text-[14px] font-[900] text-[#18181b]">{userTeam.scores?.r1 ? `${userTeam.scores.r1} pts` : '-'}</div>}
            </div>

            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold shadow-sm ${pubResults?.R2?.published ? 'bg-[#3333FF] text-white' : 'bg-[#f4f4f5] border border-[#e4e4e7] text-[#a1a1aa]'}`}>{pubResults?.R2?.published?'✓':'R2'}</div>
              <div className="flex-1"><p className={`text-[13px] font-[800] ${pubResults?.R2?.published?'text-[#18181b]':'text-[#a1a1aa]'}`}>Round 2: Technical Deep Dive</p><p className="text-[11px] text-[#a1a1aa] font-medium">{pubResults?.R2?.published ? (pubResults.R2.teams.includes(userTeam.id) ? 'Qualified for R3' : 'Not selected for R3') : 'Locked until R1 completion.'}</p></div>
              {pubResults?.R2?.published && <div className="text-[14px] font-[900] text-[#18181b]">{userTeam.scores?.r2 ? `${userTeam.scores.r2} pts` : '-'}</div>}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Edit window */}
      <div className="overflow-hidden border-t-0">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-[13px] font-semibold text-[#18181b]">Team Modification</p>
            <p className="text-[11px] text-[#a1a1aa] mt-0.5">Edit window closes Jul 6, 2026</p>
          </div>
          <Btn variant="ghost" className="text-[12px] py-1.5 border border-[#e4e4e7]" onClick={()=>{ setDone(false); setStep(1); setAgree(true); }}>
            Edit Team Details
          </Btn>
        </div>
      </div>"""
code = code.replace(old_edit_window, new_edit_window)

old_market_def = "function MarketplaceView({ user, teams, joinRequests, setJoinRequests, ideas, setIdeas, toast, mode, setView }) {"
new_market_def = "function MarketplaceView({ user, teams, joinRequests, setJoinRequests, ideas, setIdeas, toast, mode, setView, onLoginOpen }) {"
code = code.replace(old_market_def, new_market_def)

old_market_btn = """                <button key="create-team" onClick={()=>{ if(!user){toast('Sign in to create a team.','error');}else{setView('register');} }}"""
new_market_btn = """                <button key="create-team" onClick={()=>{ if(!user){onLoginOpen();}else{setView('register');} }}"""
code = code.replace(old_market_btn, new_market_btn)


with open("index.html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated my team and login buttons!")
