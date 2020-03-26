import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import {ICarOnSaleClient} from './services/CarOnSaleClient/interface/ICarOnSaleClient';
import {IAuction} from './services/CarOnSaleClient/interface/IAuction'
import {generateAuctionStats} from './helper/AuctionStatGenerator'

import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
         @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        // TODO: Retrieve auctions and display aggregated information (see README.md)
        //Get the running auction for the users
        //Process the received auctions to get the required statistics out of it as the output
        //Log the collected statics as output of the client service
        //exit 0 on success
        //exit -1 on error
        try{
            const usersRunningAuctions: IAuction[] = await this.carOnSaleClient.getRunningAuctions();
            const auctionStats: any = generateAuctionStats(usersRunningAuctions);
            this.logResult(auctionStats);
            process.exit(0);
        }catch(err){
            this.logger.log("Got error while retrieving users running auctions: " + err);
            process.exit(-1);
        }
    }

    private logResult(auctionStats: any){
        this.logger.log("Number of auctions = " + auctionStats.numAuctions);
        this.logger.log("Average number of bids on an auction = " + auctionStats.avgNumBids);
        this.logger.log("Average percentage of the auction progress = " + auctionStats.avgPercentageAuctionProgress);
    }
}