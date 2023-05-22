import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap/data-soap.service';

@Component({
  selector: 'app-liste-creanciers',
  templateUrl: './liste-creanciers.component.html',
  styleUrls: ['./liste-creanciers.component.css']
})

export class ListeCreanciersComponent {
  images = [  
    { url: '../../assets/Cashplus.jpg', title: 'Image 1' },
    { url: '../../assets/Cashplus.jpg', title: 'Image 1' },
    { url: '../../assets/téléchargement.png', title: 'Image 2' },  
    { url: '../../assets/téléchargement.png', title: 'Image 2' },  
    { url: '../../assets/téléchargement.png', title: 'Image 4' },  
    { url: '../../assets/téléchargement.png', title: 'Image 4' },  
    { url: '../../assets/téléchargement.png', title: 'Image 4' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/Cashplus.jpg', title: 'Image 5' },  
    { url: '../../assets/téléchargement.png', title: 'Image 6' },
    { url: '../../assets/téléchargement.png', title: 'Image 6' },
  ];
  listCreancier:any[]=[];

  constructor(private route: Router,public navigate:Location,private soapService:DataSoapService){}

  ngOnInit(){
    this.soapService.getCreanciers().subscribe(data=>{
      //converting result to json
      console.log("list of creancier")
      this.listCreancier=this.soapService.xml2jsonCreanciers(data)
      this.listCreancier[0].logoUrl='../../assets/téléchargement.png';
      this.listCreancier[1].logoUrl='../../assets/Cashplus.jpg';
      console.log(this.listCreancier)

    })
  }

  redirectToCreances(title :string){
    // alert(title)
    this.route.navigate([`liste-creance/${title}`])
  }


}
