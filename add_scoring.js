const fs = require('fs');
let code = fs.readFileSync('index (1).html', 'utf8');

// 1. Add state variables
code = code.replace(
  "  const [scores, setSc]       = useState({});",
  `  const [scores, setSc]       = useState({});
  const [scoreDetails, setScoreDetails] = useState({});
  const [scoreModal, setScoreModal] = useState(null);
  const [scoreForm, setScoreForm] = useState({ prob:0, tech:0, prod:0, cust:0, hack:0, isDraft:false });`
);

// 2. Add score modal rendering just before {/* Awards & Publish */}
const modalUI = `
          {/* Detailed Scoring Modal */}
          {scoreModal && (
            <Modal open={true} onClose={() => setScoreModal(null)} title={\`Score \${scoreModal.teamName} — \${scoreModal.round}\`} size="md">
              <div className="space-y-6 fade-up">
                <p className="text-[13px] text-[#71717a] leading-relaxed">
                  Evaluate this team across the 5 core criteria. Each criterion is scored out of 5 points.
                </p>
                <div className="space-y-4">
                  {[
                    { id: 'prob', label: 'Problem & Idea', desc: 'Is the problem real and the idea innovative?' },
                    { id: 'tech', label: 'Tech & Demo', desc: 'Execution quality and working prototype.' },
                    { id: 'prod', label: 'Production Path', desc: 'Feasibility to scale and deploy.' },
                    { id: 'cust', label: 'Customer Impact', desc: 'Value delivered to end users.' },
                    { id: 'hack', label: 'Hacker × Hustler', desc: 'Team synergy, pitch, and passion.' }
                  ].map(crit => (
                    <div key={crit.id} className="bg-[#f9f9fa] border border-[#e4e4e7] rounded-[3px] p-4">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <p className="text-[13px] font-[800] text-[#18181b]">{crit.label}</p>
                          <p className="text-[11px] text-[#a1a1aa] mt-0.5">{crit.desc}</p>
                        </div>
                        <span className="text-[14px] font-[800] text-[#3333FF]">{scoreForm[crit.id] || 0} / 5</span>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(val => (
                          <button key={val} onClick={() => setScoreForm(s => ({...s, [crit.id]: val}))}
                            className={\`flex-1 py-2 text-[13px] font-[800] border rounded-[3px] transition-all \${scoreForm[crit.id] === val ? 'bg-[#3333FF] text-white border-[#3333FF]' : 'bg-white text-[#71717a] border-[#e4e4e7] hover:border-[#a1a1aa] hover:text-[#18181b]'}\`}>
                            {val}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 flex gap-3">
                  <Btn variant="outline" className="flex-1 py-3 text-[12px] font-[800] uppercase tracking-wider"
                    onClick={() => {
                      const total = (scoreForm.prob||0) + (scoreForm.tech||0) + (scoreForm.prod||0) + (scoreForm.cust||0) + (scoreForm.hack||0);
                      setScoreDetails(p => ({ ...p, [scoreModal.teamId]: { ...p[scoreModal.teamId], [scoreModal.round]: { ...scoreForm, isDraft: true } } }));
                      sc(scoreModal.teamId, scoreModal.round, total);
                      setScoreModal(null);
                      toast('Draft saved.', 'success');
                    }}>
                    Save Draft
                  </Btn>
                  <Btn variant="primary" className="flex-1 py-3 text-[12px] font-[800] uppercase tracking-wider bg-[#16a34a] hover:bg-[#15803d]"
                    onClick={() => {
                      const total = (scoreForm.prob||0) + (scoreForm.tech||0) + (scoreForm.prod||0) + (scoreForm.cust||0) + (scoreForm.hack||0);
                      setScoreDetails(p => ({ ...p, [scoreModal.teamId]: { ...p[scoreModal.teamId], [scoreModal.round]: { ...scoreForm, isDraft: false } } }));
                      sc(scoreModal.teamId, scoreModal.round, total);
                      setScoreModal(null);
                      toast('Score submitted successfully.', 'success');
                    }}>
                    Submit Score
                  </Btn>
                </div>
              </div>
            </Modal>
          )}

`;
code = code.replace("{/* Awards & Publish */}", modalUI + "          {/* Awards & Publish */}");

// 3. Replace the text input with a Score button in the table
const newTableCode = \`                            {['R1','R2','R3'].map(r=>{
                              const det = scoreDetails[t.id]?.[r];
                              const isDraft = det?.isDraft;
                              const hasScore = scores[t.id]?.[r] !== undefined && scores[t.id]?.[r] !== '';
                              
                              return (
                                <td key={r} className="py-3.5 px-4 text-center">
                                  {hasScore ? (
                                    <button 
                                      onClick={() => {
                                        setScoreForm(det || { prob:0, tech:0, prod:0, cust:0, hack:0, isDraft: false });
                                        setScoreModal({ teamId: t.id, teamName: t.name, round: r });
                                      }}
                                      className={\\\`px-3 py-1.5 rounded-[3px] text-[12px] font-[800] transition-colors border \\\${isDraft ? 'bg-[#fffbeb] text-[#d97706] border-[#fde68a] hover:bg-[#fef3c7]' : 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0] hover:bg-[#dcfce7]'}\\\`}>
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
                                    </button>
                                  )}
                                </td>
                              );
                            })}\`;

const oldTableCode = \`                            {['R1','R2','R3'].map(r=>(
                              <td key={r} className="py-3.5 px-4">
                                <input type="number" min="0" max="100" placeholder="—"
                                  value={scores[t.id]?.[r]||''}
                                  onChange={e=>sc(t.id,r,e.target.value)}
                                  className="w-16 bg-[#f4f4f5] border border-[#e4e4e7] rounded-[3px] px-2 py-1.5 text-[12px] text-[#18181b] outline-none text-center focus:border-[#3333FF] block mx-auto" />
                              </td>
                            ))}\`;

code = code.replace(oldTableCode, newTableCode);

fs.writeFileSync('index (1).html', code);
console.log("Updated scoring system!");
