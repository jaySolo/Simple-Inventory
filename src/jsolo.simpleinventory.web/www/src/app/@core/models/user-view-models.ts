import { User } from './user';


export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangeUserPassword {
  password: string;
  confirmPassword: string;
  adminPassword: string;
}

export interface EditableUser extends User, ChangeUserPassword {
}
