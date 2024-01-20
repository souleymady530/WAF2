import { Component,OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-img',
  templateUrl: './show-img.component.html',
  styleUrls: ['./show-img.component.css']
})
export class ShowImgComponent  implements OnInit
{
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false

  img_src='../../../../assets/images/desc.jpg'
  constructor( @Inject(MAT_DIALOG_DATA) public data:any){
    this.img_src=this.data==null? '../../../../assets/images/desc.jpg':this.data
  }
  ngOnInit(): void {
   
    
  }
}
