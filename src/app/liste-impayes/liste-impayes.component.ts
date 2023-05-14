import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-impayes',
  templateUrl: './liste-impayes.component.html',
  styleUrls: ['./liste-impayes.component.css']
})
export class ListeImpayesComponent {

  ImpayesList : any[] = [
    {
      date:"10/10/2023",
      name:"Impaye 1",
      price:"100DH"
    },
    {
      date:"10/10/2023",
      name:"Impaye 2",
      price:"80DH"
    },
    {
      date:"10/10/2023",
      name:"Impaye 3",
      price:"120DH"
    },
    {
      date:"10/10/2023",
      name:"Impaye 4",
      price:"20DH"
    },
    {
      date:"10/10/2023",
      name:"Impaye 2",
      price:"80DH"
    },
  ]

  constructor(public navigate:Location){}
}
