import * as mongoose from 'mongoose';
import {IUser} from '../modelInterfaces/IUser';
import {ObjectID} from 'mongodb';
let Schema = mongoose.Schema;

let userSchema = new Schema({
    provider: String,
    id: String,
    email: String,
}, {
    timestamps: true
});

let UserModel = mongoose.model < IUser >('User', userSchema);

class User {
    public _id: ObjectID;
    public id: String;
    public email: String;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(user: Object) {
        this._id = user['_id'];
        this.id = user['id'];
        this.email = user['email'];
        this.createdAt = user['createdAt'];
        this.updatedAt = user['updatedAt'];
    }
}
// make this available to our users in our Node applications
export {UserModel, User};