import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { Counter } from './app/counter/counter';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
