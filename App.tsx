import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizGame from './components/QuizGame';
import QuizSelector from './components/QuizSelector';
import NameEntryScreen from './components/NameEntryScreen';
import { Language } from './types';
import { QUIZZES } from './constants';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language | null>(null);
    const [currentQuizId, setCurrentQuizId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
    };

    const handleQuizSelect = (quizId: string) => {
        setCurrentQuizId(quizId);
    };

    const handleNameSubmit = (name: string) => {
        setUserName(name);
    };

    const handleBackToLang = () => {
        setLanguage(null);
        setCurrentQuizId(null);
        setUserName(null);
    };

    const handleBackFromQuiz = () => {
        setCurrentQuizId(null);
        setUserName(null);
    };

    const handleExit = () => {
        // Reset completely to home
        setLanguage(null);
        setCurrentQuizId(null);
        setUserName(null);
    };

    const currentQuiz = QUIZZES.find(q => q.id === currentQuizId);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-xl glass-card rounded-3xl shadow-2xl overflow-hidden relative min-h-[600px] flex flex-col">
                {!language ? (
                    <div className="p-8 flex-grow flex flex-col justify-center">
                        <StartScreen onSelectLanguage={handleLanguageSelect} />
                    </div>
                ) : !currentQuizId ? (
                     <QuizSelector 
                        quizzes={QUIZZES} 
                        language={language} 
                        onSelectQuiz={handleQuizSelect}
                        onBack={handleBackToLang}
                     />
                ) : !userName ? (
                    <NameEntryScreen 
                        language={language}
                        onNameSubmit={handleNameSubmit}
                        onBack={handleBackFromQuiz}
                    />
                ) : (
                    <QuizGame 
                        language={language} 
                        quiz={currentQuiz!}
                        userName={userName} 
                        onExit={handleExit} 
                    />
                )}
            </div>
            
            {/* Background decoration elements */}
            <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
                 <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                 <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                 <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>
        </div>
    );
};

export default App;