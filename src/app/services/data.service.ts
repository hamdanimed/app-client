import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    fetchedCreances:any[]=[];
    fetchedCreanciers:any[]=[];
    selectedCreancier:any;
    selectedCreance:any;
    
  }