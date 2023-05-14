import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-paiement-validation',
  templateUrl: './paiement-validation.component.html',
  styleUrls: ['./paiement-validation.component.css']
})
export class PaiementValidationComponent {
  impayeList:{name:string,value:number}[]=[
    {name:"Recharge Voix",value:100},
    {name:"Recharge Voix",value:100},
    {name:"Recharge Voix",value:100},
    {name:"Recharge Voix",value:100},
  ];
  
  constructor(public navigate:Location){}
}
