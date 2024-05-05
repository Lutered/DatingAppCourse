import { photo } from "./photo";


export interface Member {
    id: number;
    userName: string;
    age: number;
    knownAs: string;
    photoUrl: string;
    created: Date;
    lastActive: Date;
    gender: string;
    introduction: string;
    lookingFor: string;
    interests: string;
    city: string;
    country: string;
    photos: photo[];
}