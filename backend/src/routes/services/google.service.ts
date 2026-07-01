import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { HttpService } from '@nestjs/axios';

import { ConfigService } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';

import { decode } from '@googlemaps/polyline-codec';

@Injectable()
export class GoogleService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async calculateRoute(
    origin: string,
    destination: string,
  ) {
    const apiKey =
      this.configService.get<string>('GOOGLE_API_KEY');

    if (!apiKey) {
      throw new BadRequestException(
        'GOOGLE_API_KEY não configurada.',
      );
    }

    const url =
      'https://routes.googleapis.com/directions/v2:computeRoutes';

    const body = {
      origin: {
        address: origin,
      },

      destination: {
        address: destination,
      },

      travelMode: 'DRIVE',

      routingPreference: 'TRAFFIC_UNAWARE',

      polylineQuality: 'HIGH_QUALITY',

      computeAlternativeRoutes: false,
    };

    const headers = {
      'Content-Type': 'application/json',

      'X-Goog-Api-Key': apiKey,

      'X-Goog-FieldMask':
        'routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline',
    };

    const response = await firstValueFrom(
      this.httpService.post(
        url,
        body,
        {
          headers,
        },
      ),
    );

    const route =
      response.data.routes?.[0];

    if (!route) {
      throw new BadRequestException(
        'Nenhuma rota encontrada.'
      );
    }

    const coordinates = decode(
      route.polyline.encodedPolyline,
    ).map(([latitude, longitude]) => ({
      latitude,
      longitude,
    }));

    return {
      origin,

      destination,

      distance:
        route.distanceMeters / 1000,

      duration:
        Number(
          route.duration.replace(
            's',
            '',
          ),
        ) / 60,

      encodedPolyline:
        route.polyline.encodedPolyline,

      coordinates,
    };
  }
}