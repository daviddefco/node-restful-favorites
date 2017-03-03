import { Request, Response, NextFunction} from 'express'
import { Favorite, IFavoriteModel } from '../models/schemas/Favorite'
import * as debug from 'debug'

export class FavoritesController {

    test(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            message: 'Server up and running. Place a correct HTTP request please'
        });
    }

    getFavorite(req: Request, res: Response, next: NextFunction) {
        let favoriteId = req.params.id
        console.log(`Finding favorite ${favoriteId}`)
        Favorite.findById(favoriteId)
        .then((favorite: IFavoriteModel) => {
            if (!favorite) {
                res.status(404).json({
                    operation: 'findById',
                    error: `No favorite register found with ID ${favoriteId}`
                })
            } else {
                res.status(200).json({ 
                    operation: 'findById',
                    result: favorite 
                })
            }    
        })
        .catch((err) => {
            res.status(500).json({
                operaton: 'findById',
                error: err
            })
        })
    }       

    saveFavorite(req: Request, res: Response, next: NextFunction) {        
        let favorite = new Favorite( req.body )
        favorite.save()
        .then((savedFavorite: IFavoriteModel) => {
            res.status(200).json({ 
                operation: 'save',
                result: savedFavorite 
            })
        })
        .catch((err) => {
            res.status(500).json({
                operaton: 'save',
                error: err
            })                        
        })
    }     

    updateFavorite(req: Request, res: Response, next: NextFunction) {
        let favoriteId = req.params.id
        let updatedFavorite = req.body
        console.log(`Updating favorite ${favoriteId} with information:`)
        console.log(updatedFavorite)

        Favorite.findByIdAndUpdate(favoriteId, updatedFavorite)
        .then((updatedFavorite: IFavoriteModel) => {
            res.status(200).json({
                operation: 'update',
                result: updatedFavorite                
            })
        })
        .catch((err) => {
            res.status(500).json({
                operaton: 'update',
                error: err
            })                                    
        })
    }       
    deleteFavorite(req: Request, res: Response, next: NextFunction) {
        let params = req.body
        res.status(200).json({
            operation: 'delete', 
            favorite: params 
        })

    }  

    getAllFavorites(req: Request, res: Response, next: NextFunction) {
        console.log('Finding all favorites')
        Favorite.find({}).sort('+_id').exec((err, favorites) => {
            if (err) {
                res.status(500).json({
                    operaton: 'findAll',
                    error: err
                })
            } else {
                if (!favorites) {
                    res.status(404).json({
                        operation: 'findAll',
                        error: 'No favorite registers found'
                    })
                } else {
                    res.status(200).json({ 
                        operation: 'findAll',
                        result: favorites 
                    })
                }    
            }            
        })
    }       
}

export default new FavoritesController()