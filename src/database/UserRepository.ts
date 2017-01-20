import Repository = require('./Repository');
import {IUser} from '../modelInterfaces/IUser';
import {UserModel, User} from '../models/User';
import * as mongoose from 'mongoose';

class UserRepository extends Repository<IUser, User> {
    constructor() {
        super(<mongoose.Model<IUser>>UserModel);
    }
}

export = UserRepository;