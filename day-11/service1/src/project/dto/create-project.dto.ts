import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    @IsNotEmpty()
    @Transform(({ value }) => value ? value.trim() : value)
    @ApiProperty({ example: 'Johnson - Kutch', description: 'The name of the project' })
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(200)
    @IsNotEmpty()
    @Transform(({ value }) => value ? value.trim() : value)
    @ApiProperty({ example: 'Fully-configurable intermediate framework.', description: 'The description of the project' })
    readonly description: string;

    @IsOptional()
    @IsNotEmpty()
    @Transform( ({ value }) => value ? value.trim() : "/assets/no_image.jpg" )
    @ApiPropertyOptional({ example: '/assets/placeimg_500_300_arch4.jpg', description: 'The path image of the project' })
    readonly imageUrl: string;

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ example: 1, description: 'The contract type of the project' })
    readonly contractTypeId: number = 1;

    @IsOptional()
    @Transform( ({ value }) => new Date(value))
    @IsDate()
    @ApiPropertyOptional({ example: '2013-08-04T22:39:41.473Z', description: 'The contract signed date of the project' })
    readonly contractSignedOn: Date = new Date();

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty({ example: 54637, description: 'The budget of the project' })
    readonly budget: number;

    @IsOptional()
    @IsBoolean()
    @ApiPropertyOptional({ example: true, description: 'The status of the project' })
    readonly isActive: boolean = false;
}
