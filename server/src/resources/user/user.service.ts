import UserModel from './../../resources/user/user.model';
import token from './../../utils/token';
import User from '@/resources/user/user.interface';

class UserService {
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(
        first_name: string,
        last_name: string,
        // phone_number: number,
        email: string,
        password: string,
        // role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                first_name,
                last_name,
                // phone_number,
                email,
                password,
                // role,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (error) {
            throw new Error("Unable to create user!");
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    }

    public async getAllUsers(
    ): Promise<User[]> {
        try {
            const users = await this.user.find({});

            return users;
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    }
}

export default UserService;