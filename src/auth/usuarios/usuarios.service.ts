import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {

  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }


  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save(usuario);
      return usuario;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async findAll() {
    try {
      const usuarios = await this.usuarioRepository.find();
      return usuarios;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });

      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      return usuario;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuarioRepository.preload({
        id: id,
        ...updateUsuarioDto
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      await this.usuarioRepository.save(usuario);

    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async remove(id: number) {
    try {
      const usuario = await this.usuarioRepository.findOneBy({ id });

      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      await this.usuarioRepository.remove(usuario);

    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  private manejoExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else if (error instanceof NotFoundException) {
      throw error;  // Rethrow the NotFoundException
    }
    throw new InternalServerErrorException("Error inesperado, check server logs");
  }

}
