const fs = require('fs');
let text = fs.readFileSync('index.html', 'utf8');

// 1. AdminView signature
text = text.replace(
  'toast }) {',
  'toast, quizzes, setQuizzes, quizResults }) {'
);

// 2. AdminView mTab arrays
text = text.replace(
  `[['teams','Teams'],['users','Users'],['approvals','Idea Approvals'],['problems','Problem Statements'],['progress','Team Progress']]`,
  `[['teams','Teams'],['users','Users'],['approvals','Idea Approvals'],['problems','Problem Statements'],['progress','Team Progress'],['funzone','Fun Zone Results']]`
);

// 3. AdminView funzone tab rendering (insert before the end of management section)
const funzoneTabStr = `          {mTab==='funzone' && (
            <div className="fade-up space-y-4">
              <p className="text-[12px] text-[#71717a]">Fun Zone Results</p>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f0f0f1]">
                    {['User', 'Dept', 'Score', 'Time'].map((h,i)=>(
                      <th key={i} className={\`py-3 px-4 text-[10px] text-[#a1a1aa] uppercase tracking-[0.1em] font-semibold text-left\`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(quizResults||[]).map((r, i)=>(
                    <tr key={i} className="border-b border-[#f7f7f8] hover:bg-[#fafafa]">
                      <td className="py-3.5 px-4"><p className="text-[14px] font-medium text-[#18181b]">{r.name}</p></td>
                      <td className="py-3.5 px-4"><p className="text-[12px] text-[#52525b]">{r.dept}</p></td>
                      <td className="py-3.5 px-4"><p className="text-[14px] font-[800] text-[#18181b]">{r.score}/{r.total}</p></td>
                      <td className="py-3.5 px-4"><p className="text-[11px] text-[#a1a1aa]">{r.time}</p></td>
                    </tr>
                  ))}
                  {(!quizResults || quizResults.length === 0) && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-[12px] text-[#a1a1aa]">No quiz results yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>`;
text = text.replace(
  `        </div>\n      )}\n    </div>`,
  funzoneTabStr
);

// 4. FunZoneView signature and Add Quiz UI
const funzoneFuncStart = `function FunZoneView({ quizzes, user, onQuizSubmit }) {\n  return (\n    <div className="space-y-5">`;
const funzoneNewStart = `function FunZoneView({ quizzes, user, onQuizSubmit, setQuizzes }) {
  const [showAddQuiz, setShowAddQuiz] = React.useState(false);
  const [newQuiz, setNewQuiz] = React.useState({ q: '', opts: ['', '', '', ''], correct: 0, explain: '' });

  const handleAddQuiz = () => {
    if(!newQuiz.q || !newQuiz.opts.every(o=>o)) {
      alert("Please fill all fields for the new quiz.");
      return;
    }
    setQuizzes([...quizzes, newQuiz]);
    setShowAddQuiz(false);
    setNewQuiz({ q: '', opts: ['', '', '', ''], correct: 0, explain: '' });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-[14px] text-[#18181b]" style={{fontFamily:"'Press Start 2P', monospace", lineHeight:1.4}}>Fun Zone</h2>
          <span className="text-[22px]">🎉</span>
        </div>
        {user?.role === 'admin' && (
          <button onClick={()=>setShowAddQuiz(true)} className="bg-[#18181b] text-white text-[11px] font-[800] uppercase tracking-wide px-3 py-1.5 rounded-[3px] hover:bg-[#27272a]">+ Add Quiz</button>
        )}
      </div>
      <p className="text-[13px] text-[#71717a] -mt-2">Take a break — react to memes, test your Tech Week knowledge.</p>

      {showAddQuiz && (
        <div className="p-5 border border-[#e4e4e7] bg-white fade-up mb-4 shadow-sm rounded-[3px]">
          <p className="text-[14px] font-[800] mb-3">Add New Quiz</p>
          <div className="space-y-3">
            <input placeholder="Question" value={newQuiz.q} onChange={e=>setNewQuiz(f=>({...f,q:e.target.value}))} className="w-full border border-[#e4e4e7] focus:border-[#3333FF] rounded-[3px] px-3 py-2 text-[13px] outline-none" />
            <div className="grid grid-cols-2 gap-2">
              {newQuiz.opts.map((o,i)=>(
                <div key={i} className="flex items-center gap-2">
                  <input type="radio" name="correctOpt" checked={newQuiz.correct===i} onChange={()=>setNewQuiz(f=>({...f,correct:i}))} className="accent-[#3333FF]" />
                  <input placeholder={\`Option \${i+1}\`} value={o} onChange={e=>{
                    const newOpts=[...newQuiz.opts]; newOpts[i]=e.target.value;
                    setNewQuiz(f=>({...f,opts:newOpts}));
                  }} className="flex-1 border border-[#e4e4e7] focus:border-[#3333FF] rounded-[3px] px-2 py-1.5 text-[12px] outline-none" />
                </div>
              ))}
            </div>
            <input placeholder="Explanation when correct/wrong" value={newQuiz.explain} onChange={e=>setNewQuiz(f=>({...f,explain:e.target.value}))} className="w-full border border-[#e4e4e7] focus:border-[#3333FF] rounded-[3px] px-3 py-2 text-[13px] outline-none" />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={()=>setShowAddQuiz(false)} className="px-4 py-1.5 text-[12px] font-[700] border border-[#e4e4e7] rounded-[3px] hover:bg-[#f4f4f5]">Cancel</button>
              <button onClick={handleAddQuiz} className="px-4 py-1.5 text-[12px] font-[700] bg-[#3333FF] text-white rounded-[3px] hover:bg-[#2222dd]">Save Quiz</button>
            </div>
          </div>
        </div>
      )}
`;
text = text.replace(
  `function FunZoneView({ quizzes, user, onQuizSubmit }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <h2 className="text-[14px] text-[#18181b]" style={{fontFamily:"'Press Start 2P', monospace", lineHeight:1.4}}>Fun Zone</h2>
        <span className="text-[22px]">🎉</span>
      </div>
      <p className="text-[13px] text-[#71717a] -mt-2">Take a break — react to memes, test your Tech Week knowledge.</p>`,
  funzoneNewStart
);


// 5. FunZoneView passing setQuizzes in App
text = text.replace(
  `onQuizSubmit={(res) => { setQuizResults(prev => [...prev, { name: user?.name, dept: user?.dept, score: res.score, total: res.total, time: new Date().toLocaleTimeString() }]); toast(\`Quiz completed! You scored \${res.score}/\${res.total}\`, 'success'); }} />`,
  `onQuizSubmit={(res) => { setQuizResults(prev => [...prev, { name: user?.name, dept: user?.dept, score: res.score, total: res.total, time: new Date().toLocaleTimeString() }]); toast(\`Quiz completed! You scored \${res.score}/\${res.total}\`, 'success'); }} setQuizzes={setQuizzes} />`
);

// 6. AdminView passing quizzes, setQuizzes, quizResults in App
text = text.replace(
  `toast={toast} />}`,
  `toast={toast} quizzes={quizzes} setQuizzes={setQuizzes} quizResults={quizResults} />}`
);

fs.writeFileSync('index.html', text);
console.log('Successfully updated index.html for Quiz / FunZone.');
