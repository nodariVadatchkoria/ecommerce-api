import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CategoryDto } from '../category/dtos/category.dto';
import { UserDto } from '../auth/dtos/user.dto';
import { CategoryCreateDto } from '../category/dtos/category-create.dto';
import { SignupDto } from '../auth/dtos/signup.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: UserDto,
    isArray: true,
  })
  async getAll(): Promise<UserDto[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async getOne(@Param('id') id: number): Promise<UserDto> {
    return await this.usersService.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async create(@Body() dto: SignupDto): Promise<UserDto> {
    return await this.usersService.create(dto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: UserDto,
  })
  async update(@Param('id') id: number, @Body() dto: SignupDto) {
    return await this.usersService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.usersService.delete(id);
  }
}
