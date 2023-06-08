import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { Creance } from '../interfaces/Creance';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-liste-creances',
  templateUrl: './liste-creances.component.html',
  styleUrls: ['./liste-creances.component.css']
})
export class ListeCreancesComponent {
  listCreance:Creance[] = [];

  creancierSelectedId:string="";
  creanceSelectedId:number=0;
  constructor(private dataService:DataService,private soapService:DataSoapService,private toastr:ToastrService,public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute){}
  
  ngOnInit(){
    this.activatedRoute.queryParamMap.subscribe((params)=>{
      let creancierString=params.get('creancierId');

      //if no creancier was selected ; happens when we enter the url directly without queryParameter creancierId (didnt specify the creancier)
      if(creancierString === null ){
        this.router.navigate(["liste-creancier"])
      }else{
            this.creancierSelectedId=creancierString ;
            //get the creances of the selected creancier from the previous page
            this.soapService.getCreances(this.creancierSelectedId).subscribe(data=>{
              //converting result to json
              this.listCreance=this.soapService.xml2jsonCreances(data)
              //if we havent fetched creanciers ; happens when we enter the url with queryParameter creancierId (specified the creancier)
              if(!this.dataService.fetchedCreanciers.length){
                //we firstly get the crienciers
                this.soapService.getCreanciers().subscribe(data=>{
                  this.dataService.fetchedCreanciers=this.soapService.xml2jsonCreanciers(data)
                  //we filter/find the selected creancier from the fetched creanciers by the creancierId which we retrived from the url (queryParameter creancierId)
                  this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
                })
              }else{
                //we filter/find the selected creancier from the fetched creanciers by the creancierId which we retrived from the url (queryParameter creancierId)
                this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              }
              //if we did fetch the creanciers ; happens if access this page by clicking a creancier from the liste-creancier page
              //we filter/find the selected creancier from the fetched creanciers by the creancierId which we retrived from the url (queryParameter creancierId)
              //we need this selected creancier to show the logo on the page
              this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===this.creancierSelectedId)
              //we add the fetchedCreance to the data service
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
    //if we select a creance
    if(this.creanceSelectedId!==0){
      //we get the selected creance object by finding it in the fetchedCreances
      this.dataService.selectedCreance=this.dataService.fetchedCreances.find(creance=>creance.id===this.creanceSelectedId);
      this.router.navigate([`form`],
      // {queryParams:{creanceId:this.creanceSelectedId},}
    )
    }else{
      this.toastr.warning("Veuillez sélectionner une créance")
    }
  }
  back(){
    this.router.navigate(['liste-creancier'])
  }
}
