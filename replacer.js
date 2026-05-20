const fs = require('fs');
let text = fs.readFileSync('c:/Daksh/tra 2/Tech Week/index (1).html', 'utf8');

const newCode = `function CalendarView() {
  const TIMELINE = [
    { date:'Jun 16', day:'Monday', title:'Registration opens', desc:'Portal goes live.', time:'09:00', type:'Milestone', isLive:true },
    { date:'Jul 2', day:'Thursday', title:'Building with Claude & MCP', desc:'Dr. Ananya Krishnan · AI Tools', time:'15:00', type:'Session' },
    { date:'Jul 3', day:'Friday', title:'Cursor for Hackathons', desc:'Rahul Dev · AI Tools', time:'11:00', type:'Session' },
    { date:'Jul 4', day:'Saturday', title:'InfoSec Approval Fast-Track', desc:'Sanjay Gupta · InfoSec', time:'14:00', type:'Session' },
    { date:'Jul 6', day:'Monday', title:'Registration closes', desc:'No extensions.', time:'23:59', type:'Deadline' },
    { date:'Jul 7', day:'Tuesday', title:'Round one — Ideation opens', desc:'Two-page submission', time:'09:00', type:'Round' },
    { date:'Jul 10', day:'Friday', title:'Round one — Submission closes', desc:'No extensions.', time:'23:59', type:'Deadline' },
    { date:'Jul 11', day:'Saturday', title:'Round one results', desc:'Top 30 revealed', time:'16:00', type:'Announcement' },
    { date:'Jul 13', day:'Monday', title:'No-meeting day · Build begins', desc:'SLT approved pause', time:'All day', type:'Pause' },
    { date:'Jul 14', day:'Tuesday', title:'No-deploy day · Demo prep', desc:'P0 incidents only', time:'All day', type:'Pause' },
    { date:'Jul 15', day:'Wednesday', title:'Round two — Prototype demos', desc:'Top 5 finalists selected', time:'10:00', type:'Round' },
    { date:'Jul 16', day:'Thursday', title:'Pitch rehearsals + Jury panel', desc:'', time:'10:00', type:'Round' },
    { date:'Jul 17', day:'Friday', title:'Grand Finale — Shark Tank format', desc:'CEO + CTO + Guest Sharks', time:'11:00', type:'Finale' },
  ];

  return (
    <div className="max-w-[900px] mx-auto space-y-12 fade-up py-4">
      <div className="text-center space-y-4">
        <h2 className="text-[36px] md:text-[48px] font-[900] text-[#18181b] tracking-tighter uppercase leading-none">31 days of hustle</h2>
        <p className="text-[14px] md:text-[16px] text-[#71717a] max-w-lg mx-auto leading-relaxed font-medium">
          From registration to Shark Tank finale, every key session, every milestone.
        </p>
      </div>

      <div className="relative border-l-2 border-[#e4e4e7] ml-4 md:ml-[140px] py-2 space-y-8">
        {TIMELINE.map((item, i) => {
          const typeColors = {
            'Milestone': 'bg-[#3333FF] border-[#3333FF] text-white',
            'Session': 'bg-white border-[#e4e4e7] text-[#52525b]',
            'Deadline': 'bg-[#fef2f2] border-[#fca5a5] text-[#dc2626]',
            'Round': 'bg-[#eff6ff] border-[#bfdbfe] text-[#2563eb]',
            'Announcement': 'bg-[#f0fdf4] border-[#bbf7d0] text-[#16a34a]',
            'Pause': 'bg-[#fdf4ff] border-[#f5d0fe] text-[#c026d3]',
            'Finale': 'bg-[#fffbeb] border-[#fde68a] text-[#d97706]',
          };
          const style = typeColors[item.type] || typeColors['Session'];
          
          return (
            <div key={i} className="relative pl-8 md:pl-12 group">
              <div className="absolute left-[-9px] top-1">
                {item.isLive ? (
                  <span className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3333FF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#3333FF]"></span>
                  </span>
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-white bg-[#d4d4d8] group-hover:bg-[#18181b] transition-colors" />
                )}
              </div>

              <div className="hidden md:block absolute left-[-140px] top-0 w-[120px] text-right pr-6">
                <p className={\`text-[15px] font-[900] \${item.isLive?'text-[#3333FF]':'text-[#18181b]'}\`}>{item.date}</p>
                <p className="text-[11px] font-[800] text-[#a1a1aa] uppercase tracking-[0.15em] mt-0.5">{item.day}</p>
              </div>

              <div className="md:hidden mb-2.5">
                <span className={\`text-[12px] font-[800] px-2.5 py-1 rounded-[3px] uppercase tracking-wide \${item.isLive?'bg-[#eeeeff] text-[#3333FF]':'bg-[#f4f4f5] text-[#71717a]'}\`}>
                  {item.date} · {item.day}
                </span>
              </div>

              <div className={\`p-5 rounded-[3px] border hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all bg-white flex flex-col sm:flex-row sm:items-start justify-between gap-4 \${item.isLive?'border-[#3333FF] shadow-sm':'border-[#e4e4e7]'}\`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <p className={\`text-[17px] font-[800] leading-tight \${item.isLive?'text-[#3333FF]':'text-[#18181b]'}\`}>{item.title}</p>
                    {item.isLive && <span className="px-2 py-0.5 bg-[#3333FF] text-white text-[9px] font-[800] uppercase tracking-[0.15em] rounded-[3px]">Live Now</span>}
                  </div>
                  {item.desc && <p className="text-[13.5px] text-[#71717a] leading-relaxed font-medium">{item.desc}</p>}
                </div>
                <div className="flex flex-col items-start sm:items-end flex-shrink-0 gap-2">
                  <span className={\`px-2.5 py-1 border text-[10px] font-[800] uppercase tracking-wider rounded-[3px] \${style}\`}>{item.type}</span>
                  <span className="text-[12px] font-[800] text-[#52525b] bg-[#f9f9fa] border border-[#e4e4e7] px-2.5 py-1 rounded-[3px]">🕒 {item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}`;

const startIdx = text.indexOf('function CalendarView() {');
const endMarker = '/* ══════════════════════════════\n   ADMIN';
let endIdx = text.indexOf(endMarker);
if (endIdx === -1) endIdx = text.indexOf('/* ══════════════════════════════\r\n   ADMIN');

if (startIdx !== -1 && endIdx !== -1) {
  text = text.substring(0, startIdx) + newCode + '\n\n' + text.substring(endIdx);
  fs.writeFileSync('c:/Daksh/tra 2/Tech Week/index (1).html', text);
  console.log('Successfully replaced CalendarView');
} else {
  console.log('Could not find CalendarView block. startIdx:', startIdx, 'endIdx:', endIdx);
}
