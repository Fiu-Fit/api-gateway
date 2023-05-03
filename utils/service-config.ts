import { HttpModuleOptions } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

export const ServiceName = {
  Workout: 'workout',
  User:    'user',
};

export const ServiceApiKeys: Record<string, string | undefined> = {
  workout: process.env.WORKOUT_API_KEY,
  user:    process.env.USER_API_KEY,
};

export const ServiceUrl: Record<string, string | undefined> = {
  workout: process.env.WORKOUT_SERVICE_URL,
  user:    process.env.USER_SERVICE_URL,
};

@Injectable()
export class ServiceConfig {
  static createHttpModuleOptions(
    serviceName: string
  ): Promise<HttpModuleOptions> {
    return Promise.resolve({
      headers: {
        'Api-Key': ServiceApiKeys[serviceName],
      },
      baseUrl: ServiceUrl[serviceName]
    });
  }
}
