import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'varchar', length: 50 })
    apellido: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar', select: false })
    password: string;

    @Column({ type: 'int' })
    edad: number;

    @Column({ type: 'varchar', length: 15 })
    telefono: string;

    @Column('text', {
        array: true,
        default: ['user']
    })
    roles: string[];
}
