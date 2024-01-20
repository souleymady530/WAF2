import { Component, Inject, OnInit } from '@angular/core';
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
import { FormControl } from '@angular/forms';

 
@Component({
  selector: 'app-add-edit-credit',
  templateUrl: './add-edit-credit.component.html',
  styleUrls: ['./add-edit-credit.component.css']
})


export class AddEditCreditComponent 
{
  user=JSON.parse(localStorage.getItem("currentUser"));
  //[Validators.required,Validators.minLength(4),Validators.maxLength],
  credit_form!:FormGroup;
  applicants_list!:Array<any>;
  endorsers_liste!:Array<any>;
  firstFormGroup = this.form_builder.group({
    
    app_email:[null,[Validators.email]],
    app_first_name: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
   
    app_gender: 'M',
    app_d_naissance:Date,
    app_phone_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
   
    app_nic_number:[null,[Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
    app_profile_image:"",
    app_address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_wave_phone_number: "",
    app_profession: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_revenue: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_profile: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
    app_business_line: [null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    app_created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  });
  secondFormGroup = this.form_builder.group({
     
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
  });

  thirdFormGroup = this.form_builder.group({
    
    applicant: "",
        endorser: "",
        recommending_agent: "",
        is_active: false,
        loan_amount:[null,[Number,Validators.required]],
        loan_rate:[null,[Number,Validators.required]],
        repayment_amount:[null,[Number,Validators.required]],
        loan_delay:[90,[Number,Validators.required]],
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
  });


  isLinear = false;



   constructor(private form_builder:FormBuilder,
    private credit_service:CreditService,
    private dialogRef:MatDialogRef<AddEditCreditComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any,
   private applicants_service:ApplicantService,
   private endorser_service:EndorserService,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
  
  }


  ngOnInit(): void {
    this.credit_form.patchValue(this.data);
   this.define_lists();
      
  }
  valider(){

    
    const data2={

   
    applicant: {
      email:this.firstFormGroup.value.app_email,
      first_name:this.firstFormGroup.value.app_first_name,
      last_name:this.firstFormGroup.value.app_last_name,
     
      gender:this.firstFormGroup.value.app_gender,
      d_naissance:this.firstFormGroup.value.app_d_naissance,
      phone_number:this.firstFormGroup.value.app_phone_number,
     
      nic_number:this.firstFormGroup.value.app_nic_number,
      profile_image:this.firstFormGroup.value.app_profile_image,
        location:{
          address:this.firstFormGroup.value.app_address,
          city:this.firstFormGroup.value.app_city,
          state:this.firstFormGroup.value.app_state,
          point:this.firstFormGroup.value.app_point,
        },
      wave_phone_number: this.firstFormGroup.value.app_wave_phone_number,
      profession: this.firstFormGroup.value.app_profession,
      revenue: this.firstFormGroup.value.app_revenue,
      profile: this.firstFormGroup.value.app_profile,
      business_line: this.firstFormGroup.value.app_business_line,
      created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
    },
    endorser: {
      first_name:this.secondFormGroup.value.first_name,
      last_name:this.secondFormGroup.value.last_name,
      gender:this.secondFormGroup.value.gender,
      d_naissance:this.secondFormGroup.value.d_naissance,
      phone_number:this.secondFormGroup.value.phone_number,
      nic_image:this.secondFormGroup.value.nic_image,
      profession:this.secondFormGroup.value.profession,
      location:
      {
        address:this.secondFormGroup.value.address,
        city:this.secondFormGroup.value.city,
        state:this.secondFormGroup.value.state,
        point:this.secondFormGroup.value.point,
      },
      created_date:Date ,
    },
    recommending_agent: this.user.user.id? this.user.user.id:1,
    is_active: false,
    loan_amount: this.thirdFormGroup.value.loan_amount,
    loan_rate: this.thirdFormGroup.value.loan_rate,
    loan_delay: this.thirdFormGroup.value.loan_delay,
    repayment_amount: this.thirdFormGroup.value.repayment_amount,
    created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
   }
this.credit_service.add_credits(data2).subscribe({
  next:(val)=>{
    this.snacbar.openSnackBar("Details Credits ajoutés avec succès et attente de confirmation")
    this.dialogRef.close(true);
    
  },
  error:console.log
})
   console.log(data2)
  }
  define_lists()
  {
    this.applicants_service.get_applicants().subscribe(
      {
        next:(liste)=>{
          this.save_list(liste,1);
        }

      }
      
    );
    this.endorser_service.get_endorsers().subscribe({
      next:(liste)=>{
        this.save_list(liste,2);
      }
    })
  }


  save_list(liste,ind)
  {
    if(ind==1)
      this.applicants_list=liste;
    else
      this.endorsers_liste=liste;
  }
  submit_form( )
  {
     
   const data2={
          
        gender:this.credit_form.value.gender,
        d_naissance:this.credit_form.value.d_naissance,
         
   }
    if(this.data)
    {
      this.credit_service.update_credits(this.data.id,data2).subscribe(
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
      this.credit_service.add_credits(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Credit Enregistre avec succès")
            
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    
  }
}


/*

"credits": [
  {
    "id": "number",
    "applicant": "number",
    "endorser": "number",
    "recommending_agent": "number",
    "is_active": "boolean",
    "loan_amount": "number",
    "loan_rate": "number",
    "repayment_amount": "number"
  }
  
  
  this.credit_form=this.form_builder.group(
      {
        applicant: "",
        endorser: "",
        recommending_agent: "",
        is_active: true,
        loan_amount: "",
        loan_rate: "",
        repayment_amount: "",
        created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      }
    )
  
  
  */