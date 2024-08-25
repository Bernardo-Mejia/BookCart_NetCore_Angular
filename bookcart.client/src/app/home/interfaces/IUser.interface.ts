export class IUser {
  userId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  userTypeId?: number;
  isLoggedIn?: boolean;
}


export interface IUserDetail {
  userId: number;
  username: string;
  userTypeId: number;
  isLoggedIn: boolean;
}
