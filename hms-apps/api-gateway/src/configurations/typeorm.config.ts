import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  port: 3306,
  host: 'localhost',
  username: 'root',
  password: 'root',
  synchronize: true,
  autoLoadEntities: true,
  logging: false, // Disable logging SQL queries
  ssl: {
    rejectUnauthorized: false, // Reject unauthorized SSL connections
  },
};
