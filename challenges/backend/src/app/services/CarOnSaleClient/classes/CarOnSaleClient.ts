/**
 * Created by prthakur on 24-03-2020.
 */

import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { IAuthService } from '../../AuthService/interfaces/IAuthService'
import { AuthService } from '../../AuthService/classes/AuthService'
import { injectable, inject } from "inversify"
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAuction } from '../interface/IAuction'
import * as requestPromise from 'request-promise'
import { IToken } from '../../AuthService/interfaces/IToken'
import { constants } from '../../../common/constants'
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient{
    private authService: IAuthService
    public constructor() {
        this.authService = new AuthService();
    }
    //Use authService to implement authentication functionality 
    //Use REST client to get the list of all the auction for given user - Use API /v2/auction/buyer/ to get running auction for authenticated user
    //Return array of object representing IAuction interface from above REST API output
    public async getRunningAuctions():  Promise<IAuction[]>{
        const token: IToken = await this.authService.getAuthenticationToken(constants.TEST_USER_EMAIL_ID, constants.TEST_USER_PASSWORD);
        const runningAuctions: any = await this.getBuyersRunningAuctions(token);
        return runningAuctions.map(function(auction){
            return {
                numBids: auction.numBids,
                minimumRequiredAsk: auction.minimumRequiredAsk,
                currentHighestBidValue: auction.currentHighestBidValue
            }
        });
    }

    private async getBuyersRunningAuctions(token: IToken): Promise<any> {
        const httpHeaders = {
            "userid": token.userId,
            "authtoken": token.token
        }
        const options = {
            uri: constants.CAR_ON_SALE_SERVER_BASE_URL + constants.AUCTION_BUYER_API_PATH,
            headers: httpHeaders,
            json: true
        };
        const response: any =  await requestPromise.get(options);
        return response.items;
    }
}