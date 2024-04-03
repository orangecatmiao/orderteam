import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { Msub1 } from '../../_data-services/msub1'

@Injectable()

export class Tool1 {
     constructor(
      public translate: TranslateService,
     // private auth:AngularFireAuth, 
     ){}

  

    getTransNameArr(arr){
      let app =this;
      let rArr=[];
      arr.forEach(function(val){
        app.translate.get(val).subscribe((trans_str) => {
          rArr[val]= trans_str;
        });
      }); 
      return rArr;
    }


}


/**
  
    getRandomUID(mcode:string){
      let uid = mcode + '-' + new Date().getTime() + '-' +this.getRandomChar(5);
      return uid;
    }

    getRandomNum(max:number, min:number, getNum?:number){
      if(getNum==null){
        return Math.floor(Math.random() * (max - min) + min);
      }
      let arr=[];
      for(let i=0; i<getNum; i++){
        let ram =  Math.floor(Math.random() * (max - min) + min);
        arr.push(ram);
      }
      return arr.join("");
    }

   
    getRandomChar(getChar:number){
      let char_arr=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
      let char_arr_big =char_arr.slice(0,26);//請注意，slice 只有在存值陣列裡面有效。在存 pointer 陣列裡面無效，必須用 JSON.stringify
      //陣列轉大寫
      char_arr_big.forEach(function(val, key){
        char_arr_big[key] = val.toLocaleUpperCase();
      })
      char_arr = char_arr.concat(char_arr_big);//將陣列接起來 
      let ramCharArr=[];
      for(let i=0; i<getChar; i++){
        let ram = Math.floor(Math.random() * (52 - 0) + 0);
      
        ramCharArr.push(char_arr[ram]);
      }
      
      return ramCharArr.join("");
    }

 */