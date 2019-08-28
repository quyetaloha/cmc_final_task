import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  // domain: string = "http://d217efde.ngrok.io/";
  domain: string="http://localhost:8080/";
  constructor() { }
}
