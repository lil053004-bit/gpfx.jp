import { AlertTriangle, ExternalLink } from 'lucide-react';

interface LineConversionConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LineConversionConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
}: LineConversionConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-2xl shadow-2xl max-w-lg w-full">
        <div className="bg-gradient-to-r from-yellow-900/80 to-orange-900/80 backdrop-blur-md p-5 border-b-2 border-yellow-500/50 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
            <h2 className="text-xl font-bold text-yellow-300">外部サイトへ移動します</h2>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-200 leading-relaxed mb-3">
              LINEへ移動しますが、以下の点を再度ご確認ください：
            </p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>本サービスは<strong className="text-yellow-300">情報提供のみ</strong>を目的としています</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>提供された情報は<strong className="text-yellow-300">投資助言ではありません</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>投資判断は<strong className="text-yellow-300">必ずご自身の責任</strong>で行ってください</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span>外部サイトの内容について当社は責任を負いません</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
            <p className="text-xs text-red-300 leading-relaxed">
              <strong>重要：</strong>
              株式投資には元本割れのリスクがあります。AI分析結果の正確性は保証されません。
              投資は必ずご自身の判断と責任で行ってください。
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
            >
              キャンセル
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <span>理解して移動</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
