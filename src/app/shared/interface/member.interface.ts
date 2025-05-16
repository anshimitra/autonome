export interface Member {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  status: boolean;
  accessToken?: string;
  createdAt: string;
  role: number;
}
