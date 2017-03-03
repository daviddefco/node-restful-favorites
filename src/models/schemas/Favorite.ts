import * as mongoose from "mongoose"
import { IFavorite } from '../interfaces/Favorite'
import * as bluebird from 'bluebird'

(<any>mongoose).Promise = bluebird

export interface IFavoriteModel extends IFavorite, mongoose.Document {

}

var favoriteSchema: mongoose.Schema = new mongoose.Schema ({
    title: String,
    description: String,
    url: String,
    createdAt: Date
})

favoriteSchema.pre('save', next => {
    console.log('llega al hook')
    let now = new Date()
    if (!this.createdAt) {
        this.createdAt = now
    }
    console.log('pre ' + this.createdAt)
    next()
})

export const Favorite: mongoose.Model<IFavoriteModel> = mongoose.model<IFavoriteModel>("Favorite", favoriteSchema)