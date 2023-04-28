import { UserEntity } from "src/infrastructure/entities/user.entity";
export interface UserModel extends Omit<UserEntity, "id" & "friend"> {};