import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-[95%] mx-auto relative">
      <div
        className="bg-black/80 backdrop-blur-md rounded-t-[64px] px-6 py-10 shadow-2xl border-t-2 border-x-2 border-white/10 relative overflow-visible"
        style={{
          minHeight: '40vh'
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white text-center mb-3">
              早速始めましょう
            </h2>
            <p className="text-base text-gray-300 text-center">
              銘柄コードまたは銘柄名を入力してください
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
