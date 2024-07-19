import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength, IsInt, Min, Max, IsPhoneNumber, Matches } from 'class-validator';

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

   
    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^[0-9]{10}$/, { message: 'El teléfono debe tener 10 dígitos numéricos' })
    telefono: string;
}
