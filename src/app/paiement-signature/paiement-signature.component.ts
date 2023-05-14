import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paiement-signature',
  templateUrl: './paiement-signature.component.html',
  styleUrls: ['./paiement-signature.component.css']
})
export class PaiementSignatureComponent {
  date:Date=new Date(1683495264*1000);
  impayeList:{reference:number,description:string,value:number}[]=[
    {reference:1000000,description:"Recharge Voix",value:100},
    {reference:1000000,description:"Recharge Voix",value:100},
    {reference:1000000,description:"Recharge Voix",value:100},
  ];

  constructor(public navigate:Location){}
}
