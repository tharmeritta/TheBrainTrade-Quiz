import React, { useState } from 'react';
import { Language } from '../types';
import { UI_STRINGS } from '../constants';

interface NameEntryScreenProps {
    language: Language;
    onNameSubmit: (name: string) => void;
    onBack: () => void;
}

const NameEntryScreen: React.FC<NameEntryScreenProps> = ({ language, onNameSubmit, onBack }) => {
    const [name, setName] = useState('');
    const ui = UI_STRINGS[language];

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (name.trim()) {
            onNameSubmit(name.trim());
        }
    };

    return (
        <div className="p-8 animate-in fade-in zoom-in duration-300 flex flex-col h-full justify-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{ui.enterNameLabel}</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-sm mx-auto">
                <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={ui.namePlaceholder}
                    className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg transition-all text-center font-bold text-gray-900 placeholder:text-gray-400 shadow-sm"
                    autoFocus
                />
                
                <button 
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                    {ui.startBtn}
                </button>
            </form>

            <button 
                onClick={onBack}
                className="mt-8 text-gray-400 font-medium hover:text-gray-600 transition-colors text-sm text-center w-full"
            >
                ← {ui.backToHome}
            </button>
        </div>
    );
};

export default NameEntryScreen;