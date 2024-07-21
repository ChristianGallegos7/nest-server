import { PaginationDto } from 'src/common/dto/pagination.dto';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUsuarioDto } from './dto/login-user.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { password, ...userData } = createUsuarioDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const usuario = this.usuarioRepository.create({
        ...userData,
        password: hashedPassword,
      });

      await this.usuarioRepository.save(usuario);
      delete usuario.password;
      return usuario;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      const usuarios = await this.usuarioRepository.find({
        take: limit,
        skip: offset,
      });
      return usuarios;
    } catch (error) {
      this.handleExceptions(error);
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
      this.handleExceptions(error);
    }
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const { password, ...updateData } = updateUsuarioDto;
      const usuario = await this.usuarioRepository.preload({
        id: id,
        ...updateData,
      });

      if (!usuario) {
        throw new NotFoundException(`Usuario con id ${id} no encontrado`);
      }

      if (password) {
        usuario.password = await bcrypt.hash(password, 10);
      }

      await this.usuarioRepository.save(usuario);
      delete usuario.password;
      return usuario;
    } catch (error) {
      this.handleExceptions(error);
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
      this.handleExceptions(error);
    }
  }

  async login(loginUsuarioDto: LoginUsuarioDto) {
    const { email, password } = loginUsuarioDto;

    const usuario = await this.usuarioRepository.findOne({
      where: { email },
      select: ['email', 'password'],
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales no son válidas');
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales no son válidas');
    }

    delete usuario.password;
    return usuario;
  }

  private handleExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } else if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
      throw error;  // Re-lanzar las excepciones específicas
    }
    throw new InternalServerErrorException('Error inesperado, revisa los logs del servidor');
  }
}
