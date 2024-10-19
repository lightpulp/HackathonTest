import { User } from 'Database/entities/user';
import { Response, Request } from 'express';

export default class UserController {
    static async insert_user(request: Request, response: Response) {
        const { user_FirstName, user_MiddleName, user_LastName, user_Username, user_Email, user_Password, user_Region } = request.body;

        const newUser = User.create({
            user_FirstName,
            user_MiddleName,
            user_LastName,
            user_Username,
            user_Email,
            user_Password,
            user_Region
        });

        await newUser.save();

        response.json({
            status: 1,
            message: "User has been registered successfully!"
        });
    }
}
