import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Portfolio } from './pages/portfolio/portfolio';



export const routes: Routes = [
   { path: 'home', component: Home },
   { path: 'portfolio', component: Portfolio },
   { path: '**', redirectTo: 'home' }
];
