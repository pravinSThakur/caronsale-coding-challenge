/**
 * Created by prthakur on 24-03-2020.
 */

import { ICarOnSaleClient } from '../interface/ICarOnSaleClient'
import { IAuthService } from '../../AuthService/interfaces/IAuthService'
import { injectable, inject } from "inversify"
import { DependencyIdentifier } from '../../../DependencyIdentifiers'
import { IAuction } from '../interface/IAuction'
import * as requestPromise from 'request-promise'

@injectable()
export class CarOnSaleClient implements  ICarOnSaleClient{
    @inject(DependencyIdentifier.AUTH_SERVICE) private authService: IAuthService;
    //Use authService to implement authentication functionality 
    //Use REST client to get the list of all the auction for given user - Use API /v2/auction/buyer/ to get running auction for authenticated user
    //Return array of object representing IAuction interface from above REST API output
    public async getRunningAuctions():  Promise<IAuction[]>{
        return [];
    }
}