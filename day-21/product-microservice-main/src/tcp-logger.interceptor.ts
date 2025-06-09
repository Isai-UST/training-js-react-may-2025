import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TcpLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const data = ctx.getData();

    console.log('Incoming TCP request:', {
      data,
    });

    return next
      .handle()
      .pipe(
        tap((response) =>
          console.log('Outgoing TCP response:', {
            response,
          }),
        ),
      );
  }
}
