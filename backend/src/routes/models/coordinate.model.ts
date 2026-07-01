import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoordinateModel {
  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;
}