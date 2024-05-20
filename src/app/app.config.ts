import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideToastr } from "ngx-toastr";
import { registerLocaleData } from "@angular/common";
import localeDe from '@angular/common/locales/de';
import {TokenInterceptorService} from "./shared/token-interceptor.service";  // Deutsches Locale importieren
registerLocaleData(localeDe);

// configuration of the application with providers and routes (app.routes.ts)
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    { provide: LOCALE_ID, useValue: 'de-DE' },
    { provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, multi: true }
  ]
};
