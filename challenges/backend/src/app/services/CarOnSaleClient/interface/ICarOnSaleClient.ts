/**
 * This service describes an interface to access auction data from the CarOnSale API.
 */
import { IAuction } from './IAuction'

export interface ICarOnSaleClient {

    getRunningAuctions(): Promise<IAuction[]>

}