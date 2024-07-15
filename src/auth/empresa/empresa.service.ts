import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { Empresa } from './entities/empresa.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmpresaService {

  logger = new Logger('EmpresaService');

  constructor(
    @InjectRepository(Empresa)
    private readonly empresaRepository: Repository<Empresa>
  ) {}

  async create(createEmpresaDto: CreateEmpresaDto) {
    try {
      const empresa = this.empresaRepository.create(createEmpresaDto);
      await this.empresaRepository.save(empresa);
      return empresa;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async findAll() {
    try {
      const empresas = await this.empresaRepository.find();
      return empresas;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async findOne(id: string) {
    try {

      const empresa = await this.empresaRepository.findOneBy({ id });

      if (!empresa) {
        throw new NotFoundException(`Empresa con id ${id} no encontrada`);
      }

      return empresa;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async update(id: string, updateEmpresaDto: UpdateEmpresaDto) {
    try {
      const empresa = await this.empresaRepository.preload({
        id,
        ...updateEmpresaDto,
      });

      if (!empresa) {
        throw new NotFoundException(`Empresa con id ${id} no encontrada`);
      }

      await this.empresaRepository.save(empresa);
      return empresa;
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  async remove(id: string) {
    try {
      const empresa = await this.findOne(id);
      await this.empresaRepository.remove(empresa);
      return { message: 'Empresa eliminada exitosamente' };
    } catch (error) {
      this.manejoExceptions(error);
    }
  }

  private manejoExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException("Error inesperado, check server logs");
  }
}
