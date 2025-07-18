type Role = 'User' | 'Admin';

export interface User {
  id: string;
  username: string;
  role: Role;
}