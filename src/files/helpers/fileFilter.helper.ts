import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

export const fileFilter = (req: Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const validExtensions = ['pdf'];

  if (validExtensions.includes(fileExtension)) {
    return callback(null, true);
  } else {
    return callback(new BadRequestException('El cv tiene que ser un pdf'), false);
  }
};
