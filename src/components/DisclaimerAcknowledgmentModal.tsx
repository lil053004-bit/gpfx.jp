import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DisclaimerAcknowledgmentModalProps {
  onAcknowledge: () => void;
}

export default function DisclaimerAcknowledgmentModal({ onAcknowledge }: DisclaimerAcknowledgmentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAgreed, setHasAgreed] = useState(false);

  useEffect(() => {
    const hasAcknowledged = sessionStorage.getItem('disclaimerAcknowledged');
    if (!hasAcknowledged) {
      setTimeout(() => setIsVisible(true), 500);
    } else {
      onAcknowledge();
    }
  }, [onAcknowledge]);

  const handleAcknowledge = () => {
    if (!hasAgreed) return;

    sessionStorage.setItem('disclaimerAcknowledged', 'true');
    setIsVisible(false);
    onAcknowledge();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-red-500/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-red-900/90 to-orange-900/90 backdrop-blur-md p-6 border-b-2 border-red-500/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-red-500/20 p-3 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-red-300">重要な免責事項</h2>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-red-900/30 border-2 border-red-500/50 rounded-xl p-5">
            <h3 className="text-lg font-bold text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              ご利用前に必ずお読みください
            </h3>
            <div className="space-y-4 text-gray-200">
              <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-bold text-red-300 mb-2">【本サービスの性質】</p>
                <p className="text-sm leading-relaxed">
                  本サービスは、AI技術を活用した株式市場の<strong className="text-yellow-300">参考情報提供ツール</strong>です。
                  <strong className="text-red-400">投資助言業務、投資一任業務、金融商品仲介業務には該当せず</strong>、
                  特定の金融商品の売買を推奨・勧誘するものでは一切ありません。
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-orange-500">
                <p className="font-bold text-orange-300 mb-2">【AI分析の限界】</p>
                <p className="text-sm leading-relaxed">
                  AIによる分析結果は<strong className="text-yellow-300">あくまで参考情報</strong>であり、
                  その<strong className="text-red-400">正確性、完全性、適時性を保証するものではありません</strong>。
                  AI技術には限界があり、市場の急激な変動や予期せぬ事象を正確に予測できない場合があります。
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                <p className="font-bold text-yellow-300 mb-2">【投資リスクについて】</p>
                <p className="text-sm leading-relaxed">
                  株式投資には<strong className="text-red-400">価格変動リスク、信用リスク、流動性リスク等</strong>が伴い、
                  <strong className="text-red-400">投資元本を大きく割り込む可能性</strong>があります。
                  過去の運用実績や分析結果は将来の運用成果を保証するものでは一切ありません。
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-red-500">
                <p className="font-bold text-red-300 mb-2">【投資判断の責任】</p>
                <p className="text-sm leading-relaxed">
                  <strong className="text-red-400 text-base">最終的な投資判断は、必ず利用者ご自身の責任において行ってください。</strong>
                  本サービスの利用により生じたいかなる損害についても、当社は一切の責任を負いません。
                  実際に投資を行う際は、証券会社等の金融商品取引業者にご相談されることをお勧めします。
                </p>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-4">
                <p className="font-bold text-slate-300 mb-2">【登録情報】</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
                  金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={hasAgreed}
                onChange={(e) => setHasAgreed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-2 border-slate-500 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors">
                上記の免責事項を理解し、本サービスが投資助言ではなく参考情報の提供のみを目的としていること、
                投資判断は自己責任で行う必要があることに同意します。
              </span>
            </label>
          </div>

          <button
            onClick={handleAcknowledge}
            disabled={!hasAgreed}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-lg ${
              hasAgreed
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white cursor-pointer'
                : 'bg-slate-700 text-slate-500 cursor-not-allowed'
            }`}
          >
            {hasAgreed ? '同意してサービスを利用する' : 'チェックボックスにチェックを入れてください'}
          </button>

          <p className="text-xs text-center text-gray-400">
            このウィンドウはセッション中に1回のみ表示されます
          </p>
        </div>
      </div>
    </div>
  );
}
