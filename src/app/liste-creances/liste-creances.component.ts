import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(public navigate:Location,private router:Router,private activatedRoute:ActivatedRoute){}
  
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params)=>{
      let creancierString=params.get('creancier');
      if(creancierString === null){
        this.router.navigate(["/notfound"])
      }else{
        this.creancier=creancierString ;

      }
    })
  }

  redirectToForm(){
    this.router.navigate([`${this.creancier}/creance1`])
  }
}
