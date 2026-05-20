import re

with open('index (1).html', 'r', encoding='utf-8') as f:
    text = f.read()

timer_code = """
function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        return {
          days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0'),
          hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
          minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
          seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
        };
      }
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="inline-block text-left border-t border-[rgba(255,255,255,0.15)] pt-6 mt-4 w-full max-w-[400px]">
      <div className="text-[10px] text-[rgba(255,255,255,0.6)] tracking-[0.2em] uppercase font-[800] mb-6">Grand Finale Begins In</div>
      <div className="flex items-center justify-between">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds }
        ].map(t => (
          <div key={t.label} className="flex flex-col gap-3">
            <span className="h-display text-4xl lg:text-6xl text-white tracking-tight leading-none" style={{fontWeight: 400}}>{t.value}</span>
            <span className="text-[9px] text-[rgba(255,255,255,0.5)] tracking-[0.15em] uppercase font-mono font-bold">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
"""

text = re.sub(r'function HomeView', timer_code + '\nfunction HomeView', text, count=1)

with open('index (1).html', 'w', encoding='utf-8') as f:
    f.write(text)
