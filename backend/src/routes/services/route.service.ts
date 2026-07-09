import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RouteEntity } from '../entities/route.entity';
import { VehicleEntity } from '../entities/vehicle.entity';

import { GoogleService } from './google.service';

import { CreateRouteInput } from '../dto/create-route.input';
import { SaveRouteInput } from '../dto/save-route.input';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>,

    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,

    private readonly googleService: GoogleService,
  ) {}

  async calculateRoute(input: CreateRouteInput) {
    return this.googleService.calculateRoute(
      input.origin,
      input.destination,
    );
  }

  async saveRoute(input: SaveRouteInput) {
    const route = await this.googleService.calculateRoute(
      input.origin,
      input.destination,
    );

    let vehicle = await this.vehicleRepository.findOne({
      where: {
        plate: input.plate,
      },
    });

    if (!vehicle) {
      vehicle = this.vehicleRepository.create({
        plate: input.plate,
        brand: input.brand,
        model: input.model,
      });

      vehicle = await this.vehicleRepository.save(vehicle);
    }

    const entity = this.repository.create({
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration,
      encodedPolyline: route.encodedPolyline,
      coordinates: route.coordinates,
      path: this.buildLineString(route.coordinates),
      vehicle,
    });

    return await this.repository.save(entity);
  }

  async findAll(): Promise<RouteEntity[]> {
    return this.repository.find({
      relations: {
        vehicle: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<RouteEntity> {
    const route = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        vehicle: true,
      },
    });

    if (!route) {
      throw new NotFoundException(
        `Rota ${id} não encontrada`,
      );
    }

    return route;
  }

  async findByPlate(
    plate: string,
  ): Promise<RouteEntity[]> {
    return this.repository
      .createQueryBuilder('route')
      .leftJoinAndSelect(
        'route.vehicle',
        'vehicle',
      )
      .where(
        'LOWER(vehicle.plate) LIKE LOWER(:plate)',
        {
          plate: `%${plate}%`,
        },
      )
      .orderBy(
        'route.createdAt',
        'DESC',
      )
      .getMany();
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