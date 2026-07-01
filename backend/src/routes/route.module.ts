import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RouteEntity } from './entities/route.entity';

import { RouteRepository } from './repositories/route.repository';

import { RouteService } from './services/route.service';
import { GoogleService } from './services/google.service';

import { RouteResolver } from './resolvers/route.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteEntity]),

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
  ],

  exports: [
    RouteService,
    GoogleService,
    RouteRepository,
  ],
})
export class RouteModule {}