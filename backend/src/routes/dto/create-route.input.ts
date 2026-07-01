import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateRouteInput {
  @Field(() => String, {
    description: 'Endereço de origem da rota',
  })
  @IsString({
    message: 'A origem deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O endereço de origem é obrigatório.',
  })
  @MinLength(3, {
    message: 'O endereço de origem deve possuir no mínimo 3 caracteres.',
  })
  @MaxLength(255, {
    message: 'O endereço de origem deve possuir no máximo 255 caracteres.',
  })
  origin!: string;

  @Field(() => String, {
    description: 'Endereço de destino da rota',
  })
  @IsString({
    message: 'O destino deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O endereço de destino é obrigatório.',
  })
  @MinLength(3, {
    message: 'O endereço de destino deve possuir no mínimo 3 caracteres.',
  })
  @MaxLength(255, {
    message: 'O endereço de destino deve possuir no máximo 255 caracteres.',
  })
  destination!: string;
}