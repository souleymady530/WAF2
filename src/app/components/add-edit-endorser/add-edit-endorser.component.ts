import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { EndorserService } from 'src/app/services/Endorser/endorser.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit-endorser',
  templateUrl: './add-edit-endorser.component.html',
  styleUrls: ['./add-edit-endorser.component.css']
})
export class AddEditEndorserComponent implements OnInit{



  endorser_form!:FormGroup;

  constructor(private form_builder:FormBuilder,
    private endorser_service:EndorserService,
    private dialogRef:MatDialogRef<AddEditEndorserComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
    this.endorser_form=this.form_builder.group(
      {
         
        first_name:'',
        last_name:'',
        gender:'',
        d_naissance:Date,
        phone_number:'',
        nic_image:"",
        profession:"",
         address:"",
        city:"",
        state:"",
        point:"",
        created_date:Date ,

      }
    )

  }

  ngOnInit(): void {
    this.endorser_form.patchValue(this.data);
  }

  submit_form( )
  {
     
   const data2={
          nic_image:this.endorser_form.value.nic_number,
          profession:this.endorser_form.value.profession,
          phone_number:this.endorser_form.value.phone_number,
          created_date:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
          user:
              {
                  gender:this.endorser_form.value.gender,
                  d_naissance:this.endorser_form.value.d_naissance,
                  first_name:this.endorser_form.value.first_name,
                  last_name:this.endorser_form.value.last_name,
              },
          location:
              {
                  address:this.endorser_form.value.address,
                  city:this.endorser_form.value.city,
                  state:this.endorser_form.value.state,
                  point:this.endorser_form.value.point
              }  
   }
    if(this.data)
    {
      this.endorser_service.update_endorser(this.data.id,data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Details endorser modifie avec succès")
            
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    else
    {
      this.endorser_service.add_endorser(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("endorser Ajouté avec succès")
            
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    
  }



}
/*
      "id": "number",
        "location": {
          "address": "string",
          "city": "string",
          "state": "string",
          "point": "string"
        },
        "first_name": "string",
        "last_name": "string",
        "gender": "string",
        "nic_image": "string",
        "phone_number": "string",
        "profession": "string",
        
*/