export interface IGoogleAuthResponse {
  authToken: string;
  id: string;
  idToken: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  provider: string;
  response: any;
}

// access_token: string;
// expires_in: number;
// id_token: string;
// login_hint: string;
// scope: string;
// session_state: any;
// token_type: string
