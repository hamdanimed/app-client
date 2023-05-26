import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { DataService } from '../services/data.service';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';

@Component({
  selector: 'app-liste-impayes',
  templateUrl: './liste-impayes.component.html',
  styleUrls: ['./liste-impayes.component.css']
})
export class ListeImpayesComponent {

  ImpayesList : any[] = [
    {
      id:1,
      date:"10/10/2023",
      name:"Impaye 1",
      price:"100DH"
    },
    {
      id:2,
      date:"10/10/2023",
      name:"Impaye 2",
      price:"80DH"
    },
    {
      id:3,
      date:"10/10/2023",
      name:"Impaye 3",
      price:"120DH"
    },
    {
      id:4,
      date:"10/10/2023",
      name:"Impaye 4",
      price:"20DH"
    },
    {
      id:5,
      date:"10/10/2023",
      name:"Impaye 2",
      price:"80DH"
    },
  ]

  listImpaye:any[]=[];
  impayesToPaye:any[]=[];

  constructor(private dataService:DataService,private soapService:DataSoapService,public navigate:Location,private router:Router){}

  ngOnInit(){
    if(!this.dataService.selectedCreance || !this.dataService.impayeCredentialsEntered.length){
      this.router.navigate(['liste-creancier'])
    }else{
      let selectedCreanceId=this.dataService.selectedCreance.id;
      let credentials=this.dataService.impayeCredentialsEntered;
      // let credentials:ImpayeCredential[]=[{name:"email",value:"hamza@gmail.com"},{name:"invoice-number",value:"192168"}];
  
      this.soapService.getImpayes(selectedCreanceId,credentials).subscribe(data=>{
          let impayes=this.soapService.xml2jsonImpayes(data);
          this.listImpaye=impayes.filter(impaye=>{return !impaye.isPaid});
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
  }
  back(){
    this.router.navigate(['form'])
  }

}
