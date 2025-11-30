export default function EnhancedTitle() {
  return (
    <div className="flex flex-col items-center gap-4 px-4">
      <div
        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(128, 128, 128, 0.25)'
        }}
      >
        <div
          className="w-3 h-3 rounded-full animate-pulse"
          style={{
            backgroundColor: '#4ade80',
            boxShadow: '0 0 10px #4ade80'
          }}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          AI株式診断分析
        </h1>
      </div>

      <div className="text-center space-y-2 max-w-2xl">
        <p className="text-base md:text-lg text-white/90 leading-relaxed">
          銘柄コードを入力して、AIによる詳細な株式分析を受けましょう。
        </p>
      </div>
    </div>
  );
}
