interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className="relative w-full text-white font-bold py-4 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden"
          style={{
            background: disabled ? '#D1D5DB' : 'linear-gradient(135deg, rgba(147, 51, 234, 0.95) 0%, rgba(126, 34, 206, 0.95) 50%, rgba(107, 33, 168, 0.95) 100%)',
            height: '56px'
          }}
        >
          {!disabled && (
            <>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-1" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
                <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float-2" style={{ top: '60%', left: '25%', animationDelay: '1s' }} />
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-3" style={{ top: '40%', left: '70%', animationDelay: '1.5s' }} />
                <div className="absolute w-1 h-1 bg-white/50 rounded-full animate-float-1" style={{ top: '70%', left: '80%', animationDelay: '0.5s' }} />
                <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float-2" style={{ top: '30%', left: '50%', animationDelay: '2s' }} />
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-3" style={{ top: '80%', left: '40%', animationDelay: '1.2s' }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shine" />
            </>
          )}
          <span className="relative z-10 text-lg">診断を開始する</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 leading-relaxed">
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
