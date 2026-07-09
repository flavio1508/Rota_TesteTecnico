import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehicleEntity } from '../entities/vehicle.entity';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly repository: Repository<VehicleEntity>,
  ) {}

  async findByPlate(plate: string) {
    return this.repository.findOne({
      where: {
        plate,
      },
    });
  }

  async save(vehicle: VehicleEntity) {
    return this.repository.save(vehicle);
  }
}