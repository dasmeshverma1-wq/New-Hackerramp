import os

with open("index.html", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update the state variables definition
old_state = """  const [scores, setSc]       = useState({});
  const [scoreDetails, setScoreDetails] = useState({});
  const [scoreModal, setScoreModal] = useState(null);
  const [scoreForm, setScoreForm] = useState({ prob:0, tech:0, prod:0, cust:0, hack:0, isDraft:false });"""
new_state = """  const [scores, setSc]       = useState({});
  const [scoreDetails, setScoreDetails] = useState({});
  const [scoreModal, setScoreModal] = useState(null);
  const [scoreForm, setScoreForm] = useState({ prob:0, prod:0, cust:0, bus:0, strat:0, pitch:0, isDraft:false });"""
code = code.replace(old_state, new_state)

# 2. Update the modal UI
old_modal_start = """          {/* Detailed Scoring Modal */}
          {scoreModal && (
            <Modal open={true} onClose={() => setScoreModal(null)} title={`Score ${scoreModal.teamName} — ${scoreModal.round}`} size="md">
              <div className="space-y-6 fade-up">
                <p className="text-[13px] text-[#71717a] leading-relaxed">
                  Evaluate this team across the 5 core criteria. Each criterion is scored out of 5 points.
                </p>"""
new_modal_start = """          {/* Detailed Scoring Modal */}
          {scoreModal && (
            <Modal open={true} onClose={() => setScoreModal(null)} title={`Score ${scoreModal.teamName} — ${scoreModal.round}`} size="md">
              <div className="space-y-6 fade-up max-h-[70vh] overflow-y-auto pr-2">
                <p className="text-[13px] text-[#71717a] leading-relaxed">
                  Evaluate this team across the 6 core criteria. Each criterion is scored out of 5 points.
                </p>"""
code = code.replace(old_modal_start, new_modal_start)

old_criteria = """                  {[
                    { id: 'prob', label: 'Problem & Idea', desc: 'Is the problem real and the idea innovative?' },
                    { id: 'tech', label: 'Tech & Demo', desc: 'Execution quality and working prototype.' },
                    { id: 'prod', label: 'Production Path', desc: 'Feasibility to scale and deploy.' },
                    { id: 'cust', label: 'Customer Impact', desc: 'Value delivered to end users.' },
                    { id: 'hack', label: 'Hacker × Hustler', desc: 'Team synergy, pitch, and passion.' }
                  ].map(crit => ("""
new_criteria = """                  {[
                    { id: 'prob', label: 'Problem & Idea', desc: 'Is the problem real and the idea innovative?' },
                    { id: 'prod', label: 'Production Path', desc: 'Feasibility to scale and deploy.' },
                    { id: 'cust', label: 'Customer Impact', desc: 'Value delivered to end users.' },
                    { id: 'bus', label: 'Business Impact / P&L', desc: 'Economic viability and return.' },
                    { id: 'strat', label: 'Strategy, Bet & Moat', desc: 'Long term strategic advantage.' },
                    { id: 'pitch', label: 'Pitch & Defense', desc: 'Team presentation and Q&A.' }
                  ].map(crit => ("""
code = code.replace(old_criteria, new_criteria)

# Update the button click logic in the modal to sum all 6 criteria
old_sum_code = "const total = (scoreForm.prob||0) + (scoreForm.tech||0) + (scoreForm.prod||0) + (scoreForm.cust||0) + (scoreForm.hack||0);"
new_sum_code = "const total = (scoreForm.prob||0) + (scoreForm.prod||0) + (scoreForm.cust||0) + (scoreForm.bus||0) + (scoreForm.strat||0) + (scoreForm.pitch||0);"
code = code.replace(old_sum_code, new_sum_code)

# 3. Update the table code
old_table_code = """                                    <button 
                                      onClick={() => {
                                        setScoreForm(det || { prob:0, tech:0, prod:0, cust:0, hack:0, isDraft: false });
                                        setScoreModal({ teamId: t.id, teamName: t.name, round: r });
                                      }}
                                      className={`px-3 py-1.5 rounded-[3px] text-[12px] font-[800] transition-colors border ${isDraft ? 'bg-[#fffbeb] text-[#d97706] border-[#fde68a] hover:bg-[#fef3c7]' : 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0] hover:bg-[#dcfce7]'}`}>
                                      {scores[t.id][r]} {isDraft ? '(Draft)' : '✓'}
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => {
                                        setScoreForm({ prob:0, tech:0, prod:0, cust:0, hack:0, isDraft: true });
                                        setScoreModal({ teamId: t.id, teamName: t.name, round: r });
                                      }}
                                      className="px-3 py-1.5 border border-[#e4e4e7] bg-[#f9f9fa] text-[#71717a] text-[11px] font-[800] uppercase tracking-wider rounded-[3px] hover:bg-white hover:text-[#18181b] hover:border-[#18181b] transition-colors">
                                      Score
                                    </button>"""

new_table_code = """                                    <button 
                                      onClick={() => {
                                        setScoreForm(det || { prob:0, prod:0, cust:0, bus:0, strat:0, pitch:0, isDraft: false });
                                        setScoreModal({ teamId: t.id, teamName: t.name, round: r });
                                      }}
                                      className={`px-3 py-1.5 rounded-[3px] text-[12px] font-[800] transition-colors border ${isDraft ? 'bg-[#fffbeb] text-[#d97706] border-[#fde68a] hover:bg-[#fef3c7]' : 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0] hover:bg-[#dcfce7]'}`}>
                                      {scores[t.id][r]} / 30 {isDraft ? '(Draft)' : '✓'}
                                    </button>
                                  ) : (
                                    <button 
                                      onClick={() => {
                                        setScoreForm({ prob:0, prod:0, cust:0, bus:0, strat:0, pitch:0, isDraft: true });
                                        setScoreModal({ teamId: t.id, teamName: t.name, round: r });
                                      }}
                                      className="px-3 py-1.5 border border-[#e4e4e7] bg-[#f9f9fa] text-[#71717a] text-[11px] font-[800] uppercase tracking-wider rounded-[3px] hover:bg-white hover:text-[#18181b] hover:border-[#18181b] transition-colors">
                                      Score
                                    </button>"""
code = code.replace(old_table_code, new_table_code)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated scoring system with 6 criteria!")
