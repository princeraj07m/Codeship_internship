import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideLottieOptions({
      player: () => player,
    }),
  ],
};