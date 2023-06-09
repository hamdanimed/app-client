import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImpayeCredential } from '../interfaces/ImpayeCredential';
import { Impaye } from '../interfaces/Impaye';

@Injectable({
  providedIn: 'root'
})
export class DataSoapService {

  constructor(private http:HttpClient) { }
  private url='http:localhost:8090/ws/creanciers.wsdl';

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

  getCreances(creancierId:string){
    let raw = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetCreancesByCreancierIDRequest xmlns="http://www.jl_entities.com/creancierservice"><id>'+creancierId+'</id></GetCreancesByCreancierIDRequest></soap:Body></soap:Envelope>';
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }
  
  getForms(creanceId:string){
    let raw = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetFormsByCreanceIDRequest xmlns="http://www.jl_entities.com/creancierservice"><id>'+creanceId+'</id></GetFormsByCreanceIDRequest></soap:Body></soap:Envelope>';
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }

  getImpayes(creanceId:string,credentials:ImpayeCredential[]){
    let raw='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><GetImpayesByCreanceIDRequest xmlns="http://www.jl_entities.com/creancierservice"><creanceId>'+creanceId+'</creanceId><credentials>';
    credentials.forEach(credential=>{
      raw+='<credential>';
      raw+='<credentialName>'+credential.name+'</credentialName>';
      raw+='<credentialValue>'+credential.value+'</credentialValue>';
      raw+='</credential>';
    })
    raw+='</credentials></GetImpayesByCreanceIDRequest></soap:Body></soap:Envelope>';
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }

  confirmerPayement(impayes:number[],clientId:number,code:string){
    let raw = `<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ConfirmerPayementRequest xmlns="http://www.jl_entities.com/creancierservice">`
    impayes.forEach(id=> raw+=`<impayes>${id}</impayes>`)
    raw+=`<clientId>${clientId}</clientId>`
    raw+=`<code>${code}</code>`
    raw+=`</ConfirmerPayementRequest></soap:Body></soap:Envelope>`
    return this.http.post(this.url,raw,{headers: new HttpHeaders({'Content-Type':'text/xml'}),responseType:'text'})
  }


  xml2jsonMessage(data:string){
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    let message = xmlDoc.getElementsByTagName("ns2:value")[0] .childNodes[0].nodeValue
    return {message:message}
  }

  xml2jsonImpayes(data:string){
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    let listImpayeXML: Element[]=Array.from(xmlDoc.getElementsByTagName("ns2:impayes"));
    let listImpayeJson:any[]=[];

    listImpayeXML.forEach(impaye=>{
      // let impayeJson:{id:string,name:string,price:number,isPaid:boolean,date:string}={id:"",name:"",price:0,isPaid:false,date:"10/10/2023"};
      let impayeJson:Impaye={id:0,name:"",price:0,isPaid:false,date:0};

      impayeJson.id=Number(impaye.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue as string);
      impayeJson.name=impaye.getElementsByTagName("ns2:name")[0].childNodes[0].nodeValue as string;
      impayeJson.price=Number(impaye.getElementsByTagName("ns2:price")[0].childNodes[0].nodeValue as string);
      impayeJson.date=Number(impaye.getElementsByTagName("ns2:date")[0].childNodes[0].nodeValue as string);
      let isPaidTemp=impaye.getElementsByTagName("ns2:isPaid")[0].childNodes[0].nodeValue as string;
      impayeJson.isPaid=isPaidTemp==="false"?false:true;

      listImpayeJson.push(impayeJson);
    })
    return listImpayeJson;
  }

  xml2jsonForms(data:string){
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(data, "text/xml");
    let formXML=xmlDoc.getElementsByTagName("ns2:forms");
    let formJson:{id:string,champs:{id:string,type:string,name:string,label:string}[]}={id:"",champs:[]};
    // console.log(formXML[0].childNodes[0].childNodes[0].nodeValue) //get value of form id through hierarchy
    // console.log(formXML[0].getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue)
    formJson.id=formXML[0].getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue as string;

    let listChampXML: Element[]=Array.from(formXML[0].getElementsByTagName("ns2:champs"));
    let listChampJson:any[]=[];

    listChampXML.forEach(champ=>{
      let champJson:{id:string,type:string,name:string,label:string}={id:"",type:"",name:"",label:""};

      champJson.id=champ.getElementsByTagName("ns2:id")[0].childNodes[0].nodeValue as string;
      champJson.type=champ.getElementsByTagName("ns2:type")[0].childNodes[0].nodeValue as string;
      champJson.name=champ.getElementsByTagName("ns2:name")[0].childNodes[0].nodeValue as string;
      champJson.label=champ.getElementsByTagName("ns2:label")[0].childNodes[0].nodeValue as string;

      listChampJson.push(champJson);

    });
    formJson.champs=listChampJson;
    return formJson;
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
    return listCreanceJson;
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
      return listCreancierJson;
  }


}
