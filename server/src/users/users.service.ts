import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUserDto } from './dto/create-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(user: CreateUserDto): Promise<Users> {
    try {
      const candidate = await this.findOne(user.username);
      if (candidate) {
        throw new HttpException('Такое имя пользователя уже существует', 400);
      }
      const candidateByEmail = await this.usersModel.findOne({
        email: user.email,
      });
      if (candidateByEmail) {
        throw new HttpException('Такой email уже существует', 400);
      }
      const { password2, ...registerData } = user;
      const hashPassword = await bcrypt.hash(user.password, 7);
      const confirmedHash = nanoid();
      this.mailService.sendInfoEmail({ emailTo: user.email, hash: confirmedHash });
      console.log(confirmedHash)
      const createdUser = await this.usersModel.create({
        ...registerData,
        password: hashPassword,
        confirmedHash,
      });
      return createdUser;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getAll() {
    return await this.usersModel.find();
  }
  async findOne(email: string): Promise<Users | undefined> {
    return await this.usersModel.findOne({ email });
  }
}
