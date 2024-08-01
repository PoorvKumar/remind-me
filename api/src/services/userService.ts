import { User } from "../entity/User";
import { AppDataSource } from "../config/data-source";

export class UserService
{
    private userRepository=AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]>
    {
        return await this.userRepository.find();
    }

    async getProfile(user: User): Promise<User>
    {
        return user;
    }

    async updateProfile(user: User, userData: Partial<User>): Promise<User>
    {
        const { firstName, lastName, profilePicture }=userData;

        if(firstName) user.firstName=firstName;
        if(lastName) user.lastName=lastName;
        if(profilePicture) user.profilePicture=profilePicture;

        return await this.userRepository.save(user);
    }

    async deleteAccount(user: User): Promise<void>
    {
        await this.userRepository.remove(user);
    }
}