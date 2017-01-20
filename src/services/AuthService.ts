import {Router, Request, Response, NextFunction} from 'express';
import {ParsedAsText} from 'body-parser';
import jwt = require('jsonwebtoken');
import User = require('../database/UserRepository');

import Config = require('./../config');

class AuthService {

    static createAuthToken(user: User): string {
        return jwt.sign(user, Config.Config.secret(), {
            expiresIn: '14d'
        });
    }

    static isAuthenticated(req: Request, res: Response, next: NextFunction) {

        console.log(req.header('Authorization'));
        jwt.verify(req.header('Authorization'), Config.Config.secret(), function (err, decoded) {
            if (err) {
                // TODO: redirect to auth page somehow
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req['body']['user'] = <User> decoded;
                next();
            }
        });
    }

}

export = AuthService;