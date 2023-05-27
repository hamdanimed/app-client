import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSoapService {

  constructor(private http:HttpClient) { }
  private url='http://localhost:8090/ws/creanciers.wsdl';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'
  };

    
  // let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "text/xml");

  // let raw = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetAllCreanciersRequest xmlns="http://www.jl_entities.com/creancierservice"></GetAllCreanciersRequest></soap:Body></soap:Envelope>';

  // let requestOptions : RequestInit = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw,
  //   redirect: 'follow'
  // };

  // fetch("http://localhost:8090/ws/creanciers.wsdl", requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));

  // this.http.post("http://localhost:8090/ws/creanciers.wsdl",raw,
  // {
  //   headers: new HttpHeaders({'Content-Type':"text/xml"}),
  //   responseType:'text'
  // }).subscribe(data=>{
  //   console.log(data)
  //   let parser = new DOMParser();
  //   let xmlDoc = parser.parseFromString(data, "text/xml");
  //   console.log(xmlDoc.getElementsByTagName("ns2:creanciers")[0].childNodes)
  //   // console.log(xmlDoc.getElementsByTagName("cre")[0].childNodes[0].nodeValue)
  // })


  getCreanciers(){
    let raw = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetAllCreanciersRequest xmlns="http://www.jl_entities.com/creancierservice"></GetAllCreanciersRequest></soap:Body></soap:Envelope>';
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }

  getCreances(id:string){
    let raw = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetCreancesByCreancierIDRequest xmlns="http://www.jl_entities.com/creancierservice"><id>'+id+'</id></GetCreancesByCreancierIDRequest></soap:Body></soap:Envelope>';
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }

  xml2jsonCreances(data:string){
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    let listCreanceXML: Element[]=Array.from(xmlDoc.getElementsByTagName("ns2:creances"));
    let listCreanceJson:any[]=[];
    
    listCreanceXML.forEach(creancier => {
      let creanceJson:{id:string,code:string,name:string}={id:"",code:"",name:""};

      // console.log(creancier.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue)
      creanceJson.id=creancier.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue as string;
      creanceJson.code=creancier.getElementsByTagName("ns2:code")[0].childNodes[0].nodeValue as string;
      creanceJson.name=creancier.getElementsByTagName("ns2:name")[0].childNodes[0].nodeValue as string;

      listCreanceJson.push(creanceJson);

    });
    return listCreanceJson
  }

  xml2jsonCreanciers(data:string){
      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(data, "text/xml");
      let listCreancierXML: Element[]=Array.from(xmlDoc.getElementsByTagName("ns2:creanciers"));
      let listCreancierJson:any[]=[];
      
      listCreancierXML.forEach(creancier => {
        let creancierJson:{id:string,code:string,name:string,logoUrl:string}={id:"",code:"",name:"",logoUrl:""};

        // console.log(creancier.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue)
        creancierJson.id=creancier.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue as string;
        creancierJson.code=creancier.getElementsByTagName("ns2:code")[0].childNodes[0].nodeValue as string;
        creancierJson.name=creancier.getElementsByTagName("ns2:name")[0].childNodes[0].nodeValue as string;
        creancierJson.logoUrl=creancier.getElementsByTagName("ns2:logoUrl")[0].childNodes[0].nodeValue as string;

        listCreancierJson.push(creancierJson);

      });
      return listCreancierJson
  }


}