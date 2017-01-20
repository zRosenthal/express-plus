/**
 * Created by evan on 11/20/16.
 */

import {Router, Request, Response, NextFunction} from 'express';
import {ParsedAsText, ParsedAsJson} from 'body-parser';
import {IUser} from '../modelInterfaces/IUser';
import UserRepository = require('../database/UserRepository');

export class UserRouter {
    router: Router;

    /**
     * Initialize the Router
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    getAll(req: Request & ParsedAsJson, res: Response, next: NextFunction) {
        let userRepo = new UserRepository();
        userRepo.findAll({}, null).then((result) => {
            res.json(result);
        }, err => {
            res.status(500).json(err);
        });
    };

    deleteAll(req: Request & ParsedAsJson, res: Response, next: NextFunction) {
        let userRepo = new UserRepository();
        userRepo.removeAll().then((result) => {
            res.json(result);
        }, err => {
            res.status(500).json(err);
        });
    };

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
        this.router.delete('/', this.deleteAll);
    }

}

// Create the TestRouter, and export its configured Express.Router
const gatheringRoutes = new UserRouter();
gatheringRoutes.init();

export default gatheringRoutes.router;
