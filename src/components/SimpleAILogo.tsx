const WaveBar = ({ side, index }: { side: 'left' | 'right'; index: number }) => {
  const animationClass = `animate-wave-${(index % 15) + 1}`;
  const heights = [20, 28, 16, 35, 24, 18, 40, 26, 22, 30, 15, 32, 25, 38, 20, 28, 22, 36, 24, 30, 18, 34, 26, 32, 20];
  const spacing = 4;
  const offset = side === 'left' ? -80 - (index * spacing) : 80 + (index * spacing);

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
      style={{
        left: `calc(50% + ${offset}px)`,
        width: '3px'
      }}
    >
      <div
        className={`bg-white/60 rounded-full ${animationClass}`}
        style={{
          width: '100%',
          height: `${heights[index]}px`,
          filter: 'blur(0.5px)',
          transformOrigin: 'center',
          boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)'
        }}
      />
    </div>
  );
};

const GlowRing = ({ scale, delay }: { scale: number; delay: number }) => {
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/20 animate-ripple-ring"
      style={{
        width: `${scale}px`,
        height: `${scale}px`,
        animationDelay: `${delay}s`,
        filter: 'blur(1px)'
      }}
    />
  );
};

export default function SimpleAILogo() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4 relative overflow-hidden">
      <h1
        className="text-4xl font-bold text-white select-none animate-title-glow relative z-20"
        style={{
          fontFamily: "'Hiragino Sans', 'Noto Sans JP', sans-serif",
          letterSpacing: '0.05em'
        }}
      >
        AI株式分析
      </h1>

      <div className="relative w-full flex items-center justify-center" style={{ minHeight: '400px' }}>
        {Array.from({ length: 25 }, (_, i) => (
          <WaveBar key={`left-${i}`} side="left" index={i} />
        ))}
        {Array.from({ length: 25 }, (_, i) => (
          <WaveBar key={`right-${i}`} side="right" index={i} />
        ))}

        <div className="relative z-10">
          <div className="absolute inset-0 rounded-full w-32 h-32 blur-3xl opacity-50 animate-pulse"
            style={{background: 'radial-gradient(circle, rgba(192, 132, 252, 0.8) 0%, rgba(147, 51, 234, 0.4) 100%)'}}
          />

          <GlowRing scale={180} delay={0} />
          <GlowRing scale={220} delay={0.8} />
          <GlowRing scale={260} delay={1.6} />
          <GlowRing scale={300} delay={2.4} />

          <div className="relative z-10 w-32 h-32 rounded-full flex items-center justify-center overflow-hidden backdrop-blur-sm border-4 border-white/30"
            style={{
              background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.9) 0%, rgba(192, 132, 252, 0.9) 50%, rgba(147, 51, 234, 0.9) 100%)',
              boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4), 0 0 60px rgba(192, 132, 252, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent animate-shine" />

            <span className="text-5xl font-bold bg-gradient-to-br from-white to-purple-100 bg-clip-text text-transparent drop-shadow-lg relative z-10 select-none">
              AI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
