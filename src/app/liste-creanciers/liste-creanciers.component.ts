import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private route: Router){}

  redirectToCreances(title :string){
    // alert(title)
    this.route.navigate([`${title}/liste-creances`])
  }


}
