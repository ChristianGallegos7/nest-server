import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["ruc", "email"])
export class Empresa {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column('text')
    direccion: string;

    @Column('text')
    ruc: string;

    @Column()
    telefono: string;

    @Column('text')
    email: string;

    @Column('text')
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
