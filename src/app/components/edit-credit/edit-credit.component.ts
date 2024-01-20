import { Component , Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
 import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { DatePipe } from '@angular/common';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { ApplicantService } from 'src/app/services/Applicants/applicant.service';
import { EndorserService } from 'src/app/services/Endorser/endorser.service';
import { Observable } from 'rxjs';
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-edit-credit',
  templateUrl: './edit-credit.component.html',
  styleUrls: ['./edit-credit.component.css']
})
export class EditCreditComponent {
  isLinear=false; 
  creditFormGroup=this.form_builder.group({
    
   
    app_email:[null,[Validators.email]],
    app_first_name: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
   
    app_gender: 'M',
    app_d_naissance:Date,
    app_phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
   
    app_nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
    app_profile_image:"",
    app_address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_wave_phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_profession: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_revenue: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_profile: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_business_line: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    app_created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),


    
    first_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    gender:'',
    d_naissance:Date,
    phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    nic_image:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    profession:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
     address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
    city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
    state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
    point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(255)]],
    created_date:Date ,

    applicant: "",
    endorser: "",
    recommending_agent: "",
    is_active: true,
    loan_amount:[null,[Number,Validators.required]],
    loan_rate:[null,[Number,Validators.required]],
    repayment_amount:[null,[Number,Validators.required]],
    loan_delay:[null,[Number,Validators.required]],
    created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),

    
  });
  constructor(private form_builder:FormBuilder,private datePipe:DatePipe,private dialogRef:MatDialogRef<EditCreditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,private snacbar:SnackbarService,private credit_service:CreditService)
  {

  }


  ngOnInit(): void {
    this.creditFormGroup.patchValue(this.data);
       
  }
  valider(){
    console.log("Hello")
    const data2={

   
      applicant: {
        email:this.creditFormGroup.value.app_email,
        first_name:this.creditFormGroup.value.app_first_name,
        last_name:this.creditFormGroup.value.app_last_name,
       
        gender:this.creditFormGroup.value.app_gender,
        d_naissance:this.creditFormGroup.value.app_d_naissance,
        phone_number:this.creditFormGroup.value.app_phone_number,
       
        nic_number:this.creditFormGroup.value.app_nic_number,
        profile_image:this.creditFormGroup.value.app_profile_image,
        address:this.creditFormGroup.value.app_address,
        city:this.creditFormGroup.value.app_city,
        state:this.creditFormGroup.value.app_state,
        point:this.creditFormGroup.value.app_point,
        wave_phone_number: this.creditFormGroup.value.app_wave_phone_number,
        profession: this.creditFormGroup.value.app_profession,
        revenue: this.creditFormGroup.value.app_revenue,
        profile: this.creditFormGroup.value.app_profile,
        business_line: this.creditFormGroup.value.app_business_line,
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      },
      endorser: {
        first_name:this.creditFormGroup.value.first_name,
        last_name:this.creditFormGroup.value.last_name,
        gender:this.creditFormGroup.value.gender,
        d_naissance:this.creditFormGroup.value.d_naissance,
        phone_number:this.creditFormGroup.value.phone_number,
        nic_image:this.creditFormGroup.value.nic_image,
        profession:this.creditFormGroup.value.profession,
         address:this.creditFormGroup.value.address,
        city:this.creditFormGroup.value.city,
        state:this.creditFormGroup.value.state,
        point:this.creditFormGroup.value.point,
        created_date:Date ,
      },
      recommending_agent: 1,
      is_active: true,
      loan_amount: this.creditFormGroup.value.loan_amount,
      loan_rate: this.creditFormGroup.value.loan_rate,
      loan_delay: this.creditFormGroup.value.loan_delay,
      repayment_amount: this.creditFormGroup.value.repayment_amount,
      created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
     }

     this.credit_service.update_credits(this.data.id,data2).subscribe(
      {
        next:(val)=>{
          this.snacbar.openSnackBar("Details Credits modifiés  avec succès et attente de confirmation")
          this.dialogRef.close(true);
      },
      error:console.log
    }
     )

  }
    
  
    


}
