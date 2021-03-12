import { Body, Controller, Get, Post, UseGuards, Request, Query, Param } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateResutDto } from "src/result/dto/create-result.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller("/user")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  
  @Post("/registration")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post("/test")
  passTest(@Body() createResultDto: CreateResutDto, @Request() req) {
    return this.usersService.passTest(req.user, createResultDto)
  }
  
  @UseGuards(JwtAuthGuard)
  @Get("/test")
  getResults(@Request() req) {
    return this.usersService.getResults(req.user)
  }
  @Get("/test/:id")
  getOneResult(@Param("id") id, @Query("userId") userId) {
    return this.usersService.getOneResult({id, userId})
  }

  @Get()
  getAll() {
    return this.usersService.getAll()
  }
  
}
