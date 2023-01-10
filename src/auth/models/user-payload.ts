export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    phone: string;
    iat?: number;
    exp?: number;
}