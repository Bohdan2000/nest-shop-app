import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(email: string, password: string) {
    const newUser = new this.userModel({
      email,
      password,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      email: user.email,
      password: user.password,
    };
  }

  async updateUser(userId: string, email: string, password: string) {
    const updatedUser = await this.findUser(userId);
    if (email) {
      updatedUser.email = email;
    }
    if (password) {
      updatedUser.password = password;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (!result) {
      throw new NotFoundException('Could not find user.');
    }
  }

  private async findUser(id: string): Promise<any> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      return false;
    }
    return user;
  }
}
