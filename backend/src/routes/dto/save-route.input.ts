import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
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

  @Field(() => String, {
    description: 'Placa do veículo',
  })
  @IsString({
    message: 'A placa deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A placa é obrigatória.',
  })
  @MaxLength(20)
  plate!: string;

  @Field(() => String, {
    description: 'Marca do veículo',
  })
  @IsString({
    message: 'A marca deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A marca é obrigatória.',
  })
  @MaxLength(100)
  brand!: string;

  @Field(() => String, {
    description: 'Modelo do veículo',
  })
  @IsString({
    message: 'O modelo deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O modelo é obrigatório.',
  })
  @MaxLength(100)
  model!: string;
}