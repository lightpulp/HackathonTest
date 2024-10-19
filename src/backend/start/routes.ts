import ApisController from 'App/Controllers/Http/ApisController';
import UserController from 'App/Controllers/Http/UserController';
import { Router } from 'express';
const Route = Router();

Route.get('/configurations',ApisController.configurations)
Route.post('/configuration/insert', ApisController.insert_configuration)
Route.post('/configuration/update', ApisController.update_configuration)
Route.post('/configuration/delete', ApisController.delete_configuration)

//User Routes
Route.post('/user/insert', UserController.insert_user);

export { Route as routes };