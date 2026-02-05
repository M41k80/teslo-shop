import { join } from 'path';
import { BadRequestException, Injectable, InternalServerErrorException,  } from '@nestjs/common';
import { createReadStream, existsSync, ReadStream } from 'fs';



@Injectable()
export class FilesService {


 getStaticProductImage( imageName: string ) {

        const path = join( __dirname, '../../static/products', imageName );

        if ( !existsSync(path) ) 
            throw new BadRequestException(`No product found with image ${ imageName }`);

        return path;
    }
 
}
