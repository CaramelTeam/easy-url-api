import { IsHexColor, IsNotEmpty, IsString, Matches, MaxLength } from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    name: string;

    @IsHexColor()
    @IsNotEmpty()
    @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { message: 'Invalid color format' })
    color: string;
}
