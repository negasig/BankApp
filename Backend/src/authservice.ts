import { Injectable } from "@nestjs/common";
import { AppService } from "./service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService{
constructor(private appservice:AppService, private jwtservice:JwtService ){}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.appservice.findUserByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtservice.sign(payload),
    };
  }
}