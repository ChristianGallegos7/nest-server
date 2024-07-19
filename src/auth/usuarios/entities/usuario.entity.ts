import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    email:string;

    @Column()
    password:string;

    @Column()
    edad:number;

    @Column()
    telefono:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
