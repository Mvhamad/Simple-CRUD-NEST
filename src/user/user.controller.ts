import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
    constructor(private userService: UserService){}

    // get all users
    @Get('users')
    async  getUsers() : Promise<User[]>  {
        return await this.userService.allUsers();
    }

    // post new user
    @Post('new-user')
    async newUser( @Body() user: createUserDto) :Promise<User> {
        return await this.userService.createUser(user)
    }

    // update user
    @Put( 'edit-user/:id')
    async updateUser (@Param('id') id: string , @Body() user: updateUserDto) : Promise<User> {
        return this.userService.updateUserInfo(id, user);
    }

    // delete user
    @Delete("del-user/:id")
    async deleteUser(@Param('id') id:string) :  Promise<User>{
        return this.userService.deleteUser(id)
    }

    // get an user by id
    @Get('user/:id')
    async getUser(@Param('id') id: string) : Promise<User>{
       const user = this.userService.getUserById(id);
       if(!user) {
        throw ("User not found");
       } else{
           return user;
       }
    }
}
