import { Component ,OnInit,Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-pdf',
  templateUrl: './show-pdf.component.html',
  styleUrls: ['./show-pdf.component.css']
})
export class ShowPDFComponent implements OnInit
{
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false


  pdf_src='../../../../assets/Fichiers/2.pdf'
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){

   this.pdf_src=data? data:'../../../../assets/Fichiers/2.pdf'
  }

  ngOnInit(): void {
    
  }

}
