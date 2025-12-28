import React, { useState, useEffect, useCallback } from 'react';
import { Language, QuizDefinition } from '../types';
import { UI_STRINGS } from '../constants';
import ResultScreen from './ResultScreen';

interface QuizGameProps {
    language: Language;
    quiz: QuizDefinition;
    userName: string;
    onExit: () => void;
}

const QuizGame: React.FC<QuizGameProps> = ({ language, quiz, userName, onExit }) => {
    const [currentIdx, setCurrentIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState<{ msg: string; type: 'correct' | 'incorrect' } | null>(null);
    const [isFinished, setIsFinished] = useState(false);
    
    // Animation states for buttons
    const [selectedBtnIndex, setSelectedBtnIndex] = useState<number | null>(null);
    const [animClass, setAnimClass] = useState<string>('');

    const ui = UI_STRINGS[language];
    
    const questions = quiz.questions;
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIdx];

    // Reset state if quiz changes
    useEffect(() => {
        setCurrentIdx(0);
        setScore(0);
        setIsFinished(false);
        setFeedback(null);
        setInputValue('');
        setIsLocked(false);
    }, [quiz.id]);

    const handleChoice = useCallback((val: string, index?: number) => {
        if (isLocked) return;
        setIsLocked(true);
        setSelectedBtnIndex(index ?? null);

        let isCorrect = false;
        let displayCorrect = "";

        if (currentQuestion.type === 'tf') {
            isCorrect = (val === currentQuestion.a);
            displayCorrect = (currentQuestion.a === 'true') ? ui.trueTxt : ui.falseTxt;
        } else if (currentQuestion.type === 'mcq') {
            const labels = currentQuestion.options?.[language] || [];
            displayCorrect = labels[currentQuestion.correctIdx || 0];
            isCorrect = (val === displayCorrect);
        } else if (currentQuestion.type === 'fill') {
            const answer = currentQuestion.a || '';
            isCorrect = (val.toString().trim().toLowerCase() === answer.toLowerCase());
            displayCorrect = answer;
        }

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback({ msg: ui.correct, type: 'correct' });
            setAnimClass('animate-pulse-green bg-emerald-500 border-emerald-500 text-white');
        } else {
            setFeedback({ msg: `${ui.incorrect} ${displayCorrect}`, type: 'incorrect' });
            setAnimClass('animate-shake bg-red-500 border-red-500 text-white');
        }

        setTimeout(() => {
            if (currentIdx < totalQuestions - 1) {
                setCurrentIdx(prev => prev + 1);
                setIsLocked(false);
                setFeedback(null);
                setInputValue('');
                setSelectedBtnIndex(null);
                setAnimClass('');
            } else {
                setIsFinished(true);
            }
        }, 1800);
    }, [isLocked, currentQuestion, language, ui, currentIdx, totalQuestions]);

    if (isFinished) {
        return (
            <ResultScreen 
                score={score} 
                total={totalQuestions} 
                language={language} 
                userName={userName}
                onRestart={onExit} 
                uiOverrides={quiz.uiOverrides}
            />
        );
    }

    const progressPercent = (currentIdx / totalQuestions) * 100;
    const headerScoreLabel = quiz.uiOverrides?.scoreLabel?.[language] || ui.scoreLabel;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
                        {ui.qLabel} {currentIdx + 1}/{totalQuestions}
                    </span>
                    <span className="text-sm font-bold text-gray-400">
                        {headerScoreLabel}: <span className="text-gray-800">{score}</span>
                    </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-blue-500 transition-all duration-500 ease-out" 
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
            </div>

            <div className="p-8">
                {/* Question */}
                <h2 className="text-xl font-bold text-gray-800 mb-8 leading-tight animate-in fade-in slide-in-from-right-4 duration-300" key={currentIdx}>
                    {currentQuestion[language]}
                </h2>
                
                <div className="space-y-3">
                    {currentQuestion.type === 'tf' && (
                        <>
                            {[ui.trueTxt, ui.falseTxt].map((label, idx) => {
                                const val = idx === 0 ? 'true' : 'false';
                                const isSelected = selectedBtnIndex === idx;
                                const baseClass = "w-full p-4 text-left border-2 border-gray-100 rounded-xl font-medium text-gray-700 bg-white shadow-sm hover:border-blue-200 focus:outline-none transition-all duration-200";
                                const finalClass = isSelected ? `${baseClass} ${animClass}` : baseClass;
                                
                                return (
                                    <button 
                                        key={idx}
                                        onClick={() => handleChoice(val, idx)}
                                        disabled={isLocked}
                                        className={finalClass}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </>
                    )}

                    {currentQuestion.type === 'mcq' && (
                         currentQuestion.options?.[language].map((label, idx) => {
                             const isSelected = selectedBtnIndex === idx;
                             const baseClass = "w-full p-4 text-left border-2 border-gray-100 rounded-xl font-medium text-gray-700 bg-white shadow-sm hover:border-blue-200 focus:outline-none transition-all duration-200";
                             const finalClass = isSelected ? `${baseClass} ${animClass}` : baseClass;

                             return (
                                <button 
                                    key={idx}
                                    onClick={() => handleChoice(label, idx)}
                                    disabled={isLocked}
                                    className={finalClass}
                                >
                                    {label}
                                </button>
                             );
                         })
                    )}

                    {currentQuestion.type === 'fill' && (
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                disabled={isLocked}
                                placeholder={ui.placeholder}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && inputValue.trim()) {
                                        handleChoice(inputValue, 0);
                                    }
                                }}
                                className={`w-full p-4 border-2 border-gray-100 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg font-bold transition-all ${isLocked && selectedBtnIndex === 0 ? animClass.replace('text-white', '') : ''}`} 
                            />
                            <button 
                                onClick={() => handleChoice(inputValue, 0)}
                                disabled={isLocked || !inputValue.trim()}
                                className={`w-full py-4 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${selectedBtnIndex === 0 ? animClass : ''}`}
                            >
                                {ui.submit}
                            </button>
                        </div>
                    )}
                </div>

                {/* Feedback */}
                <div 
                    className={`mt-8 text-center font-bold text-lg min-h-[1.5rem] transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'} ${feedback?.type === 'correct' ? 'text-emerald-600' : 'text-red-500'}`}
                >
                    {feedback?.msg || '...'}
                </div>
            </div>
        </div>
    );
};

export default QuizGame;