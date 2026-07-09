import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { RouteEntity } from '../routes/entities/route.entity';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  console.log('==============================');
  console.log('DB_HOST =', configService.get('DB_HOST'));
  console.log('DB_PORT =', configService.get('DB_PORT'));
  console.log('DB_USER =', configService.get('DB_USER'));
  console.log('DB_PASSWORD =', configService.get('DB_PASSWORD'));
  console.log('DB_NAME =', configService.get('DB_NAME'));
  console.log('==============================');

  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: Number(configService.get<string>('DB_PORT')),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    entities: [RouteEntity],
    synchronize: true,
    logging: true,
    autoLoadEntities: true,
  };
};