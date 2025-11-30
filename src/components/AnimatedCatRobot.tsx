import { useState, useEffect } from 'react';

export default function AnimatedCatRobot() {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isLicking, setIsLicking] = useState(false);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000 + Math.random() * 2000);

    const lickInterval = setInterval(() => {
      setIsLicking(true);
      setTimeout(() => setIsLicking(false), 1500);
    }, 8000 + Math.random() * 4000);

    return () => {
      clearInterval(blinkInterval);
      clearInterval(lickInterval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <div className="relative w-40 h-40">
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))' }}
        >
          <defs>
            <linearGradient id="catBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#e8f4f8', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c0d9e8', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          <g className="animate-tail-wag origin-[170_120]">
            <path
              d="M 165 115 Q 175 100 185 90 Q 190 80 188 70"
              fill="none"
              stroke="#8ca8bc"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <circle cx="188" cy="68" r="8" fill="#6b8ca0" />
          </g>

          <ellipse cx="100" cy="120" rx="60" ry="55" fill="url(#catBodyGradient)" />

          <g transform={isLicking ? 'translate(-5, -8)' : 'translate(0, 0)'} className="transition-transform duration-300">
            <ellipse cx="70" cy="95" rx="18" ry="22" fill="#e8f4f8" />
            <circle cx="65" cy="90" r="6" fill="#ff9db5" />
          </g>

          <ellipse cx="130" cy="95" rx="18" ry="22" fill="#e8f4f8" />
          <circle cx="135" cy="90" r="6" fill="#ff9db5" />

          <g>
            <circle cx="100" cy="110" r="48" fill="#1a2332" />
            <ellipse cx="100" cy="115" rx="45" ry="40" fill="#0d1520" />
          </g>

          <g>
            <path
              d="M 50 85 L 45 80 M 50 85 L 48 90 M 50 85 L 55 85"
              stroke="#6b8ca0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 150 85 L 155 80 M 150 85 L 152 90 M 150 85 L 145 85"
              stroke="#6b8ca0"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <g>
            <polygon
              points="75,65 65,40 70,65"
              fill="#e8f4f8"
              stroke="#d0e5f0"
              strokeWidth="2"
            />
            <polygon
              points="125,65 135,40 130,65"
              fill="#e8f4f8"
              stroke="#d0e5f0"
              strokeWidth="2"
            />
            <polygon
              points="70,50 65,40 75,45"
              fill="#ffd4e5"
            />
            <polygon
              points="130,50 135,40 125,45"
              fill="#ffd4e5"
            />
          </g>

          <g>
            <ellipse
              cx="85"
              cy="105"
              rx="10"
              ry={isBlinking ? 1 : 10}
              fill="#4a9eff"
              className="transition-all duration-100"
            />
            <circle cx="85" cy="105" r="4" fill="#ffffff" opacity="0.8" />
            <circle cx="87" cy="103" r="2" fill="#ffffff" />

            <ellipse
              cx="115"
              cy="105"
              rx="10"
              ry={isBlinking ? 1 : 10}
              fill="#4a9eff"
              className="transition-all duration-100"
            />
            <circle cx="115" cy="105" r="4" fill="#ffffff" opacity="0.8" />
            <circle cx="117" cy="103" r="2" fill="#ffffff" />
          </g>

          <g>
            <circle cx="90" cy="118" r="4" fill="#ff9db5" opacity="0.6" />
            <circle cx="110" cy="118" r="4" fill="#ff9db5" opacity="0.6" />
          </g>

          <g>
            <path
              d="M 100 120 L 100 128"
              stroke="#8ca8bc"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 100 128 Q 95 132 90 130"
              fill="none"
              stroke="#8ca8bc"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M 100 128 Q 105 132 110 130"
              fill="none"
              stroke="#8ca8bc"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          <path
            d="M 100 132 Q 100 137 95 138 Q 100 139 100 140"
            fill="#ff9db5"
            opacity="0.8"
          />

          {isLicking && (
            <g className="animate-fade-in">
              <ellipse
                cx="62"
                cy="98"
                rx="4"
                ry="6"
                fill="#ff6b9d"
                opacity="0.8"
              />
            </g>
          )}
        </svg>
      </div>

      <svg
        width="140"
        height="24"
        viewBox="0 0 140 24"
        className="-mt-4"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
      >
        <ellipse
          cx="70"
          cy="12"
          rx="70"
          ry="12"
          fill="#1b2962"
        />
        <ellipse
          cx="70"
          cy="8"
          rx="60"
          ry="8"
          fill="#2a3d7a"
          opacity="0.6"
        />
        <ellipse
          cx="70"
          cy="5"
          rx="45"
          ry="5"
          fill="#3a4d8a"
          opacity="0.4"
        />
      </svg>

      <style>{`
        @keyframes tail-wag {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-15deg); }
          75% { transform: rotate(15deg); }
        }
        .animate-tail-wag {
          animation: tail-wag 2s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
