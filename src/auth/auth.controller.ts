import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { SignupDto } from './dtos/signup.dto';
import { UserDto } from './dtos/user.dto';
import { LoginDto } from './dtos/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: SignupDto): Promise<UserDto> {
    return this.usersService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Request() req) {
    return this.usersService.login(req.user);
  }
}
