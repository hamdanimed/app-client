import { Injectable } from '@angular/core';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
  })
  export class DataService {

    client:any;

    fetchedCreances:any[]=[];
    fetchedCreanciers:any[]=[];
    selectedCreancier:any;
    selectedCreance:any;

    impayeCredentialsEntered:ImpayeCredential[]=[];
    listImpaye:any[]=[];
    ImpayeToPaye:any[]=[];
    retardImpaye:any=null;

    constructor(private http:HttpClient) { }

    getClient(tel:string){
      return this.http.post("https://jabak-lah-backend.onrender.com/api/client",tel)
    }

    sendSMS(clientId:number,phone:string){
      phone = '212'+phone.substring(1)
      return this.http.post("https://jabak-lah-backend.onrender.com/api/sendfakesms",{clientId:clientId,destinationSMSNumber:phone})
    }
  }