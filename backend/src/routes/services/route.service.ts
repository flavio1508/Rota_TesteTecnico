import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RouteEntity } from '../entities/route.entity';

import { GoogleService } from './google.service';

import { CreateRouteInput } from '../dto/create-route.input';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>,

    private readonly googleService: GoogleService,
  ) {}

  async calculateRoute(input: CreateRouteInput) {
    return this.googleService.calculateRoute(
      input.origin,
      input.destination,
    );
  }

  async saveRoute(input: CreateRouteInput) {
    const route =
      await this.googleService.calculateRoute(
        input.origin,
        input.destination,
      );

    const entity = this.repository.create({
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration,
      encodedPolyline: route.encodedPolyline,
      coordinates: route.coordinates,
      path: this.buildLineString(route.coordinates),
    });

    return await this.repository.save(entity);
  }

  async findAll(): Promise<RouteEntity[]> {
    return this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<RouteEntity> {
    const route = await this.repository.findOne({
      where: { id },
    });

    if (!route) {
      throw new NotFoundException(
        `Rota ${id} não encontrada`,
      );
    }

    return route;
  }

  async remove(id: string): Promise<boolean> {
    const route = await this.findOne(id);

    await this.repository.remove(route);

    return true;
  }

  private buildLineString(
    coordinates: {
      latitude: number;
      longitude: number;
    }[],
  ): string {
    if (!coordinates?.length) {
      throw new Error(
        'Coordenadas inválidas para gerar LINESTRING',
      );
    }

    return `LINESTRING(${coordinates
      .map(
        (c) =>
          `${c.longitude} ${c.latitude}`,
      )
      .join(', ')})`;
  }
}