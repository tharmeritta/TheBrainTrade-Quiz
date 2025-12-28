import React from 'react';
import { Language, UIStrings, QuizUIOverrides } from '../types';
import { UI_STRINGS } from '../constants';

interface ResultScreenProps {
    score: number;
    total: number;
    language: Language;
    userName: string;
    onRestart: () => void;
    uiOverrides?: QuizUIOverrides;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ score, total, language, userName, onRestart, uiOverrides }) => {
    const ui: UIStrings = UI_STRINGS[language];
    const ratio = score / total;
    
    // Determine overrides or default
    const title = uiOverrides?.finishTitle?.[language] || ui.finishTitle;
    const subtitle = uiOverrides?.finishSub?.[language] || ui.finishSub;
    
    let emoji = '🏆';
    let message = uiOverrides?.feedbackHigh?.[language] || ui.msgHigh;

    if (ratio < 0.5) {
        emoji = '📚';
        message = uiOverrides?.feedbackLow?.[language] || ui.msgLow;
    } else if (ratio < 0.8) {
        emoji = '👍';
        message = uiOverrides?.feedbackMid?.[language] || ui.msgMed;
    }

    return (
        <div className="text-center py-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="text-7xl mb-6 animate-bounce">{emoji}</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-1">{title}</h2>
            <h3 className="text-xl font-medium text-blue-600 mb-2">{ui.hello}, {userName}!</h3>
            <p className="text-gray-500 mb-6">{subtitle}</p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 inline-block min-w-[200px] border border-gray-100">
                <span className="block text-5xl font-black text-blue-600 mb-1">{score}</span>
                <span className="text-gray-400 font-medium">
                    {ui.outOf} <span className="text-gray-600">{total}</span>
                </span>
                {uiOverrides?.scoreLabel && (
                     <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
                        {uiOverrides.scoreLabel[language]}
                     </div>
                )}
            </div>
            
            <p className="text-lg text-gray-600 font-medium px-4 leading-relaxed mb-8 max-w-md mx-auto">
                {message}
            </p>

            <button 
                onClick={onRestart}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5"
            >
                {ui.backToHome}
            </button>
        </div>
    );
};

export default ResultScreen;