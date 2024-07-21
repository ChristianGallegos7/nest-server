import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getCvFilePath(fileName: string): string {
    const path = join(__dirname, '../../static/cvs', fileName);
    if (!existsSync(path)) {
      throw new NotFoundException(`File ${fileName} not found`);
    }
    return path;
  }

  getFileStream(filePath: string) {
    return createReadStream(filePath);
  }
}
