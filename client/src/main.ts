import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { InitService } from './app/services/init.service';

bootstrapApplication(AppComponent, appConfig).then(async appRef => {
  const injector = appRef.injector;
  const authStartup = injector.get(InitService);
  await authStartup.init(); // 👈 async init del servicio
}).catch((err) => console.error(err));
