import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Get('cv/:cv')
  findCv(
    @Param('cv') cv: string
  ) {
    return cv;
  }




  @Post('cv')
  // Interceptor para validar que el cv solo se pueda subir como pdf
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 },
    storage: diskStorage({
      destination: './static/cvs',
      filename: fileNamer
    })
  }))

  //Funcion para subir el archivo
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException("El cv tiene que ser un pdf")
    }

    return {
      fileName: file.originalname
    }
  }
}
