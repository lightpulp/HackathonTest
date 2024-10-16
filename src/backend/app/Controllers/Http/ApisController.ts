import { Configuration } from 'Database/entities/configuration';
import { User } from 'Database/entities/user';
import { Response, Request } from 'express';

export default class ApisController {
    static async greet(request: Request, response: Response) {
        response.json({ greeting: `Hello, ${request.query.name}` });
    }

    static async configurations(request: Request, response: Response){
        const configuration = await Configuration.find();

        response.json({
            status: 1,
            data: configuration
        });
    }

    static async insert_configuration(request: Request, response: Response){
        const { key, value } = request.body;
        await Configuration.insert({key, value});

        const checkIfExist = await Configuration.findBy({ key });

        if(!checkIfExist){
            response.json({
                status: 0,
                message: "Configuration already exists!"
            });
        }

        response.json({
            status: 1,
            message: "Configuration has been inserted!",
        });
    }

    static async update_configuration(request: Request, response: Response){
        const { key, value } = request.body;
        const getConfiguration = await Configuration.findBy({ key });

        if(!getConfiguration){
            response.json({
                status: 0,
                message: "Configuration not found!"
            });
        }
        
        await Configuration.update({ key }, { value });
        response.json({
            status: 1,
            message: "Configuration has been updated!",
        });
    }

    static async delete_configuration(request: Request, response: Response){
        const { key } = request.body;
        const getConfiguration = await Configuration.findBy({ key });

        if(!getConfiguration){
            response.json({
                status: 0,
                message: "Configuration not found!"
            });
        }

        await Configuration.delete({ key });

        response.json({
            status: 1,
            message: "Configuration has been deleted!",
        });
    }





//User table 


//REEEEEEEEEEEAAAAAAAAAAAADDDDDDDDDDDDDDDDDD
static async users(request: Request, response: Response) {
    try {
        const users = await User.find();

        response.json({
            status: 1,
            data: users
        });
    } catch (error) {
        console.error("Error fetching users:", error);
        response.json({
            status: 0,
            message: "An error occurred while fetching users."
        });
    }
}

//INSSSSSSSEEEEEEEEEEEEEEERRRRRRRRRRRRRTTTTTTTTTTTT
static async insert_user(request: Request, response: Response) {
    const {
        user_FirstName,
        user_MiddleName,
        user_LastName,
        user_Username,
        user_Age,
        user_Email,
        user_Password,
        user_Region
    } = request.body;

    // Check if a user with the same username or email already exists
    const checkIfExist = await User.findOne({ where: { user_Username, user_Email } });

    if (checkIfExist) {
        response.json({
            status: 0,
            message: "User with this username or email already exists!"
        });
        return;
    }

    // Insert the new user into the database
    await User.insert({
        user_FirstName,
        user_MiddleName,
        user_LastName,
        user_Username,
        user_Email,
        user_Password,
        user_Region
    });

    response.json({
        status: 1,
        message: "User has been inserted!"
    });
}

//UPPPPPPPPPDDAAAAAAAAAAAAATTTTTTEEEEEEEEEEEE
static async update_user(request: Request, response: Response) {
    const {
        user_Id,
        user_FirstName,
        user_MiddleName,
        user_LastName,
        user_Username,
        user_Age,
        user_Email,
        user_Password,
        user_Region
    } = request.body;

    try {
        // Find user by ID
        const getUser = await User.findOneBy({ user_Id });

        if (!getUser) {
            response.json({
                status: 0,
                message: "User not found!"
            });
            return;
        }

        // Update user details
        await User.update(
            { user_Id },
            {
                user_FirstName,
                user_MiddleName,
                user_LastName,
                user_Username,
                user_Email,
                user_Password,
                user_Region
            }
        );

        response.json({
            status: 1,
            message: "User has been updated!",
        });
    } catch (error) {
        console.error("Error updating user:", error);
        response.json({
            status: 0,
            message: "An error occurred while updating the user."
        });
    }
}

//DEEEEEEEEELEEEEEEEEEEEEEETEEEEEEEEEEEEE
static async delete_user(request: Request, response: Response) {
    const { user_Id } = request.body; // Get the user ID from the request body

    try {
        // Find user by ID
        const getUser = await User.findOneBy({ user_Id });

        if (!getUser) {
            response.json({
                status: 0,
                message: "User not found!"
            });
            return;
        }

        // Delete the user
        await User.delete({ user_Id });

        response.json({
            status: 1,
            message: "User has been deleted!",
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        response.json({
            status: 0,
            message: "An error occurred while deleting the user."
        });
    }
}

}