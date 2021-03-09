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
    if (user && bcrypt.compareSync(pass, user.password) && user.confirmed) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const { username, _id, confirmed, email } = user._doc;
    console.log(user._doc)
    console.log(username, email)
    const payload = { username,email, sub: _id };
    console.log(confirmed);
    if (!confirmed) {
      return new HttpException('Email не подтверждён', 400);
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verifyUser(hash: string) {
    try {
      console.log("VERIFY")
      if (!hash) {
        console.log("not cahe")
        throw new HttpException('Неправильная ссылка', 400);
      }
      const user = await this.usersModel.findOne({ confirmedHash: hash });
      console.log(hash)
      console.log(user)
      if (!user ) {
        throw new HttpException('Пользователя не существует', 400);
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