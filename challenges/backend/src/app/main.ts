import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {IAuthService} from "./services/AuthService/interfaces/IAuthService"
import {AuthService} from "./services/AuthService/classes/AuthService"
import {ICarOnSaleClient} from "./services/CarOnSaleClient/interface/ICarOnSaleClient"
import {CarOnSaleClient} from "./services/CarOnSaleClient/classes/CarOnSaleClient"
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<IAuthService>(DependencyIdentifier.AUTH_SERVICE).to(AuthService);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
