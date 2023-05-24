import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap/data-soap.service';
import { Creance } from '../interfaces/Creance';
import { Creancier } from '../interfaces/Creancier';

@Component({
  selector: 'app-formulaire-creance',
  templateUrl: './formulaire-creance.component.html',
  styleUrls: ['./formulaire-creance.component.css']
})
export class FormulaireCreanceComponent {

  creanceSelectedId:number=0;
  creance:Creance={id:0,code:"",name:""};
  creancier:Creancier={id:0,code:"",name:"",logoUrl:""};

  formStructure:any={};
  constructor(public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute,private soapService:DataSoapService){}

  ngOnInit(){
    console.log(this.soapService.selectedCreancier)

    if(!this.soapService.selectedCreance || !this.soapService.selectedCreancier){
      this.router.navigate(["liste-creancier"])
    }else{
      this.creance=this.soapService.selectedCreance;
      this.creancier=this.soapService.selectedCreancier

      this.soapService.getForms(String(this.creance.id)).subscribe(data=>{
        console.log("form structure")
        this.formStructure=this.soapService.xml2jsonForms(data);
        console.log(this.formStructure);
      })

    }

  }

  back(){
    this.router.navigate([`liste-creance`],{queryParams:{creancierId:this.creancier.id}})
  }

}
