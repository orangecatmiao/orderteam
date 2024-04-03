import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Calendar } from '../../_factory/calendar';
import { RandomFactory } from 'src/app/_factory/random.factory';
import { Firehttp } from 'src/app/_service/firehttp';

import { AngularFirestore } from '@angular/fire/firestore';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFireDatabase } from '@angular/fire/database';
//import { AngularFireStorage } from "@angular/fire/storage";
import { OgcatTool,  OgcatDialog } from '../../../../projects/ogcat-tool-package/src/public-api';//OgcatUser,OgcatDataServices
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute }from '@angular/router';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers:[Calendar, RandomFactory, Firehttp, OgcatTool, OgcatDialog,]
})
export class CreateOrderComponent implements OnInit {
  title = '創建新訂單';
  photoUrl:any=location.origin;
  
  charge_name:string =''; 
  store_name:string='';
  end:string='';
  remark:string='';

  charge_name2:string =''; 
  store_name2:string='';

  errorMsg ={
    charge_name:'',
    store_name:'',
  } 

  urlObj ={
    member_qrcode :'',
    charge_qrcode :''
  }
   
  qr_code_width:number = 128;
  qr_code_show:boolean = false;

  locale;
  constructor(
    private calendar:Calendar,
    private randomFactory:RandomFactory,
    private http:Firehttp,
    public translate: TranslateService,
    private firestore: AngularFirestore,
    private ogcatTool:OgcatTool,
    private route: ActivatedRoute,
    private router:Router
    //private auth: AngularFireAuth,
    //private firedatabase:AngularFireDatabase,
    //private storage: AngularFireStorage, 
  ) { }

  ngOnInit(): void {
    this.locale = this.calendar.localize();
    this.route.params.subscribe(params => {
      this.urlObj.member_qrcode = params.member_qrcode;
      this.urlObj.charge_qrcode = params.charge_qrcode;
      if(params.member_qrcode!=null && params.charge_qrcode!=null){
        this.createOrderCallback( this.urlObj.member_qrcode, this.urlObj.charge_qrcode)
      }
    });
  }



  checkFile(){
    let error =0;
    this.errorMsg.charge_name ='';
    this.errorMsg.store_name ='';
    
    if(this.charge_name === ''){
        this.translate.get('CREATE_ORDER.MSG_MANAGER_EMPTY').subscribe((res) => {
          this.errorMsg.charge_name = res;
        });
       error++;
    }

    if(this.store_name === ''){
      this.translate.get('CREATE_ORDER.MSG_STORE_EMPTY').subscribe((res) => {
        this.errorMsg.store_name = res;
      });
      error++
    }
    if(error>0){
      return;
    }
    this.createOrder();
  }

  createOrder(){
    let member_qrcode;// = this.randomFactory.getRandomLetter(5) + new Date().getTime();
    let charge_code = this.randomFactory.getRandomLetter(5);

    let app =this;
    let params={
      charge_name:this.charge_name, 
      store_name:this.store_name, 
      end : this.calendar.getStrYMDHMSbyObj(this.end),// member_qrcode:member_qrcode, 
      is_pay:0,
      is_check:0,
      c_code:charge_code,
      remark: this.remark
    };

    this.http.create(environment.db.order, params, {
       success:function(data){
         app.createOrderCallback(data.id, charge_code);
       }
    })
  }
  
  createOrderCallback(member_qrcode, charge_qrcode){
   
    this.urlObj.member_qrcode = member_qrcode;
    this.urlObj.charge_qrcode = charge_qrcode;

    let member_url = this.photoUrl + '/page/order-list/' + member_qrcode;
    let charge_url = this.photoUrl + '/page/order-list/' + member_qrcode + '/' + charge_qrcode;

    this.charge_name2 = this.charge_name;
    this.store_name2 = this.store_name;

    this.charge_name= '';
    this.store_name= '';
    
    this.qr_code_show = true;

    let qr_code_width = this.qr_code_width;
    var qrcode = new QRCode(document.getElementById("member-qrcode"), {
        text: member_url,
        width: qr_code_width,
        height: qr_code_width,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });

      var qrcode2 = new QRCode(document.getElementById("charge-qrcode"), {
        text: charge_url,
        width: qr_code_width,
        height: qr_code_width,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
   /*
    if(this.urlObj.member_qrcode==null || this.urlObj.charge_qrcode==null){
      this.router.navigate(['/page/create-order/'+member_qrcode+'/'+ charge_qrcode]);
    }
    */
   

    
  }


}
