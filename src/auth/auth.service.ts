import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReadUserDto } from 'src/users/dto/read-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService:UsersService, private readonly jwtService:JwtService){}

    async validateUser(email:string, pass:string):Promise<any>{
        const user = await this.usersService.findOne(email) ;
        if (user && user.password === pass){
            const {password,...result} = user ;
            return result;
        }
        return null
    }

    async login(readUserDto:ReadUserDto){
        const foundUser = await this.usersService.findOne(readUserDto.email);
        if (!foundUser){
            throw new NotFoundException();
        }
        if (foundUser.password !== readUserDto.password){
            throw new NotFoundException();
        }
        const payload = {
            createdAt: new Date().toISOString(),
            sub: foundUser._id,
            role: 'user'
        }
        if (foundUser.email === 'vincent@manuceau.net'){
            payload.role = 'admin'
        }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

}
