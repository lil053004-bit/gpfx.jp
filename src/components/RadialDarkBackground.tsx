export default function RadialDarkBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, #091855 0%, #0d0f1f 100%)'
        }}
      />

      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = Math.random() * 2 + 0.5;
          const opacity = Math.random() * 0.4 + 0.2;
          const delay = Math.random() * 3;

          return (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-twinkle"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                animationDelay: `${delay}s`,
                animationDuration: '4s'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
