import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('cv')
  // Interceptor para validar que el cv solo se pueda subir como pdf
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  }))

  //Funcion para subir el archivo
  uploadFile(@UploadedFile() file: Express.Multer.File) {

    if(!file){
      throw new BadRequestException("El cv tiene que ser un pdf")
    }

    return {
      fileName: file.originalname
    }
  }
}
