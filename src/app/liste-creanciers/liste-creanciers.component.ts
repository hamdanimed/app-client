import { Location } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap/data-soap.service';
import { AuthService } from '../service/auth.service';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-liste-creanciers',
  templateUrl: './liste-creanciers.component.html',
  styleUrls: ['./liste-creanciers.component.css']
})

export class ListeCreanciersComponent implements OnInit {
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

  constructor(private route: Router,public navigate:Location,private soapService:DataSoapService,private http:HttpClient,private authService:AuthService){}

  ngOnInit(){
    this.soapService.getCreanciers().subscribe(data=>{
      //converting result to json
      console.log("list of creancier")
      this.listCreancier=this.soapService.xml2jsonCreanciers(data)
      this.listCreancier[0].logoUrl='../../assets/téléchargement.png';
      this.listCreancier[1].logoUrl='../../assets/Cashplus.jpg';
      console.log(this.listCreancier)

    })
    
    let token = this.authService.getToken()
    this.http.get('http://localhost:8090/creanciers',{
      headers: {
        Authorization:"Bearer "+token
      }
    })
    .subscribe(
      (data)=> {
        console.log(data);
      },
      (err)=>{
        console.log("no data");
      }
    )
  }

  redirectToCreances(title :string){
    // alert(title)
    this.route.navigate([`liste-creance/${title}`])
  }

}
