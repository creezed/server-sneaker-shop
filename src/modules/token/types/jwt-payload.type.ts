export type JwtPayloadAccess = {
  email: string;
  id: number;
};

export type JwtPayloadRefresh = {
  email: string;
  id: number;
};

export type JwtPayloadMail = {
  code: number;
};
