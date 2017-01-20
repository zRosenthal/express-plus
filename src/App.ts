import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import LoginRouter from './routes/LoginRouter';
import * as mongoose from 'mongoose';
import AuthService = require('./services/AuthService');
import UserRouter from './routes/UserRouter';


// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.database();
        this.middleware();
        this.routes();
    }

    private database(): void {
        let uristring =
            process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongo/db';

        mongoose.connect(uristring, function (err, res) {
            if (err) {
                console.log('ERROR connecting to: ' + uristring + '. ' + err);
            } else {
                console.log('Succeeded connected to: ' + uristring);
            }
        });
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        this.express.use('/api/v1/login', LoginRouter);
        this.express.use(AuthService.isAuthenticated);
        // Auth protected routes start here
        this.express.use('/api/v1/users', UserRouter);
    }

}

export default new App().express;