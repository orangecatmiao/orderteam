import { Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[]
})
export class HeaderComponent implements OnInit {
  
 

  constructor(public translate: TranslateService) {
    var lang = sessionStorage.getItem('language');

    if(lang==null ||  lang==""){
      lang =navigator.language.toLowerCase() ;
    }
    translate.addLangs(["en", "zh-tw","jp"]);
    translate.setDefaultLang(lang);

    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|zh-tw/) ? browserLang : lang);
  }

 


  ngOnInit(): void {
    this.getToken()
  }
  
  changeLanguage(language){
    sessionStorage.setItem('language', language);
  }


  getToken(){
    let app =this;
    window["update"]=0;
    window["currentTime"] = new Date();
    console.log("init currentTime-Happy New Year 2020!!")
  }


  getNewToken(){
    let now:any = new Date();
    if( now - window["currentTime"]>3600000){
      console.log("get token!!")
      $.ajax({
        url: "/api/get_token",//"/laravel/api/get_token",
        type: 'get',
        dataType: 'json',
        success: function (result) {
            window["update"]++;
            window["currentTime"] = new Date();
            $('meta[name="csrf-token"]').attr('content', result.token);
            $(".footer").html('聯絡我們: services@teamorder.magichamster.acsite.org'+'<div>'+new Date()+'---'+ window["update"]+'</div>');
        },
        error: function (xhr, status, error) {
            console.log(xhr);
        }
      });
    }else{
      console.log("not get!!")
    }
  }

  
  
  
 
  
 



  



 



 
  
}




