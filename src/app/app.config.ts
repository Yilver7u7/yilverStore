import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    //Esto es para que los componentes que se encuentran en diferentes rutas me permitan enviar informacion entre ellos
    // Mediante el uso del Input y Output
    provideRouter(routes, withComponentInputBinding()),
    //Add HttpClient to connect with the api
    provideHttpClient(withFetch())
    ]
};
