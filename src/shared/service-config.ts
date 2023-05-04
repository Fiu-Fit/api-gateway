import { HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const ServiceName = {
  Workout: 'workout',
  User:    'user',
};

export const ServiceApiKeys: Record<string, string> = {
  workout: 'WORKOUT_API_KEY',
  user:    'USER_API_KEY',
};

export const ServiceUrl: Record<string, string> = {
  workout: 'WORKOUT_SERVICE_URL',
  user:    'USER_SERVICE_URL',
};

@Injectable()
export class ServiceConfig {
  static createHttpModuleOptions(
    serviceName: string,
    configService: ConfigService
  ): Promise<HttpModuleOptions> {
    const apiKey = configService.get<string>(ServiceApiKeys[serviceName]);
    const baseURL = configService.get<string>(ServiceUrl[serviceName]);

    return Promise.resolve({
      headers: {
        'Api-Key': apiKey,
      },
      baseURL,
    });
  }
}