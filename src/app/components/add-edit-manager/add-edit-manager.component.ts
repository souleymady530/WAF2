 import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { DatePipe } from '@angular/common';
import { ManagerService } from 'src/app/services/local-services/manager.service';




@Component({
  selector: 'app-add-edit-manager',
  templateUrl: './add-edit-manager.component.html',
  styleUrls: ['./add-edit-manager.component.css']
})
export class AddEditManagerComponent
{
  current_username!:String;
  request_error!:any;
  man_form=this.form_builder.group(
    {
      username:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      email:[null,[Validators.email]],
      first_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      password:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      password2:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      gender:'M',
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:["",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      is_autorise:false,
      created_at:Date,
    }
  )
  constructor(private form_builder:FormBuilder,
    private man_service:ManagerService,
    private dialogRef:MatDialogRef<AddEditManagerComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private snacbar:SnackbarService,private datePipe:DatePipe)
  {
    

  }

  ngOnInit(): void {
    this.man_form.patchValue(this.data);
  }

  submit_form( )
  {
     
     if(this.data)
    {
      const data2=
      {
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
          is_autorise:true,

      }

      console.log(data2.user)
      this.man_service.update_man(this.data.id,data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Details Manager modifie avec succès")
            this.dialogRef.close(true);
          },
          error:console.log
          
        }
       )
    }
    else
    {
      const data2={
        user:
            {
                username:this.man_form.value.username,
                first_name:this.man_form.value.first_name,
                last_name:this.man_form.value.last_name,
                email:this.man_form.value.email,
                is_agent:this.man_form.value.is_agent,
                is_manager:this.man_form.value.is_manager,
                password:this.man_form.value.password,
                password2:this.man_form.value.password2
            },
      gender:this.man_form.value.gender,
      d_naissance:this.man_form.value.d_naissance,
       phone_number:this.man_form.value.phone_number,
      created_at:this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      is_autorise:false,

 }
      this.man_service.add_man(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Agent Ajouté avec succès")
            this.dialogRef.close(true);
          },
          error:(val)=>{
            console.log()
           }
          
        }
       )
    }
    
  }
}

/*
manager:
{
    user:,
    {
        username:,
        email:,
        first_name:,
        last_name:,
        is_agent:,
        is_manager:,
        password:,
        password2:,
    }
    gender:,
    phone_number:,
    is_autorise:,
    created_at:
}


*/