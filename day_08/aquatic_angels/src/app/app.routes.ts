import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { AquascapingComponent } from './pages/aquascaping/aquascaping.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ScapeItComponent } from './pages/scape-it/scape-it.component';
import { ContactComponent } from './pages/contact/contact.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'aquascaping', component: AquascapingComponent },
  { path : 'scap-it' , component : ScapeItComponent},
  { path : 'shop' , component : ShopComponent},
  { path : 'contact' , component : ContactComponent}

];
