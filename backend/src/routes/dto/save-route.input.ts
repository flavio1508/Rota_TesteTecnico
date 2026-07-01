import { Field, Float, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

@InputType()
export class SaveRouteInput {
  @Field(() => String, {
    description: 'Endereço de origem',
  })
  @IsString({
    message: 'A origem deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A origem é obrigatória.',
  })
  @MaxLength(255)
  origin!: string;

  @Field(() => String, {
    description: 'Endereço de destino',
  })
  @IsString({
    message: 'O destino deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O destino é obrigatório.',
  })
  @MaxLength(255)
  destination!: string;

  @Field(() => Float, {
    description: 'Distância da rota em quilômetros',
  })
  @IsNumber(
    {},
    {
      message: 'A distância deve ser um número.',
    },
  )
  @Min(0)
  distance!: number;

  @Field(() => Float, {
    description: 'Tempo estimado da rota em minutos',
  })
  @IsNumber(
    {},
    {
      message: 'A duração deve ser um número.',
    },
  )
  @Min(0)
  duration!: number;

  @Field(() => String, {
    description: 'Polyline codificada retornada pela Google',
  })
  @IsString()
  @IsNotEmpty()
  encodedPolyline!: string;

  @Field(() => [String], {
    description: 'Lista de coordenadas no formato LINESTRING',
  })
  @IsArray({
    message: 'O caminho deve ser um array.',
  })
  path!: string[];
}