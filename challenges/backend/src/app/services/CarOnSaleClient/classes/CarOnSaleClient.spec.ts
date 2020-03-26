import 'mocha'
import {ICarOnSaleClient} from '../interface/ICarOnSaleClient'
import {CarOnSaleClient} from '../classes/CarOnSaleClient'
import {AuthService} from '../../AuthService/classes/AuthService'
import {IAuction} from '../interface/IAuction'
const rp = require('request-promise');
import GetBuyersActionsApiResponse = require("../../../test-data/GetBuyersActionsApiResponse.json");
import GetRunningAcutionsOutput = require("../../../test-data/GetRunningAcutionsOutput.json");
import {expect} from 'chai'

import Bluebird from 'bluebird'
import sinon from 'sinon'

/* describe("Happy path ---", function(){
    it("Testing valid response", async ()=> {
        const carOnSaleClient = new CarOnSaleClient();
        const runningAuctions: IAuction[] = await carOnSaleClient.getRunningAuctions();
        console.log("Got running auctions:" + JSON.stringify(runningAuctions));
    });
}) */

describe("Happy path ---", function(){
    it("Testing valid response", async ()=> {
        const token = {
            "token": "eeyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlRPS0VOLXNhbGVzbWFuQHJhbmRvbS5jb20iLCJpYXQiOjE1ODUyMTgxMTksImV4cCI6MTU4NTQ3NzMxOX0.hEEzR9JNtYU7-yiC_7SUBj9Q91LsTeqKcAyyvgO2t8Lh70RltETPxilTWpxdSQEVMjP3I0tUmA3BgaLC8KegNWm5wMcNUWMZoZuubvYOKC20G4gsbD6J43tFMojFEU2ZjRY8Sw5iEq1Px04ERYSB3AZs4lyNP99Vn82DochikwU",
            "authenticated": true,
            "userId": "salesman@random.com",
            "internalUserId": 1,
            "internalUserUUID": "ce5e3d7f-3a3d-4fde-96bc-986d5f483df8",
            "type": 1,
            "privileges": "{PUBLIC_USER}~{SALESMAN_USER}"
        }
        const authServiceStub = sinon.stub(AuthService.prototype, 'getAuthenticationToken')
        authServiceStub.returns(Bluebird.resolve(token));  

        let sandbox = sinon.createSandbox();
        let getStub = sandbox.stub(rp, 'Request');
        let response = 
        getStub.resolves({items: GetBuyersActionsApiResponse.items});

        const carOnSaleClient: ICarOnSaleClient = new CarOnSaleClient();
        const runningAuctions: IAuction[] = await carOnSaleClient.getRunningAuctions();

        console.log("Got running auctions:" + JSON.stringify(runningAuctions));
    });
})