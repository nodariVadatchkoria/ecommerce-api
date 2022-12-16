import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from '../dtos/signup.dto';
import { UserDto } from '../dtos/user.dto';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<UserDto> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(signupDto.password, salt);

      const user = new Users();
      user.email = signupDto.email;
      user.firstName = signupDto.firstName;
      user.lastName = signupDto.lastName;
      user.password = hash;
      user.role = 'admin';
      const created = await this.userRepository.save(user);

      return new UserDto(created);
    } catch (error) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      select: ['id', 'email', 'firstName', 'lastName', 'password', 'role'],
      where: { email },
    });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        delete foundUser.password;
        return result;
      }

      return null;
    }
    return null;
  }

  async login(user: Users) {
    const payload = { email: user.email, sub: user.id, role: user.role };

    return {
      user: new UserDto(user),
      accessToken: this.jwt.sign(payload),
    };
  }
}
