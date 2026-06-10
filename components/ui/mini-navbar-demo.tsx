import { MiniNavbar } from '@/components/ui/mini-navbar';

export default function MiniNavbarDemo() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#06050c] text-white">
      <img
        className="absolute inset-0 h-full w-full object-cover opacity-30 grayscale"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&auto=format&fit=crop&q=80"
        alt=""
      />
      <MiniNavbar applyHref="https://lu.ma/beyond-the-algorithm-myntra" />
      <main className="relative z-10 flex min-h-screen items-center justify-center px-6 pt-28 text-center">
        <h1 className="text-5xl font-medium tracking-tight md:text-7xl">Women in Tech</h1>
      </main>
    </div>
  );
}
