import { IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  projectName: string;

  @IsString()
  sportType: string;

  @IsString()
  goal: string;
}
