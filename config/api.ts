export const API_ENDPOINT = "https://chromascape-api.vercel.app/api";

export interface ApiUser {
    id: bigint,
    firebase_uid: string,
    createdAt: Date
};

export interface Pattern {
    id: bigint,
    userId: bigint,
    content: string,
    createdAt: Date
}

export interface Device {
    id: bigint,
    firebase_uid: string,
    userId: bigint | null,
    patternId: bigint | null,
    lightLayout: string | null,
    createdAt: Date
}