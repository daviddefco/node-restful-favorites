import { Router } from 'express';
import FavoritesController from '../controllers/FavoritesController'

export class Routes {
    router: Router

    constructor() {
        this.router = Router()
        this.configureRoutes()
    }

    configureRoutes() {
        this.router.get('/', FavoritesController.test)
        this.router.get('/favourite/:id', FavoritesController.getFavorite)
        this.router.post('/favourite/:id', FavoritesController.getFavorite)
        this.router.post('/save', FavoritesController.saveFavorite)
    }
}

const routes = new  Routes()
export default routes.router