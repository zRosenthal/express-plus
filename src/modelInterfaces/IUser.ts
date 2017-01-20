import * as mongoose from 'mongoose';
import {ObjectID} from 'mongodb';
/**
 * Created by evan on 11/18/16.
 */

interface IUser extends mongoose.Document {
    _id: ObjectID;
    id: String;
    email: String;
    createdAt: Date;
    updatedAt: Date;
}

export {IUser};