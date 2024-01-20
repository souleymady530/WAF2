import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreditService } from 'src/app/services/Credit/credit.service';


@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFIleComponent  implements OnInit{
  
  private srcResult:any;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false

  firstFormGroup=this.form_builder.group({
    
    contrat_signer: [null,[Validators.required]],
     
     })
  name="Aucun Fichier importé"
  loan_id!:any  
  
  constructor( private credit_service:CreditService,private form_builder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data:any, private dialogRef:MatDialogRef<ImportFIleComponent>,){
   
    this.loan_id=this.data.id
   
  
  }

ngOnInit(): void {
 
}
  onFileSelected(forWho:any) { 
    
      const inputNode: any = document.querySelector('#file1');
  
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
    
        reader.onload = (e: any) => {
          this.srcResult = e.target.result;
          this.name=inputNode.files[0].name 
        };
    
        reader.readAsArrayBuffer(inputNode.files[0]);
      }
    
     
    
  }

  valider(){
     
    //Recuperer le loan, associer le fichier puis faire un update et un close
    this.data.contrat_signe=this.firstFormGroup.value.contrat_signer
    this.data.loan_statut=3
    console.log(this.data)
    this.credit_service.update_credits(this.loan_id,this.data).subscribe({
      next:(val)=>console.log('Credit mis a jour'),
      error:console.log,
      complete:()=>console.log('Fin de requete')
    })
  }

}
