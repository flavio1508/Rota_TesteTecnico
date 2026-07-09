import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteEntity } from './entities/route.entity';

import { RouteRepository } from './repositories/route.repository';

import { RouteService } from './services/route.service';
import { GoogleService } from './services/google.service';

import { RouteResolver } from './resolvers/route.resolver';
import { VehicleEntity } from './entities/vehicle.entity';
import { VehicleRepository } from './repositories/vehicle.repository';
@Module({
  imports: [
TypeOrmModule.forFeature([
    RouteEntity,
    VehicleEntity,
]),
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],

  providers: [
    RouteResolver,
    RouteService,
    GoogleService,
    RouteRepository,
    VehicleRepository,
  ],

  exports: [
    RouteService,
    GoogleService,
    RouteRepository,
    VehicleRepository,
  ],
})
export class RouteModule {}