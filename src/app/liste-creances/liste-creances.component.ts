import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap/data-soap.service';
import { Creance } from '../interfaces/Creance';

@Component({
  selector: 'app-liste-creances',
  templateUrl: './liste-creances.component.html',
  styleUrls: ['./liste-creances.component.css']
})
export class ListeCreancesComponent {
  listCreance:Creance[] = [];

  creancierSelectedId:string="";
  creanceSelectedId:number=0;
  constructor(public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute,private soapService:DataSoapService){}
  
  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe((params)=>{
      let creancierString=params.get('creancierId');

      if(creancierString === null ){
        this.router.navigate(["liste-creancier"])
      }else{

            this.creancierSelectedId=creancierString ;
            this.soapService.getCreances(this.creancierSelectedId).subscribe(data=>{
              //converting result to json
              // console.log("list of creance for creancier 1")
              // console.log(this.soapService.xml2jsonCreances(data))
              this.listCreance=this.soapService.xml2jsonCreances(data)
    
              if(!this.soapService.fetchedCreanciers.length){
                this.soapService.getCreanciers().subscribe(data=>{
                  this.soapService.fetchedCreanciers=this.soapService.xml2jsonCreanciers(data)
                  this.soapService.selectedCreancier=this.soapService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
                })
              }else{
                this.soapService.selectedCreancier=this.soapService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              }
              
              this.soapService.selectedCreancier=this.soapService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              this.soapService.fetchedCreances=this.listCreance;
            })

        }

    })

  }

  onChange(e:any){
    // console.log(e.target.value)
    this.creanceSelectedId=e.target.value;
  }

  redirectToForm(){
    if(this.creanceSelectedId!==0){
      this.soapService.selectedCreance=this.soapService.fetchedCreances.find(creance=>creance.id===this.creanceSelectedId);
      this.router.navigate([`form`],
      // {queryParams:{creanceId:this.creanceSelectedId},}
    )
    }
  }
  back(){
    this.router.navigate(['liste-creancier'])
  }
}
