import { User } from "../entity/User";
import { AppDataSource } from "../config/data-source";

export class UserService
{
    private userRepository=AppDataSource.getRepository(User);

    async getAllUsers(): Promise<User[]>
    {
        return await this.userRepository.find();
    }
}