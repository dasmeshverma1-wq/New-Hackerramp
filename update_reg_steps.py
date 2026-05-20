import re

with open('index (1).html', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update RegSteps labels
text = text.replace(
    "const labels = ['Team Details','Members','Review & Submit'];",
    "const labels = ['Team Details','Team Mode','Members','Review & Submit'];"
)

# 2. Add teamMode to makeBlank
text = text.replace(
    "skillsNeeded:[], rolesNeeded:[],",
    "skillsNeeded:[], rolesNeeded:[], teamMode: 'create',"
)

# 3. Update Continue button in step 1 to go to step 2 (Team Mode)
text = text.replace(
    "<button onClick={()=>v1()&&setStep(2)}\n                className=\"w-full py-3 bg-[color:var(--ink)] hover:bg-[color:var(--ink-3)] text-white text-[14px] font-semibold rounded-[3px] btn shadow-sm\">\n                Continue to Members →",
    "<button onClick={()=>v1()&&setStep(2)}\n                className=\"w-full py-3 bg-[color:var(--ink)] hover:bg-[color:var(--ink-3)] text-white text-[14px] font-semibold rounded-[3px] btn shadow-sm\">\n                Continue to Team Mode →"
)

# 4. Insert STEP 2 (Team Mode), bump old STEP 2 to STEP 3, and old STEP 3 to STEP 4

step_2_code = '''
          {/* STEP 2 — TEAM MODE */}
          {step===2 && (
            <div className="space-y-6 fade-up">
              <h2 className="text-[24px] font-serif font-bold text-[color:var(--ink)]">Team mode.</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div onClick={() => sf('teamMode', 'create')} className={`cursor-pointer rounded-[8px] p-6 border-2 transition-all ${form.teamMode==='create' ? 'border-blue-500 bg-blue-50' : 'border-[color:var(--line-2)] hover:border-[color:var(--line)] bg-white'}`}>
                  <div className="w-6 h-1 bg-green-500 mb-4 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-[color:var(--ink)] mb-1">Create new team</h3>
                  <p className="text-[11px] text-[color:var(--mute-2)] leading-relaxed">Start fresh. Invite teammates after registration.</p>
                </div>
                <div onClick={() => sf('teamMode', 'join')} className={`cursor-pointer rounded-[8px] p-6 border-2 transition-all ${form.teamMode==='join' ? 'border-blue-500 bg-blue-50' : 'border-[color:var(--line-2)] hover:border-[color:var(--line)] bg-white'}`}>
                  <div className="w-6 h-1 bg-blue-500 mb-4 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-[color:var(--ink)] mb-1">Join existing</h3>
                  <p className="text-[11px] text-[color:var(--mute-2)] leading-relaxed">Browse open teams looking for your skillset.</p>
                </div>
                <div onClick={() => sf('teamMode', 'find')} className={`cursor-pointer rounded-[8px] p-6 border-2 transition-all ${form.teamMode==='find' ? 'border-blue-500 bg-blue-50' : 'border-[color:var(--line-2)] hover:border-[color:var(--line)] bg-white'}`}>
                  <div className="w-6 h-1 bg-purple-500 mb-4 rounded-full"></div>
                  <h3 className="text-[14px] font-bold text-[color:var(--ink)] mb-1">Find me a team</h3>
                  <p className="text-[11px] text-[color:var(--mute-2)] leading-relaxed">Get matched via the Blind-Date Mixer.</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 mt-4 border-t border-[color:var(--line)]">
                <button onClick={()=>setStep(1)} className="px-6 py-2.5 border border-[color:var(--line-2)] rounded-[3px] text-[13px] font-semibold hover:bg-[color:var(--paper-2)] flex items-center gap-2">
                  ← Back
                </button>
                <button onClick={()=>setStep(3)} className="px-8 py-2.5 bg-[color:var(--ink)] text-white rounded-[3px] text-[13px] font-semibold hover:bg-[color:var(--ink-3)] flex items-center gap-2 shadow-sm btn">
                  Continue to Members →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — MEMBERS */}
          {step===3 && (
'''

text = text.replace('{/* STEP 2 — MEMBERS */}\n          {step===2 && (', step_2_code)

# Change Continue to Review button from setStep(3) to setStep(4)
text = text.replace("<button onClick={()=>v2()&&setStep(3)}", "<button onClick={()=>v2()&&setStep(4)}")

# Back button in Members (step 3) needs to go to step 2, not step 1
text = text.replace("{/* Back / Next */}\n              <div className=\"flex justify-between items-center pt-4 border-t border-[color:var(--line)] mt-6\">\n                <button onClick={()=>setStep(1)}", "{/* Back / Next */}\n              <div className=\"flex justify-between items-center pt-4 border-t border-[color:var(--line)] mt-6\">\n                <button onClick={()=>setStep(2)}")


# Change STEP 3 to STEP 4
step_4_code = '''
          {/* STEP 4 — REVIEW & SUBMIT */}
          {step===4 && (
'''

text = text.replace('{/* STEP 3 — REVIEW & SUBMIT */}\n          {step===3 && (', step_4_code)

# Back button in Review (step 4) needs to go to step 3, not step 2
text = text.replace("<button onClick={()=>setStep(2)}\n                  className=\"px-5 py-2.5 border", "<button onClick={()=>setStep(3)}\n                  className=\"px-5 py-2.5 border")

with open('index (1).html', 'w', encoding='utf-8') as f:
    f.write(text)
