import { Request, Response, NextFunction} from 'express'
import { Favorite } from '../models/schemas/Favorite'
import * as debug from 'debug'

export class FavoritesController {

    test(req: Request, res: Response, next: NextFunction) {
        res.status(200).json({
            message: 'Hello World from controller!'
        });
    }

    getFavorite(req: Request, res: Response, next: NextFunction) {
        let favouriteId = req.params.id
        res.status(200).json({
            data: favouriteId
        });
    }       

    saveFavorite(req: Request, res: Response, next: NextFunction) {
        let favorite = new Favorite( req.body )
        favorite.save((err, savedFavorite) => {
            if (err) {
                res.status(500).json({
                    operaton: 'save',
                    error: err
                })
            } else {
                res.status(200).json({ 
                    operation: 'save',
                    favorite: savedFavorite 
                })
            }
        })
    }     

    updateFavorite(req: Request, res: Response, next: NextFunction) {
        let params = req.body
        res.status(200).json({ 
            operation: 'update',
            favorite: params 
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
        let params = req.body
        res.status(200).json({ 
            favorite: params 
        })
    }       
}

export default new FavoritesController()