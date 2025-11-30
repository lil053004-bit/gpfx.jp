export default function DisclaimerSection() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <div className="bg-gradient-to-r from-red-900/40 via-orange-900/40 to-red-900/40 backdrop-blur-md border-2 border-red-500/60 rounded-xl p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg md:text-xl font-bold text-red-300 mb-3">重要な免責事項</h3>
            <div className="space-y-2 text-sm md:text-base text-gray-200 leading-relaxed">
              <p className="font-bold text-red-200">
                ⚠️ 本サービスは情報提供のみを目的としており、投資助言・投資勧誘を行うものではありません。
              </p>
              <p>
                • AIによる分析は<strong className="text-yellow-300">参考情報</strong>であり、正確性・完全性・適時性は保証されません
              </p>
              <p>
                • 株式投資には<strong className="text-yellow-300">元本割れのリスク</strong>があります
              </p>
              <p>
                • 投資判断および投資行動は<strong className="text-yellow-300">必ずご自身の責任</strong>で行ってください
              </p>
              <p className="text-xs text-gray-300 mt-3 pt-3 border-t border-red-500/30">
                当サービスは金融商品取引業者ではなく、金融商品取引法第29条の登録を受けていません。個別の投資助言を行うことはできません。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
