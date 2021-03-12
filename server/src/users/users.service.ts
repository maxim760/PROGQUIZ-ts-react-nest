import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { nanoid } from 'nanoid';
import { CreateUserDto } from './dto/create-user.dto';
import { Users, UsersDocument } from './schemas/users.schema';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { CreateResutDto } from 'src/result/dto/create-result.dto';
import { ResultService } from 'src/result/result.service';
import { Result } from 'src/result/schemas/result.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private usersModel: Model<UsersDocument>,
    private readonly mailService: MailService,
    private readonly resultService: ResultService,
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
      this.mailService.sendInfoEmail({
        emailTo: user.email,
        hash: confirmedHash,
      });
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

  async passTest(user: any, result: CreateResutDto): Promise<ObjectId> {
    try {
      if (!user) {
        throw new HttpException('Не авторизован', 401);
      }
      const addedRes = await this.resultService.create(result);
      if (addedRes?.isNew) {
        const currentUser = await this.usersModel.findById(user.userId);
        currentUser.results.push(addedRes.id);
        await currentUser.save()
      }
      return addedRes.id;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  
  async getResults(user: any): Promise<Result[]> {
    try {
      if (!user) {
        throw new HttpException('Не авторизован', 401);
      }
      console.log(user, "get reses")
      const currentUser = await this.usersModel.findById(user.userId).populate({ path: "results", populate: { path: "quiz", model: "Quiz" } })
      if (!currentUser) {
        throw new HttpException("Пользователь не найден", 400)
      }
      return currentUser.results

    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async getOneResult({ id, userId }: { id: ObjectId, userId: ObjectId }) {
    try {
      console.log(id)
      console.log(userId)
      const user = await this.usersModel.findById(userId)
      if (!user) {
        throw new HttpException("Пользователь не найден", 400)
      }
      const result = await this.resultService.getOne(id)
      const userFields = {
        _id: user._id,
        email: user.email,
        username: user.username
      }
      return {
        result,
        user: userFields
      }
    } catch (error) {
      throw new HttpException(error.message, 500)
    }
    
  }

  async getAll() {
    return await this.usersModel.find();
  }
  async findOne(email: string): Promise<Users | undefined> {
    return await this.usersModel.findOne({ email });
  }
}
