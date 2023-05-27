import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap/data-soap.service';

@Component({
  selector: 'app-liste-creances',
  templateUrl: './liste-creances.component.html',
  styleUrls: ['./liste-creances.component.css']
})
export class ListeCreancesComponent {
  creances = [
    { id: 1, name: 'Créance 1' },
    { id: 2, name: 'Créance 2' },
    { id: 3, name: 'Créance 3' },
    { id: 4, name: 'Créance 4' },
    { id: 5, name: 'Créance 5' },
    { id: 6, name: 'Créance 6' }
  ];
  creancier:string="";
  creance:string="1";
  constructor(public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute,private soapService:DataSoapService){}
  
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params)=>{
      let creancierString=params.get('code-creancier');
      if(creancierString === null ){
        this.router.navigate(["/notfound"])
      }else{
        this.creancier=creancierString ;
      }
    })

    this.soapService.getCreances("1").subscribe(data=>{
      //converting result to json
      console.log("list of creance for creancier 1")
      console.log(this.soapService.xml2jsonCreances(data))
    })
  }

  redirectToForm(){
    this.router.navigate([`form/${this.creancier}/${this.creance}`])
  }
}
