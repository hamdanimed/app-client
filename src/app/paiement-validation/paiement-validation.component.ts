import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';
import { Impaye } from '../interfaces/Impaye';
import { DataSoapService } from '../services/data-soap.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paiement-validation',
  templateUrl: './paiement-validation.component.html',
  styleUrls: ['./paiement-validation.component.css']
})
export class PaiementValidationComponent {
  // date:Date=new Date(1683495264*1000);
  date:Date=new Date();
  // impayeList:{reference:number,description:string,value:number}[]=[
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  //   {reference:1000000,description:"Recharge Voix-21/04/2023",value:100},
  // ];

  impayeList:Impaye[]=[];
  verificationModalMsg:string="Paiment Validated ✅ \n Validation Failed ❌\n";
  code:string="";
  totalPrice:number=0;
  constructor(public dataService:DataService,private soapService:DataSoapService,private toastr:ToastrService,private modalService:NgbModal,public navigate:Location,private router:Router){}
  ngOnInit(){
    if(!this.dataService.ImpayeToPaye.length){
      this.router.navigate(['liste-creancier'])
    }else{
      this.impayeList=this.dataService.ImpayeToPaye;
      this.impayeList.forEach(impaye=>{
        this.totalPrice+=impaye.price;
      })
    }
  }

  openModal(modal:any){
    let clientId = this.dataService.client.id
    let phone = this.dataService.client.tel
    console.log(phone);
    this.dataService.sendSMS(clientId,phone).subscribe((data:any)=> {
      console.log(data);
      if(data.message==="L'SMS est envoyé"){
        this.toastr.success("SMS est envoyé")
      }
      else{
        this.toastr.warning("L'SMS est peut être non envoyé")
      }
    },
    (err)=>{
      console.log("error");
      console.log(err);
    })

    this.modalService.open(modal,{size:'lg'})
    // this.router.navigate(['/home'])
  }


  checkCode(codeInput:any,resultModal:any){
    if(codeInput.value.length){
      let clientId = this.dataService.client.id
      let impayes = this.dataService.ImpayeToPaye.map((impaye)=> impaye.id)
      
      this.soapService.confirmerPayement(impayes,clientId,codeInput.value).subscribe((data)=>{
        let response = this.soapService.xml2jsonMessage(data)
        console.log(response);
        if(response.message==='Paiement effectué'){
          this.toastr.success("Paiement est effectué")
          console.log(codeInput.value)
          this.code=codeInput.value;
          this.verificationModalMsg=this.verificationModalMsg+this.code;
          this.modalService.dismissAll("verification");
          this.modalService.open(resultModal);
          console.log("solde",this.dataService.client.compteBancaire.solde,this.dataService.client.compteBancaire.solde-this.totalPrice)
          this.dataService.client.compteBancaire.solde=this.dataService.client.compteBancaire.solde-this.totalPrice;
        }
        else{
          let message = response.message||'Erreur inconnue'
          this.toastr.warning(message)
        }
      })
    }
  }
}