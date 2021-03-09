import { IsEmail, IsNotEmpty, Matches, Min, MinLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

const passwordRegex = /^(?=\S*?[a-z])(?=\S*?[A-Z])(?=\S*?\d)(.){6,}$/

export class CreateUserDto {

  @MinLength(4, {
    message: "Минимальная длина логина - 4 символа"
  })
  username: string

  @IsEmail({}, {
    message: "email некорректный"
  })
  email: string


  @MinLength(6, {
    message: "Минимальная длина пароля - 6 символов"
  })
  @Matches(passwordRegex, {
    message: "В пароле должны быть буквы обоих регистров и цифры"
  })
  password: string

  @Match("password", {
    message: "Пароли не совпадают"
  })
  password2: string
}