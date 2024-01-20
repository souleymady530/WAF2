import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  img_name="Aucune image"
  errors_tab!:any
 private selectedFile:File=null;
 private srcResult:any;
 
  onFileSelected() { 
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        this.img_name=inputNode.files[0].name 
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  
}
