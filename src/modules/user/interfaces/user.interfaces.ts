
export const USER_PACKAGE_NAME = 'user';

export const userProtoBufPackage = 'user';

export const USER_SERVICE_NAME = 'UserService';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
}

type Role = 'Admin' | 'Athlete' | 'Trainer';

export interface FindByIdRequest {
  id: number;
}

export interface EmptyRequest {}

export interface UserService {
  // findById(FindByIdRequest): Promise<User>;

  findAll(empty: EmptyRequest): Promise<User[]>;
}
