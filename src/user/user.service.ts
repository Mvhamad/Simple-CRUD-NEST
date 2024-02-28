import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private UserModel : mongoose.Model<User>,
    ){}

    // a function that will find all user in my database
    async allUsers() : Promise <User[]> {
        const users = await  this.UserModel.find().exec();
        return users
    }

    // a function for creating a new user and post it my database
    async createUser (user: User) : Promise <User> {
        const createdUser = await this.UserModel.create(user);
        return createdUser;
    }

    // a function that  will update the data of an existing user by his
    async updateUserInfo (id : string, user: User) : Promise<User> {
        const updatedUser = await this.UserModel.findByIdAndUpdate(id , user , {new: true, runValidators: true});
        return updatedUser
    }

    // a function to found an user by id
    async getUserById(id : string):Promise<User>{
        const user = await this.UserModel.findById(id).exec();
        if(!user){
            throw new NotFoundException('User not found');
        } 
        return user;
    }

    // a function  to delete an user by id
    async deleteUser(id: string) : Promise<any> {
        const deletedUser = await this.UserModel.findByIdAndDelete(id);
        return  {'deletedUser' : deletedUser, 'message': "User is deleted successfully"}
    }
}
