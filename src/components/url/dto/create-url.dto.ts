import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateUrlDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    title: string;

    @IsString()
    @MaxLength(255)
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsString()
    @IsOptional()
    tag?: string;


}
