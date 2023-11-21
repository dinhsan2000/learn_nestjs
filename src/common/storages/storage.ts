import { diskStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerOptions = {
  limits: {
    fileSize: process.env.MAX_FILE_SIZE
      ? Number(process.env.MAX_FILE_SIZE)
      : 1024 * 1024 * 5,
  },
  fileFilter: (req: any, file: any, callback: any) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(
        new BadRequestException('Only image files are allowed!'),
        false,
      );
    }
    callback(null, true);
  },
  storage: diskStorage({
    destination: (req: any, file: any, callback: any) => {
      const uploadLocation = process.env.UPLOAD_LOCATION || './uploads';
      if (!existsSync(uploadLocation)) {
        mkdirSync(uploadLocation);
      }
      callback(null, uploadLocation);
    },
    filename: (req: any, file: any, callback: any) => {
      callback(null, `${uuidv4()}${extname(file.originalname)}`);
    },
  }),
};
