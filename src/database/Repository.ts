/**
 * Created by evan on 11/19/16.
 */
import mongoose = require('mongoose');

class Repository <T extends mongoose.Document, U> {

    public Model: mongoose.Model<T>;

    constructor(model: mongoose.Model<T>) {
        this.Model = model;
    }

    create(object: U): Promise <any> {
        return new Promise<any>((resolve, reject) => {
            this.Model.create(object, (err, user) => {
                if (err)
                    reject(err);
                resolve(user);
            });
        });
    }

    findOrCreate(object: Object): Promise <any> {
        return this.findOne(object)
            .then(user => {
                if (user) {
                    console.log(`user: ${JSON.stringify(user)}`);
                    return user;
                }
                return this.create(object as U);
            }, err => {
                console.log(err);
                return err;
            });
    }

    findById(id): Promise<any> {
        return this.findOne({
            _id: id
        });
    }

    findOne(params): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            this.Model.findOne(params, function (err, entity) {
                if (err)
                    reject(err);

                resolve(entity);
            });
        });
    }

    findAll(params, lean): Promise<any> {
        if (!lean) {
            return this.Model.find(params).exec();
        } else {
            return this.Model.find(params).lean().exec();
        }
    };

    save(obj): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            let entity = new this.Model(obj);
            entity.save(function (err) {
                if (err)
                    reject(err);
                resolve(true);
            });
        });

    }

    update(entity): Promise < any > {
        return new Promise<any>((resolve, reject) => {
            return this.findById(entity.id).then((oldEntity) => {
                oldEntity = entity;
                return oldEntity.save();
            }, (err) => {
                reject(err);
            });
        });
    }

    delete(entity): Promise < any > {

        return new Promise<any>((resolve, reject) => {
            entity.remove(function (err) {
                if (err)
                    reject(err);
                resolve();
            });
        });

    }

    removeAll(): Promise<any> {
        return this.Model.remove({}).exec();
    }

    getModel(modelName): mongoose.Model < T > {
        return this.Model;
    }
}

export = Repository;
