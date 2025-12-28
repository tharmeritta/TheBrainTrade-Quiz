export type Language = 'en' | 'vi' | 'th';

export type QuestionType = 'tf' | 'mcq' | 'fill';

export interface QuestionData {
    en: string;
    vi: string;
    th: string;
    type: QuestionType;
    // For TF and Fill
    a?: string; 
    // For MCQ
    options?: {
        en: string[];
        vi: string[];
        th: string[];
    };
    correctIdx?: number;
}

export interface QuizUIOverrides {
    scoreLabel?: Record<Language, string>;
    finishTitle?: Record<Language, string>;
    finishSub?: Record<Language, string>;
    feedbackHigh?: Record<Language, string>;
    feedbackMid?: Record<Language, string>;
    feedbackLow?: Record<Language, string>;
}

export interface QuizDefinition {
    id: string;
    title: Record<Language, string>;
    description: Record<Language, string>;
    questions: QuestionData[];
    uiOverrides?: QuizUIOverrides;
}

export interface UIStrings {
    qLabel: string;
    scoreLabel: string;
    finishTitle: string;
    finishSub: string;
    outOf: string;
    correct: string;
    incorrect: string;
    submit: string;
    placeholder: string;
    trueTxt: string;
    falseTxt: string;
    msgHigh: string;
    msgMed: string;
    msgLow: string;
    backToHome: string;
    startQuiz: string;
    selectQuiz: string;
    understandingTitle: string;
    salesTitle: string;
    // Name Entry
    enterNameLabel: string;
    namePlaceholder: string;
    startBtn: string;
    hello: string;
}