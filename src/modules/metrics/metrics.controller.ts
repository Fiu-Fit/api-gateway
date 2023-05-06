import { HttpService } from '@nestjs/axios';
import { Controller } from '@nestjs/common';
import { ServerController } from '../../shared/server-controller';

@Controller('metrics')
export class MetricsController extends ServerController {
  constructor(httpService: HttpService) {
    super(httpService, 'metrics');
  }
}
