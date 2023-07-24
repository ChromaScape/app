export const API_ENDPOINT = "https://chromascape-api.vercel.app/api";

export interface ApiUser {
    id: bigint,
    firebase_uid: string,
    createdAt: Date
};