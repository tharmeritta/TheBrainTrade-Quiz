import React from 'react';
import { Language } from '../types';

interface StartScreenProps {
    onSelectLanguage: (lang: Language) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onSelectLanguage }) => {
    return (
        <div className="text-center py-6 animate-in fade-in zoom-in duration-300">
            {/* Logo removed as per request */}
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