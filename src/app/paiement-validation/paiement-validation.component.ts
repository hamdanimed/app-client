import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  verificationModalMsg:string="Paiment Validated ✅ \n Validation Failed ❌\n";
  code:string="";
  constructor(private modalService:NgbModal,public navigate:Location,private router:Router){}

  openModal(modal:any){
    this.modalService.open(modal,{size:'lg'})
    // this.router.navigate(['/home'])
  }

  checkCode(codeInput:any,resultModal:any){
    if(codeInput.value.length){
      console.log(codeInput.value)
      this.code=codeInput.value;
      this.verificationModalMsg=this.verificationModalMsg+this.code;
      this.modalService.dismissAll("verification");
      this.modalService.open(resultModal);
    }
  }
}