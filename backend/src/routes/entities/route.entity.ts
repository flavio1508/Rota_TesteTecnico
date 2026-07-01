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
@ObjectType()
@Entity('routes')
export class RouteEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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