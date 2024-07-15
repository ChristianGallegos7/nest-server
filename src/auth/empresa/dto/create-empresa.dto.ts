import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateEmpresaDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    nombre: string;

    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    direccion: string;

    @IsNotEmpty({ message: 'El RUC es obligatorio' })
    @Matches(/^[0-9]{13}$/, { message: 'El RUC debe tener 13 dígitos numéricos' })
    ruc: string;

    @IsNotEmpty({ message: 'El teléfono es obligatorio' })
    @Matches(/^[0-9]{10}$/, { message: 'El teléfono debe tener 10 dígitos numéricos' })
    telefono: string;

    @IsNotEmpty({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser una dirección de correo electrónico válida' })
    email: string;

    @IsNotEmpty({ message: 'El password es obligatoria' })
    @Length(6, 20, { message: 'El password debe tener entre 6 y 20 caracteres' })
    password: string;
}
