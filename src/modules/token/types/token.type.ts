export type Tokens = AccessToken & RefreshToken;

export interface AccessToken {
  access_token: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export interface MailVerificationToken {
  email_token: string;
}
