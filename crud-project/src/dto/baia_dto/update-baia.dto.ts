import { PartialType } from '@nestjs/mapped-types';
import { CreateBaiaDto } from './create-baia.dto';

export class UpdateBaiaDto extends PartialType(CreateBaiaDto) {}
