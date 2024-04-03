import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Firehttp } from 'src/app/_service/firehttp';

import { AngularFirestore } from '@angular/fire/firestore';
import { OgcatTool,  OgcatDialog } from '../../../../projects/ogcat-tool-package/src/public-api';//OgcatUser,OgcatDataServices
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers:[Firehttp, OgcatTool, OgcatDialog,]
})
export class OrderListComponent implements OnInit {
  title = '訂單列表';
  photoUrl:any;

  titleInfo ={ charge_name:'', store_name:'', end:''};
  mcode:string ='';
  ccode:string ='';
  order_list:any =[];
  charge = false;
  is_no_order:boolean = false;

  is_total:boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http:Firehttp,
   // public translate: TranslateService,
    private firestore: AngularFirestore,
    private ogcatTool:OgcatTool,
  ) { }

  ngOnInit(): void {
    this.photoUrl = location.origin;
    this.route.params.subscribe(params => {
      this.ccode = params.c_code;
      this.mcode = params.m_code;
      this.getList();
      this.getOrderList();
    });
  }

  //===================================  Emit ================================================
  onVoted(obj:any) {
    if(obj.is_total !=null){
      this.is_total = obj.is_total;  //this.chRef.detectChanges();
      this.getList();
    }
    
   }

  getList(){
    let app = this;
    let obj={db:environment.db.order, id: this.mcode}; 
    this.http.getByID(obj, {
      success:function(data){
        if(data==null){
          app.is_no_order=true;
          return;
        }
        
        app.titleInfo =data;
        if(data.c_code === app.ccode){
          app.charge = true;
        }
      
      
      }
    });
  }

  //取得訂單詳細資料
  getOrderList(){
    let app = this;
    let obj={db:environment.db.order_detail, ref:null}; 
    obj.ref = this.firestore.collection(obj.db).ref.where('m_code','==', this.mcode);
    this.http.getByUid(obj, {
      success:function(data){
        app.order_list =data;
      
      }
    });
  
  }




}
