import { Module } from '@nestjs/common';
import { EmpresaModule } from './auth/empresa/empresa.module';
import { UsuariosModule } from './auth/usuarios/usuarios.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm'
import { RolModule } from './rol/rol.module';
import { CommonModule } from './common/common.module';



@Module({
  imports: [EmpresaModule, UsuariosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),
    RolModule,
    CommonModule
  ],
})
export class AppModule { }
