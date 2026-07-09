import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

import {
  ObjectType,
  Field,
  ID,
  Float,
} from '@nestjs/graphql';

import { CoordinateModel } from '../models/coordinate.model';
import { ManyToOne, JoinColumn } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
@ObjectType()
@Entity('routes')
export class RouteEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.routes, {
  eager: true,
})
@JoinColumn({
  name: 'vehicle_id',
})
vehicle!: VehicleEntity;

  @Field()
  @Column()
  origin!: string;

  @Field()
  @Column()
  destination!: string;

  @Field(() => Float)
  @Column('double precision')
  distance!: number;

  @Field(() => Float)
  @Column('double precision')
  duration!: number;

  @Field()
  @Column('text')
  encodedPolyline!: string;

  @Field(() => [CoordinateModel], {
    nullable: true,
  })
  @Column({
    type: 'jsonb',
    default: [],
  })
  coordinates!: CoordinateModel[];

  @Index({
    spatial: true,
  })
  @Column({
    type: 'geography',
    spatialFeatureType: 'LineString',
    srid: 4326,
  })
  path!: unknown;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;
}