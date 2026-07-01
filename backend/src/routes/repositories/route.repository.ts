import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RouteEntity } from '../entities/route.entity';

@Injectable()
export class RouteRepository {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly repository: Repository<RouteEntity>,
  ) {}

  async create(route: Partial<RouteEntity>): Promise<RouteEntity> {
    const entity = this.repository.create(route);

    return await this.repository.save(entity);
  }

  async save(route: RouteEntity): Promise<RouteEntity> {
    return await this.repository.save(route);
  }

  async findAll(): Promise<RouteEntity[]> {
    return await this.repository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<RouteEntity | null> {
    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const total = await this.repository.count({
      where: {
        id,
      },
    });

    return total > 0;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}