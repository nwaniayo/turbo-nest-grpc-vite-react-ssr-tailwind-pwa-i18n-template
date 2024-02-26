import { Controller } from '@nestjs/common';
//import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { UsersServiceController, CreateUserDto, UpdateUserDto, UsersServiceControllerMethods, FindOneUserDto, PaginationDto, FindOneUserByPrimaryEmailAddressDto, User } from '@common/hms-lib';
import { Observable } from 'rxjs';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UsersService) {}

  async createUser(request: CreateUserDto) {
    return await this.usersService.create(request);
  }

  async findAllUsers() {
    return await this.usersService.findAll();
  }

  async findOneUser(findOneUserDto: FindOneUserDto) {
    return await this.usersService.findOne(findOneUserDto.id);
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    return await this.usersService.update(updateUserDto.id, updateUserDto);
  }

  async removeUser(findOneUserDto: FindOneUserDto) {
    return await this.usersService.remove(findOneUserDto.id);
  }

  queryUsers(paginationDtoStream: Observable<PaginationDto>) {
    return this.usersService.queryUsers(paginationDtoStream);
  }

  async findOneUserByPrimaryEmailAddress(findOneUserByPrimaryEmailAddressDto: FindOneUserByPrimaryEmailAddressDto){
    return await this.usersService.findOneUserByPrimaryEmailAddress(findOneUserByPrimaryEmailAddressDto.primaryEmailAddress);
  }
}
