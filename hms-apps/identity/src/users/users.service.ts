import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
//import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import {
  CreateUserDto,
  PaginationDto,
  UpdateUserDto,
  Users,
} from '@common/hms-lib';
import { User as UserProps } from '@common/hms-lib';
// import { randomUUID } from 'crypto';
import { Observable, Subject } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserProps> {
    const user = await this.findOneUserByPrimaryEmailAddress(
      createUserDto.primaryEmailAddress,
    );

    if (user) {
      throw new Error('User already exists');
    }

    const newUser = this.userRepository.create(createUserDto);
    const theuser = await this.userRepository.save(newUser);

    // const user:User = { //these should be from entity
    //   ...createUserDto,
    //   id: randomUUID(),
    //   primaryEmailAddress: createUserDto.primaryEmailAddress,
    //   firstName: createUserDto.firstName,
    //   lastName: createUserDto.lastName,
    //   backupEmailAddress: '',
    //   phone: {},
    //   isPrimaryEmailAddressVerified: false,
    //   isBackupEmailAddressVerified: false,
    //   passwordHash: randomUUID()
    // }
    // this.users.push(user);

    const userProps: UserProps = {
      ...theuser,
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    };

    return userProps;
  }

  async findAll(): Promise<Users> {
    const users = await this.userRepository.find();

    const userProps: UserProps[] = users.map((user) => ({
      ...user,

      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    }));

    return { users: userProps };
  }

  async findOne(id: string): Promise<UserProps> {
    // return this.users.find((user) => user.id === id);
    const user = await this.userRepository.findOneBy({ id });

    const userProps: UserProps = {
      ...user,

      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    };

    return userProps;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserProps> {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex !== -1) {
    //   this.users[userIndex] = {
    //     ...this.users[userIndex],
    //     ...updateUserDto,
    //   };
    //   return this.users[userIndex];
    // }
    // throw new NotFoundException(User not found by id ${id});

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found by id ${id}`);
    }

    Object.assign(user, updateUserDto);
    const newUser = await this.userRepository.save(user);

    const userProps: UserProps = {
      ...newUser,
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    };

    return userProps;
  }

  async remove(id: string): Promise<UserProps> {
    // const userIndex = this.users.findIndex((user) => user.id === id);
    // if (userIndex !== -1) {
    //   return this.users.splice(userIndex)[0];
    // }
    // throw new NotFoundException(User not found by id ${id});

    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User not found by id ${id}`);
    }
    const removedUser = await this.userRepository.remove(user);

    const userProps: UserProps = {
      ...removedUser,
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    };

    return userProps;
  }

  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    const subject = new Subject<Users>();
    const onNext = async (paginationDto: PaginationDto) => {
      const start = paginationDto.page * paginationDto.skip;
      subject.next({
        // users: this.users.slice(start, start + paginationDto.skip),
        users: (await this.findAll()).users.slice(
          start,
          start + paginationDto.skip,
        ),
      });
    };

    const onComplete = () => subject.complete();

    paginationDtoStream.subscribe({
      next: onNext,
      complete: onComplete,
    });

    return subject.asObservable();
  }

  async findOneUserByPrimaryEmailAddress(
    primaryEmailAddress: string,
  ): Promise<UserProps> {
    const user = await this.userRepository.findOneBy({ primaryEmailAddress });

    const userProps: UserProps = {
      ...user,
      phone: {},
      isPrimaryEmailAddressVerified: false,
      isBackupEmailAddressVerified: false,
    };

    return userProps;
  }
}
