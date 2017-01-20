import UserRepository = require('../../database/UserRepository');
import {User} from '../../models/User';
import jwt = require('jsonwebtoken');

class UserService {

    private userRepo: UserRepository;

    constructor() {
        this.userRepo = new UserRepository();
    }

    getUserFromToken(token: string): Promise<User> {
        let decoded = jwt.decode(token);
        console.log(`decoded: ${JSON.stringify(decoded)}`);
        // TODO: Get id from auth token here

        return null;
        // let id = '0';
        // return this.userRepo.findById(id);
    }

}

export = UserService;