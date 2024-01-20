import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/components/core/snackbar.service';
import { DatePipe } from '@angular/common';
import { ManagerService } from 'src/app/services/local-services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css']
})
export class AddManagerComponent 
{
  private id!:Number
  private manager_data!:any
  current_username!:String;
  request_error!:any;
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  man_form=this.form_builder.group(
    {
      username:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      email:[null,[Validators.email]],
      first_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      password:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      password2:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      gender:'M',
      is_active:false,
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:["",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      is_autorised:false,
      created_at:Date,
    }
  )
  constructor(private form_builder:FormBuilder,
    private man_service:ManagerService,
     private router:ActivatedRoute,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
    

  }

  ngOnInit(): void {
     
  }

  submit_form( )
  {
     
     
      const data2={
        user:
            {
                username:this.man_form.value.username,
                first_name:this.man_form.value.first_name,
                last_name:this.man_form.value.last_name,
                email:this.man_form.value.email,
                is_agent:false,
                is_manager:true,
                password:this.man_form.value.password,
                password2:this.man_form.value.password2
            },
      gender:this.man_form.value.gender,
      d_naissance:this.man_form.value.d_naissance,
       phone_number:this.man_form.value.phone_number,
      created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      is_autorise:this.man_form.value.is_autorised,
    }

      this.man_service.add_man(data2).subscribe
      ({
          next:(val)=>{
            this.snacbar.openSnackBar("Manager Ajouté avec succès")
            
          },
          error:(val)=>{
            console.log()
           }
          
      })



    }
    
   

}
