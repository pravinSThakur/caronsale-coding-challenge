import { IToken } from "./IToken";

export interface IAuthService {
    getAuthenticationToken(userEmail: string, userPassword: string): Promise<IToken>;
}