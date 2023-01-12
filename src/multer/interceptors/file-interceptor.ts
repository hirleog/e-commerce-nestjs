import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import * as busboy from 'await-busboy';
  import * as fs from 'fs';
  import { tmpdir } from 'os';
  import { extname, join } from 'path';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class FileInterceptorr implements NestInterceptor {
    editFileName = file => {
      const name = file.filename.split('.')[0];
      const fileExtName = extname(file.filename);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
  
      return `${name}-${randomName}${fileExtName}`;
    };
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request: any = context.switchToHttp().getRequest();
  
      if (!request.is('multipart/*')) return next.handle();
  
      const parts = busboy(request, { autoFields: true });
  
      try {
        let part;
        while ((part = await parts)) {
          const name = join(tmpdir(), this.editFileName(part));
          request.file = {
           // path where image is stored temporarily on api
            path: './files',
          };
          // otherwise, it's a stream
          part.pipe(fs.createWriteStream(name));
        }
      } catch (err) {
        return request.throw(err);
      }
  
      request.body = parts.field;
  
      return next.handle();
    }
  }