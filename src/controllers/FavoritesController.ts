import { Request, Response, NextFunction} from 'express';

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
        let params = req.body
        res.status(200).json({ 
            favorite: params 
        })
    }       
    updateFavorite(req: Request, res: Response, next: NextFunction) {
        let favouriteId = req.params.id
    }       
    deleteFavorite(req: Request, res: Response, next: NextFunction) {
        let favouriteId = req.params.id
    }       
    getAllFavorites(req: Request, res: Response, next: NextFunction) {
        let favouriteId = req.params.id
    }       
}

export default new FavoritesController()