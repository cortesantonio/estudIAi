import type { Group } from "./Group";

export interface ParamsNewSession {
    focusing: string; /* enfoque, conceptos, generalidades, muy especificos, variados */
    quantity: number;
    title: string;
    typeOptions: string[]; /* seleccion multiple, verdadero y falso, seleccion unica, respuestas corta  */
    studyGroupId?: number;
}

export interface Session {
    id: number;
    studyGroupId: number;
    createdAt: Date;
    quizId?: number;
    studyGroup: Group;
    sessionAnswered: SessionAnswered[];
    quiz?: Quiz;
}

export interface SessionAnswered {
    id: number;
    sessionId: number;
    userId: number;
    answeredAt: Date;
    score: number;
}

export interface Quiz {
    id: number;
    title: string;
    description: string;
    duration?: number; // en minutos
    createdAt?: Date;
    quatityQuestion?: number;
    groupId?: number;
    group?: Group;
    questions?: Question[];
}

export interface Question {
    id: number;
    quizId: number;
    quiz?: Quiz;
    text: string;
    typelogy: string;
    options: string[];
    correctOption: number;
}

export interface Answer {
    id: number;
    userId: number;
    optionId: number;
    questionId: number;
    answeredAt: Date;
}