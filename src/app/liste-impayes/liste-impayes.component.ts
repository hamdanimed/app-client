import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { DataService } from '../services/data.service';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';
import { Impaye } from '../interfaces/Impaye';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-impayes',
  templateUrl: './liste-impayes.component.html',
  styleUrls: ['./liste-impayes.component.css']
})
export class ListeImpayesComponent {

  listImpaye:Impaye[]=[];
  impayesToPaye:Impaye[]=[];
  gotResponse:boolean=false;

  constructor(private dataService:DataService,private soapService:DataSoapService,private toastr:ToastrService,public navigate:Location,private router:Router){}

  ngOnInit(){
    if(!this.dataService.selectedCreance || !this.dataService.impayeCredentialsEntered.length){
      this.router.navigate(['liste-creancier'])
    }else{
      let selectedCreanceId=this.dataService.selectedCreance.id;
      let credentials=this.dataService.impayeCredentialsEntered;
      // let credentials:ImpayeCredential[]=[{name:"email",value:"hamza@gmail.com"},{name:"invoice-number",value:"192168"}];
  
      this.soapService.getImpayes(selectedCreanceId,credentials).subscribe(data=>{
          this.gotResponse=true;
          let impayes=this.soapService.xml2jsonImpayes(data);
          console.log(impayes)

          if(impayes.length===0){
            this.toastr.warning("Les informations saisies ne sont pas correctes")
            console.log("wrong credentials");
            this.navigate.back();
            return ;
          }
          
          this.listImpaye=impayes.filter(impaye=>{return !impaye.isPaid});
          if(this.listImpaye.length===0){
            console.log("Everything is paid");
          }
      })
    }
  }

  toggleImpaye(impayeObject:any){
    if(this.impayesToPaye.includes(impayeObject)){
      const index = this.impayesToPaye.indexOf(impayeObject);
      if (index > -1) { 
        this.impayesToPaye.splice(index, 1); 
      }
    }
    else{
      this.impayesToPaye.push(impayeObject)
    }
  }

  redirectToValidatePaiement(){
    if(this.impayesToPaye.length !== 0){
      this.dataService.ImpayeToPaye=this.impayesToPaye;
      this.router.navigate(['paiement-validation'])
    }
    else{
      this.toastr.warning("Veuillez sélectionner au moins un impayé")
    }
  }
  back(){
    this.router.navigate(['form'])
  }

}
