import * as bcrypt from 'bcrypt';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';

// This should be a real class/interface representing a user entity

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new HttpException("Пользователя с такой почтой не существует", 400);
    }
    if (user && bcrypt.compareSync(pass, user.password) && user.confirmed) {
      const { password, ...result } = user;
      return result;
    }
    throw new HttpException("Неправильный логин или пароль", 400);
  }

  async login(user: any) {
    if (!user) {
      throw new HttpException("Не авторизован", 400)
    }
    const { username, _id, confirmed, email } = user._doc;
    const payload = { username,email, sub: _id };
    if (!confirmed) {
      throw new HttpException('Email не подтверждён', 400);
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async getProfile(user: any) {
    if (!user) {
      throw new HttpException("Не авторизован", 400)
    }
    return user;
  }

  async verifyUser(hash: string) {
    try {
      if (!hash) {
        throw new HttpException('Неправильная ссылка', 400);
      }
      const user = await this.usersModel.findOne({ confirmedHash: hash });
      if (!user ) {
        throw new HttpException('Пользователя не существует', 400);
      }
      if (user.confirmed) {
        throw new HttpException('Вы уже подтвердили свою почту', 400);
      }
      user.confirmed = true;
      await user.save();
      this.mailService.sendSuccessEmail({ emailTo: user.email });
      return "success"
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
