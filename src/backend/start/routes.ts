import ApisController from 'App/Controllers/Http/ApisController';
import { Router } from 'express';
const Route = Router();

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get('/greet',ApisController.greet)
Route.get('/configurations',ApisController.configurations)
Route.get('/users',ApisController.users)
Route.post('/configuration/insert', ApisController.insert_configuration)
Route.post('/configuration/update', ApisController.update_configuration)
Route.post('/configuration/delete', ApisController.delete_configuration)
Route.post('/user/insert', ApisController.insert_user)
Route.post('/user/update', ApisController.update_user)
Route.post('/user/delete', ApisController.delete_user)
export { Route as routes };
