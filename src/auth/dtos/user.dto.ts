import { ApiProperty } from '@nestjs/swagger';
import { Users } from '../user.entity';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(users: Users) {
    this.id = users.id;
    this.firstName = users.firstName;
    this.lastName = users.lastName;
    this.email = users.email;
    this.role = users.role;
    this.createdAt = users.createdAt;
    this.updatedAt = users.updatedAt;
  }
}
