import { Injectable } from '@angular/core';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    fetchedCreances:any[]=[];
    fetchedCreanciers:any[]=[];
    selectedCreancier:any;
    selectedCreance:any;

    impayeCredentialsEntered:ImpayeCredential[]=[];
    listImpaye:any[]=[];
    ImpayeToPaye:any[]=[];
  }