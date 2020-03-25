import { IAuthService } from '../interfaces/IAuthService'
import { constants } from '../../../common/constants'
import * as requestPromise from 'request-promise'
import { sha512 } from 'sha512'
import { IToken } from '../interfaces/IToken'
import { injectable } from 'inversify'
import "reflect-metadata";

@injectable()
export class AuthService implements IAuthService{
    public constructor() {
    }
    public async getAuthenticationToken(userEmail: string, userPassword: string): Promise<IToken> {
        const hashedPassword: string = this.getHashedPassword(userPassword, constants.NUM_HASH_CYCLES);
        const options = {
            method: 'PUT',
            uri: constants.CAR_ON_SALE_SERVER_BASE_URL + constants.USER_AUTHENTICATION_API_PATH + userEmail,
            body: {
                password: hashedPassword
            },
            json: true
        };
        const response: any =  await requestPromise.get(options);
        const token: IToken = response.data;
        return token;
    }

    private getHashedPassword(userPassword: string, cycles: number): string{
        let hash = userPassword;
        for (let i = 1; i <= cycles; i++) {
            hash = sha512(hash);
        }
        return hash;
    }
}