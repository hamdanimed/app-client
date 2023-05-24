import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { Creance } from '../interfaces/Creance';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-liste-creances',
  templateUrl: './liste-creances.component.html',
  styleUrls: ['./liste-creances.component.css']
})
export class ListeCreancesComponent {
  listCreance:Creance[] = [];

  creancierSelectedId:string="";
  creanceSelectedId:number=0;
  constructor(private dataService:DataService,private soapService:DataSoapService,public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute){}
  
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
    
              if(!this.dataService.fetchedCreanciers.length){
                this.soapService.getCreanciers().subscribe(data=>{
                  this.dataService.fetchedCreanciers=this.soapService.xml2jsonCreanciers(data)
                  this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
                })
              }else{
                this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              }
              
              this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              this.dataService.fetchedCreances=this.listCreance;
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
      this.dataService.selectedCreance=this.dataService.fetchedCreances.find(creance=>creance.id===this.creanceSelectedId);
      this.router.navigate([`form`],
      // {queryParams:{creanceId:this.creanceSelectedId},}
    )
    }
  }
  back(){
    this.router.navigate(['liste-creancier'])
  }
}
