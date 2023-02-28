import {JwtPayloadRefresh} from "@/modules/token/types/jwt-payload.type";

export interface CurrentUser extends JwtPayloadRefresh{ 
  refreshToken: string;
}
