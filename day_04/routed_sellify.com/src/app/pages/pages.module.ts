import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { HeroComponent } from './home/hero/hero.component';
import { BestSellerComponent } from './home/best-seller/best-seller.component';
import { TopSellerComponent } from './home/top-seller/top-seller.component';
import { WhyUsComponent } from './home/why-us/why-us.component';
import { HowWeWorkComponent } from './home/how-we-work/how-we-work.component';
import { FeedbackComponent } from './home/feedback/feedback.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    BlogComponent,
    HeroComponent,
    BestSellerComponent,
    TopSellerComponent,
    WhyUsComponent,
    HowWeWorkComponent,
    FeedbackComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
