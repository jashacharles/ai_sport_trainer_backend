import { IsString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  projectId: string;

  @IsString()
  description: string;
}
