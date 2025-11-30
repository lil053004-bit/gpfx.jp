import { X, ExternalLink, Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import AnalysisRenderer from './AnalysisRenderer';
import AIAccuracyChart from './AIAccuracyChart';

interface DiagnosisModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysis: string;
  stockCode: string;
  stockName: string;
  onLineConversion: () => void;
  onReportDownload: () => void;
  isStreaming?: boolean;
  isConnecting?: boolean;
}

export default function DiagnosisModal({
  isOpen,
  onClose,
  analysis,
  stockCode,
  stockName,
  onLineConversion,
  onReportDownload,
  isStreaming = false,
  isConnecting = false,
}: DiagnosisModalProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Reset scroll position to top when modal opens
  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ touchAction: 'none', background: 'radial-gradient(ellipse at center, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.98) 50%, rgba(0, 0, 0, 1) 100%)' }}>
      <div className="relative w-full max-w-3xl max-h-[90vh]">
        <div className="relative rounded-2xl shadow-2xl overflow-hidden" style={{ touchAction: 'auto', backgroundColor: 'rgba(31, 41, 55, 0.95)', backdropFilter: 'blur(10px)' }}>
          <div
            className="sticky top-0 px-6 py-4 flex items-center justify-between"
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.25)', backdropFilter: 'blur(10px)' }}
          >
          <div className="flex-1 text-center">
            <h2 className="text-sm font-bold text-white">
              {stockName}（{stockCode}）AI分析レポート
            </h2>
            {isConnecting && (
              <div className="flex items-center gap-2 text-white text-sm justify-center mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>AIサーバーに接続中...</span>
              </div>
            )}
            {isStreaming && !isConnecting && (
              <div className="flex items-center gap-2 text-white text-sm justify-center mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>レポート生成中...</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full transition-colors ml-4 hover:bg-white/20"
            aria-label="閉じる"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div ref={contentRef} className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6">
          <div className="mb-6">
            <div className="mb-4 p-4 rounded-xl border-2" style={{ backgroundColor: 'rgba(185, 28, 28, 0.2)', borderColor: 'rgba(239, 68, 68, 0.5)' }}>
              <p className="text-xs text-red-300 leading-relaxed">
                <strong className="text-red-400">⚠️ 免責事項：</strong>
                この分析は参考情報のみであり、投資助言ではありません。AI分析の正確性は保証されません。投資判断は必ずご自身の責任で行ってください。
              </p>
            </div>

            <div className="rounded-xl p-6 shadow-inner relative" style={{ backgroundColor: 'rgba(55, 65, 81, 0.5)', backdropFilter: 'blur(5px)' }}>
              <div className="prose prose-sm max-w-none">
                {isConnecting ? (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: '#ffffff' }} />
                    <p className="font-semibold" style={{ color: '#ffffff' }}>AI分析中...</p>
                    <p className="text-sm mt-2" style={{ color: '#d1d5db' }}>処理中...</p>
                  </div>
                ) : (
                  <div>
                    <AnalysisRenderer text={analysis} />
                    {isStreaming && (
                      <span className="inline-block w-2 h-5 animate-pulse ml-1" style={{ backgroundColor: '#ffffff' }}></span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={onLineConversion}
              className="relative w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-sm mt-6 hover:scale-105 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.95) 0%, rgba(126, 34, 206, 0.95) 50%, rgba(107, 33, 168, 0.95) 100%)', color: 'white' }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-1" style={{ top: '20%', left: '15%', animationDelay: '0s' }} />
                <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float-2" style={{ top: '60%', left: '25%', animationDelay: '1s' }} />
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-3" style={{ top: '40%', left: '70%', animationDelay: '1.5s' }} />
                <div className="absolute w-1 h-1 bg-white/50 rounded-full animate-float-1" style={{ top: '70%', left: '80%', animationDelay: '0.5s' }} />
                <div className="absolute w-1.5 h-1.5 bg-white/30 rounded-full animate-float-2" style={{ top: '30%', left: '50%', animationDelay: '2s' }} />
                <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-float-3" style={{ top: '80%', left: '40%', animationDelay: '1.2s' }} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent animate-shine" />
              <ExternalLink className="w-6 h-6 flex-shrink-0 relative z-10" />
              <span className="relative z-10">LINEで定期AIレポートを受け取る</span>
            </button>

            <div className="mt-3 p-4 rounded-xl" style={{ backgroundColor: 'rgba(55, 65, 81, 0.6)', backdropFilter: 'blur(5px)' }}>
              <div className="flex items-start gap-2 mb-2">
                <ExternalLink className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#ffffff' }} />
                <p className="text-sm font-bold" style={{ color: '#ffffff' }}>
                  【重要】外部サービスへの移動について
                </p>
              </div>
              <ul className="text-xs text-gray-300 leading-relaxed space-y-1.5 ml-1">
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: '#ffffff' }}>•</span>
                  <span>このボタンをクリックすると、<strong>LINE公式アプリまたはLINE公式サイト（第三者サービス）に移動</strong>します。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: '#ffffff' }}>•</span>
                  <span>LINEは当サービスとは<strong>独立した別のサービス</strong>です。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                  <span><strong className="text-green-400">現在無料</strong>：LINEへの移動後も現在追加料金はかかりません。</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold mt-0.5" style={{ color: '#4ade80' }}>✓</span>
                  <span>LINE友だち追加で定期的に最新のAI分析レポートが受け取れます（配信頻度はサービス状況によります）。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
