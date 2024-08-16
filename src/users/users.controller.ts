import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

//import { ClientProxy } from '@nestjs/microservices';
//import { ConfigService } from '@nestjs/config';
import { UserService } from './users.service';

@Controller('users')
export class PostController {
  // private readonly client: ClientProxy;

  constructor(
    // private readonly configService: ConfigService,
    private readonly usersService: UserService,
  ) {
    //this.client = this.configService.get<ClientProxy>('nats');
  }

  // @Get('post/:id')
  // async getPostsByUserId(@Param('id') id: string) {
  //   try {
  //     this.client.emit('getPosts', { userId: id });
  //   } catch (error) {
  //     console.error('Error publishing message:', error);
  //   }
  // }

  @Post()
  async addUser(
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userEmail,
      userPassword,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('email') userEmail: string,
    @Body('password') userPassword: string,
  ) {
    await this.usersService.updateUser(userId, userEmail, userPassword);
    return null;
  }

  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
