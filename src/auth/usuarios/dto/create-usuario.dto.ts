import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsInt, Min, Max, IsPhoneNumber } from 'class-validator';

export class CreateUsuarioDto {
    
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    apellido: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsInt()
    @Min(0)
    @Max(120)
    edad: number;

    @IsPhoneNumber(null)
    telefono: string;
}
