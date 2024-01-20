 import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApplicantService } from 'src/app/services/Applicants/applicant.service';  
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-add-edit-applicant',
  templateUrl: './add-edit-applicant.component.html',
  styleUrls: ['./add-edit-applicant.component.css']
})
export class AddEditApplicantComponent implements OnInit
{
  app_form!:FormGroup;

  constructor(private form_builder:FormBuilder,
    private app_service:ApplicantService,
    private dialogRef:MatDialogRef<AddEditApplicantComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
    this.app_form=this.form_builder.group(
      {
        
        email:"",
        first_name:'',
        last_name:'',
       
        gender:'',
        d_naissance:Date,
        phone_number:'',
       
        nic_number:'',
        profile_image:"",
         address:"",
         city:"",
         state:"",
         point:"",
        wave_phone_number: "",
        profession: " ",
        revenue: " ",
        profile: " ",
        business_line: " ",
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        

      }
    )

  }


  ngOnInit(): void {
    this.app_form.patchValue(this.data);
  }

  submit_form( )
  {
     
   const data2={
          user:
              {
                   
                  first_name:this.app_form.value.first_name,
                  last_name:this.app_form.value.last_name,
                  email:this.app_form.value.email,
              },
        gender:this.app_form.value.gender,
        d_naissance:this.app_form.value.d_naissance,
        wave_phone_number:this.app_form.value.wave_phone_number,
        business_line:this.app_form.value.business_line,
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        profession:this.app_form.value.profession,
        revenue: this.app_form.value.revenue,
        location:
            {
              address:this.app_form.value.address,
              city:this.app_form.value.city,
              state:this.app_form.value.state,
              point:this.app_form.value.point
            }  
   }
    if(this.data)
    {
      this.app_service.update_applicants(this.data.id,data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Details agent modifie avec succès")
            
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    else
    {
      this.app_service.add_applicants(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Applicant Ajouté avec succès")
            
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    
  }

}
