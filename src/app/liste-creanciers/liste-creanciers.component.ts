import { Location } from '@angular/common';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSoapService } from '../services/data-soap.service';
import { AuthService } from '../service/auth.service';
import { EMPTY, catchError } from 'rxjs';
import { Creancier } from '../interfaces/Creancier';
import { DataService } from '../services/data.service';

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
  listCreancier:Creancier[]=[];

  constructor(private dataService:DataService,private soapService:DataSoapService,private router: Router,public navigate:Location,private http:HttpClient,private authService:AuthService){}

  ngOnInit(){
    this.soapService.getCreanciers().subscribe(data=>{
      //converting result to json
      // console.log("list of creancier")
      this.listCreancier=this.soapService.xml2jsonCreanciers(data)
      
      this.listCreancier[0].logoUrl='../../assets/téléchargement.png';
      this.listCreancier[1].logoUrl='https://res.cloudinary.com/mohamedham2/image/upload/v1684952517/Jabak_lah-Project/LogoRedal_lonoau.png';


      this.dataService.fetchedCreanciers=this.listCreancier;
      console.log(this.dataService.fetchedCreanciers)

    })
    
    let token = this.authService.getToken()
    this.http.get('http://localhost:8090/creanciers',{
      headers: {
        Authorization:"Bearer "+token
      }
    })
    .subscribe(
      (data)=> {
        // console.log(data);
      },
      (err)=>{
        console.log("no data");
      }
    )
  }

  redirectToCreances(creancierId :number){
    // alert(title)
    console.log(this.dataService.fetchedCreanciers)
    this.dataService.selectedCreancier=this.dataService.fetchedCreanciers.find(creancier=>creancier.id===creancierId)
    this.router.navigate([`liste-creance`],{queryParams:{creancierId:creancierId}})
  }
  back(){
    this.router.navigate(['home'])
  }

}
