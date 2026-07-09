import {
  Field,
  Float,
  GraphQLISODateTime,
  ID,
  ObjectType,
} from '@nestjs/graphql';
@ObjectType()
export class CoordinateModel {
  @Field(() => Float)
  latitude!: number;

  @Field(() => Float)
  longitude!: number;
}

@ObjectType()
export class RouteModel {
  @Field(() => ID)
  id!: string;

  @Field()
  origin!: string;

  @Field()
plate!: string;

@Field()
brand!: string;

@Field()
model!: string;

  @Field()
  destination!: string;

  @Field(() => Float, {
    description: 'Distância total da rota em quilômetros',
  })
  distance!: number;

  @Field(() => Float, {
    description: 'Tempo estimado da rota em minutos',
  })
  duration!: number;

  @Field({
    description: 'Polyline codificada retornada pela Google Directions API',
  })
  encodedPolyline!: string;

  @Field(() => [CoordinateModel], {
    description: 'Lista de coordenadas da rota',
  })
  coordinates!: CoordinateModel[];

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;
}