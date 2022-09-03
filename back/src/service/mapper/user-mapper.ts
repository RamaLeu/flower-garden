import { User } from '../../entity/User';
import { UserResponse } from '../../models/Response/user';

export class UserMapper {
    public static toApiUser(user: User): UserResponse {
        return {
            username: user.username,
            role: user.role
        };
    }
}
