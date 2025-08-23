import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService {

  constructor() { }

  handleError(err: any): string {
    console.error(err);
    return 'An unexpected error occurred. Please try again later.';
  }
}