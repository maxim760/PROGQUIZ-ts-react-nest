import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post("/registration")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  getAll() {
    return this.usersService.getAll()
  }
  
}
