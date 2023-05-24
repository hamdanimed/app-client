import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  impayesToPaye:any[]=[];

  constructor(public navigate:Location,private router:Router){}

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

  printImpayesToPaye(){
    console.log(this.impayesToPaye);
  }
  back(){
    this.router.navigate(['form'])
  }

}
