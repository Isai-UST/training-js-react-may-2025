import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProjectDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    readonly description: string;

    @IsOptional()
    @Transform( ({ value }) => value ? value: "/assets/no_image.jpg" )
    readonly imageUrl: string;

    @IsOptional()
    @IsNumber()
    readonly contractTypeId: number = 1;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    readonly contractSignedOn: Date = new Date();

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    readonly budget: number;

    @IsOptional()
    readonly isActive: boolean = false;
}
