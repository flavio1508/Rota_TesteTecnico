import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { RouteEntity } from './route.entity';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 20,
  })
  plate!: string;

  @Column({
    length: 100,
  })
  brand!: string;

  @Column({
    length: 100,
  })
  model!: string;

  @OneToMany(() => RouteEntity, (route) => route.vehicle)
  routes!: RouteEntity[];
}