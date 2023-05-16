import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement-validation',
  templateUrl: './paiement-validation.component.html',
  styleUrls: ['./paiement-validation.component.css']
})
export class PaiementValidationComponent {
  date:Date=new Date(1683495264*1000);
  impayeList:{reference:number,description:string,value:number}[]=[
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
    {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  ];

  constructor(public navigate:Location,private router:Router){}

  validate(){
    this.router.navigate(['/home'])
  }
}
