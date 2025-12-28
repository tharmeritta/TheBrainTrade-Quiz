import React from 'react';
import { Language } from '../types';

interface StartScreenProps {
    onSelectLanguage: (lang: Language) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onSelectLanguage }) => {
    return (
        <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">The Brain Trade</h1>
            <p className="text-gray-500 mb-8 text-lg">Please select your language to start the quiz.</p>
            
            <div className="space-y-3 max-w-sm mx-auto">
                <button 
                    onClick={() => onSelectLanguage('th')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇹🇭 ภาษาไทย
                </button>
                <button 
                    onClick={() => onSelectLanguage('vi')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇻🇳 Tiếng Việt
                </button>
                <button 
                    onClick={() => onSelectLanguage('en')} 
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl font-bold text-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                    🇺🇸 English
                </button>
            </div>
        </div>
    );
};

export default StartScreen;