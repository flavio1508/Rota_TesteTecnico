import {
  Resolver,
  Query,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { RouteService } from '../services/route.service';

import { RouteModel } from '../models/route.model';

import { RouteEntity } from '../entities/route.entity';

import { CreateRouteInput } from '../dto/create-route.input';
import { SaveRouteInput } from '../dto/save-route.input';
@Resolver(() => RouteModel)
export class RouteResolver {
  constructor(
    private readonly routeService: RouteService,
  ) { }

  @Mutation(() => RouteModel, {
    name: 'calculateRoute',
  })
  async calculateRoute(
    @Args('input')
    input: CreateRouteInput,
  ) {
    return this.routeService.calculateRoute(input);
  }

  @Mutation(() => RouteEntity, {
    name: 'saveRoute',
  })
  async saveRoute(
    @Args('input')
    input: SaveRouteInput,
  ) {
    return this.routeService.saveRoute(input);
  }

  @Query(() => [RouteEntity], {
    name: 'routes',
  })
  async findAll() {
    return this.routeService.findAll();
  }

  @Query(() => RouteEntity, {
    name: 'route',
  })
  async findOne(
    @Args('id')
    id: string,
  ) {
    return this.routeService.findOne(id);
  }
  @Query(() => [RouteModel])
  findRoutesByPlate(
    @Args('plate') plate: string,
  ) {
    return this.routeService.findByPlate(plate);
  }
  @Mutation(() => Boolean, {
    name: 'removeRoute',
  })
  async removeRoute(
    @Args('id')
    id: string,
  ) {
    return this.routeService.remove(id);
  }
}