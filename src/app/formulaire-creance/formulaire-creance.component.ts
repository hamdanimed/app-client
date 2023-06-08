import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { Creance } from '../interfaces/Creance';
import { Creancier } from '../interfaces/Creancier';
import { DataService } from '../services/data.service';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private dataService:DataService,private soapService:DataSoapService,private toastr:ToastrService,public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    //if havent selected the creance and creancier ; happens when we enter the url directly (/form)
    if(!this.dataService.selectedCreance || !this.dataService.selectedCreancier){
      this.router.navigate(["liste-creancier"])
    }else{
      this.creance=this.dataService.selectedCreance;
      this.creancier=this.dataService.selectedCreancier

      this.soapService.getForms(String(this.creance.id)).subscribe(data=>{
        this.formStructure=this.soapService.xml2jsonForms(data);
        console.log("form structure",this.formStructure);
      })

    }

  }
  

  redirectToListeImpaye(inputs:HTMLFormElement){
    

    let credentials:ImpayeCredential[]=[];
    let credentialsInputs:any[]=Array.from(inputs.getElementsByTagName("input"));
    credentialsInputs.forEach(element => {
      if(!element.value.length){return}
      credentials.push({name:element.name,value:element.value});
      // console.log(element.name,element.value)
    });
    if(credentials.length === credentialsInputs.length){
      this.dataService.impayeCredentialsEntered=credentials;
      // console.log(credentials)
      this.router.navigate([`liste-impayes`])
    }else{
      this.toastr.warning("Champs manquants")
      console.log("enter all credentials")
    }
  }

  back(){
    this.router.navigate([`liste-creance`],{queryParams:{creancierId:this.creancier.id}})
  }

}
