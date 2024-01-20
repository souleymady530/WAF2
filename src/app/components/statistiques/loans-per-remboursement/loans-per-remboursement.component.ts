import { Component } from '@angular/core';
 import { Chart } from 'angular-highcharts';
 import { HttpClient, HttpParams } from '@angular/common/http';
 import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-loans-per-remboursement',
  templateUrl: './loans-per-remboursement.component.html',
  styleUrls: ['./loans-per-remboursement.component.css']
})
export class LoansPerRemboursementComponent {

  private srcResult:any;
  constructor(private http:HttpClient){

  }
  selected_file:File=null
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  import_file(event){
    
    let fileList: FileList = event.target.files;

    if (fileList.length < 1) {
      return;
    }
    
    let file: File = fileList[0];
    let formData:FormData = new FormData();
    formData.append('uploadFile', file, file.name)
    
    let headers = new Headers();
    /** In Angular 5, including the header Content-Type can invalidate your request */
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    let params = new HttpParams( );

    const options = {
      params: params,
      reportProgress: true,
      header:headers,
    };

    
     
    this.http.post(`http://localhost:3000/notifications`, formData, options).subscribe(
            data => console.log('success'),
            error => console.log(error)
        );
   }





    upload()
  {
    console.log(this.selected_file)
      const fd=new FormData()
      fd.append("image",this.selected_file,this.selected_file.name)
      this.http.post('http://localhost:3000/notifications',fd).subscribe(
         resp=>{
          console.log("requete execute successfully")
         }
      )
  } 




 chart=new Chart({
    chart:
    {
      type:'line',

    },

    title:
    {
      text:"Credits A"
    },

    xAxis:
    {
      categories:[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
         
      ]
    },
    yAxis:
    {
      title:
      {
        text:"Revenue in FCFA"
      }
    },
    series:
    [
      {
      name:"Arizona",
      type:"line",
      data:[76,69,95,145,182,215,265,233,183,139,196],
      } 
  ],
    credits:{
      enabled:false,
    }
  })

}
