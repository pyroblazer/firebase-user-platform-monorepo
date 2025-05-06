export interface UserData {
    userId?: string;
    name?: string;
    city?: string;
    country?: string;
  }
  
  export interface UserState {
    data: UserData | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface UserCredentials {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    userId: string;
  }
  