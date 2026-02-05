import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors, Get, Param} from '@nestjs/common';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from '../helpers';
import { diskStorage } from 'multer';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService

  ) {}


  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string
  ) {

    const path = this.filesService.getStaticProductImage( imageName );

    res.sendFile( path );
  }

  @Post('product')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer,
    })
  }))
  uploadProductImage( @UploadedFile() file: Express.Multer.File,) {

    if (! file) {
      throw new BadRequestException('make sure you are sending a file image');
    }

    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`;


    return {
      secureUrl,
    };
  }

}
