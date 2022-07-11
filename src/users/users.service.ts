import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>){}

    async create(createUserDto:CreateUserDto):Promise<User>{
        // Do not create an account with same email !
        if (await this.findOne(createUserDto.email)){
            throw new BadRequestException () 
        }


        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async findOne(email:string):Promise<User>{
        return this.userModel.findOne({email}).exec();
    }

}
