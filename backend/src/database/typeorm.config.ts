import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RouteEntity } from '../routes/entities/route.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: configService.get<string>('DB_HOST'),

  port: Number(configService.get<string>('DB_PORT')),

  username: configService.get<string>('DB_USER'),

  password: configService.get<string>('DB_PASSWORD'),

  database: configService.get<string>('DB_NAME'),

  entities: [RouteEntity],

  synchronize: true,

  logging: false,

  autoLoadEntities: true,
});