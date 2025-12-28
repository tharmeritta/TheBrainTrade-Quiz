import React from 'react';
import { Language, QuizDefinition } from '../types';
import { UI_STRINGS } from '../constants';

interface QuizSelectorProps {
    quizzes: QuizDefinition[];
    language: Language;
    onSelectQuiz: (quizId: string) => void;
    onBack: () => void;
}

const QuizSelector: React.FC<QuizSelectorProps> = ({ quizzes, language, onSelectQuiz, onBack }) => {
    const ui = UI_STRINGS[language];

    return (
        <div className="p-8 animate-in slide-in-from-right-4 duration-300 h-full flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">{ui.selectQuiz}</h1>
            
            <div className="space-y-4 flex-grow">
                {quizzes.map((quiz) => (
                    <button 
                        key={quiz.id}
                        onClick={() => onSelectQuiz(quiz.id)}
                        className="w-full text-left p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-1">
                            {quiz.title[language]}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {quiz.description[language]}
                        </p>
                    </button>
                ))}
            </div>

            <div className="mt-8">
                <button 
                    onClick={onBack}
                    className="w-full py-3 text-gray-500 font-medium hover:text-gray-800 transition-colors"
                >
                    ← {ui.backToHome}
                </button>
            </div>
        </div>
    );
};

export default QuizSelector;