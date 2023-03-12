import { PartialType } from '@nestjs/mapped-types';
import { CreateSetoreDto } from './create-setore.dto';

export class UpdateSetoreDto extends PartialType(CreateSetoreDto) {}
