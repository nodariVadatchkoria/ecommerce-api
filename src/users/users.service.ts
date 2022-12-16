import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../auth/user.entity';
import { UserDto } from '../auth/dtos/user.dto';
import { SignupDto } from "../auth/dtos/signup.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<UserDto[]> {
    return await this.usersRepository.find();
  }

  async getOne(id: number): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async create(dto: SignupDto): Promise<UserDto> {
    const user = new Users();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = dto.password;
    return await this.usersRepository.save(user);
  }

  async update(id: number, dto: SignupDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    return await this.usersRepository.save(user);
  }

  async delete(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    return await this.usersRepository.remove(user);
  }
}
