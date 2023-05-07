import { HttpService } from '@nestjs/axios';
import { Controller, UseGuards } from '@nestjs/common';
import { ServerController } from '../../shared/server-controller';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('metrics')
export class MetricsController extends ServerController {
  constructor(httpService: HttpService) {
    super(httpService, 'metrics');
  }
}
