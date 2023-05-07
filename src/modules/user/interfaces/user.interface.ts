export interface UserId {
  id: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface Empty {}

export interface UserPages {
  rows: User[];
  count: number;
}
