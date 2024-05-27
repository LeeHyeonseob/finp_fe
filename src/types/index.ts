export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    reward: number;
    user: User;
    createdAt: string;
    updatedAt: string;
    favoritesCount: number;
    views: number;
}

export interface AuthResponse {
    token: string;
    user: User;
}