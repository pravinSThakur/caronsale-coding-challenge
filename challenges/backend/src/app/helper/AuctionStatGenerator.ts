import {IAuction} from '../services/CarOnSaleClient/interface/IAuction'

export  function generateAuctionStats(runningAuctions: IAuction[]){
    let bidsTotal: number = 0;
    let auctionProgressTotal: number = 0;

    runningAuctions.forEach(auction => {
        bidsTotal += auction.numBids;
        //total percentage of auction progress
        auctionProgressTotal += auction.currentHighestBidValue / auction.minimumRequiredAsk;
    });

    return {
        numAuctions: runningAuctions.length,
        avgNumBids: bidsTotal / runningAuctions.length,
        avgPercentageAuctionProgress: auctionProgressTotal / runningAuctions.length
    }
}