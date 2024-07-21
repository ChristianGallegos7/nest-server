import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('cv/:cv')
  async findCv(@Param('cv') cv: string, @Res() res: Response) {
    const filePath = this.filesService.getCvFilePath(cv);
    const fileStream = this.filesService.getFileStream(filePath);

    res.setHeader('Content-Disposition', `attachment; filename="${cv}"`);
    fileStream.pipe(res);
  }

  @Post('cv')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    storage: diskStorage({
      destination: './static/cvs',
      filename: fileNamer
    })
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("El cv tiene que ser un pdf");
    }
    return {
      fileName: file.originalname
    };
  }
}
