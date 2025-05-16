import { AngularFireModule } from '@angular/fire/compat';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { GoogleAuthService } from './shared/services/auth/google-auth.service';
import { environment } from '../environments/environment';
import { ProjectService } from './shared/services/project.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { PrimeNgModule } from './primeng/primeng.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
    ),
    importProvidersFrom(MessageService),
    importProvidersFrom(PrimeNgModule),
    provideHttpClient(withFetch()),
    importProvidersFrom(AngularFireModule.initializeApp(environment.firebase)),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(GoogleAuthService, ProjectService),
    provideAnimationsAsync(),
    provideAnimations()
  ],
};
