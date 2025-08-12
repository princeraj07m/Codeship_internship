// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LottieComponent, provideLottieOptions } from 'ngx-lottie';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    LottieComponent  // Import the standalone Lottie component
  ],
  providers: [
    provideLottieOptions({
      player: () => import('lottie-web')  // Dynamically import lottie-web player
    })
  ],})
export class AppModule { }
