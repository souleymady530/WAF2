import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/components/core/snackbar.service';
import { DatePipe } from '@angular/common';
import { ManagerService } from 'src/app/services/local-services/manager.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-manager',
  templateUrl: './edit-manager.component.html',
  styleUrls: ['./edit-manager.component.css']
})
export class EditManagerComponent implements OnInit {
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  private id!:Number
    manager_data={
    username:"",
      email:'',
      first_name:'',
      last_name:'',
      password:'',
      password2:'',
      gender:'',
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:'',
      is_autorised:'',
      created_at:Date,
  }
  current_username!:String
  request_error!:any
  
  man_form=this.form_builder.group(
    {
      username:[this.manager_data.username,[Validators.minLength(4),Validators.maxLength(100)]],
      email:[this.manager_data.email,[Validators.email]],
      first_name:[this.manager_data.first_name,[Validators.minLength(2),Validators.maxLength(100)]],
      last_name:[this.manager_data.last_name,[ Validators.minLength(2),Validators.maxLength(100)]],
      password:[this.manager_data.password,[ Validators.minLength(8),Validators.maxLength(100)]],
      password2:[this.manager_data.password,[ Validators.minLength(8),Validators.maxLength(100)]],
      gender:this.manager_data.gender,
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:[this.manager_data.phone_number,[ Validators.minLength(2),Validators.maxLength(20)]],
      is_autorised:this.manager_data.is_autorised,
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
    
    this.id=this.router.snapshot.params['id'];
    console.log(this.id)
    
    this.man_service.get_by_id(this.id).subscribe({
      next:(res)=>{
       // this.manager_data=res.user.username
        this.manager_data.username=res.user.username,
        this.manager_data.email=res.user.email,
        this.manager_data.first_name=res.user.first_name,
        this.manager_data.last_name=res.user.last_name,
        this.manager_data.password=res.user.password,
        this.manager_data.password2=res.user.password,
        this.manager_data.gender=res.gender,
       
        this.manager_data.d_naissance=res.d_naissance,
        this.manager_data.phone_number=res.phone_number,
        this.manager_data.is_autorised=res.user.is_autorise
         
      },
      error:console.log
    })

 
  }

   
  submit_form( )
  {
     
     
    const data2=
    {
        user:
            {
                username:this.man_form.value.username? this.man_form.value.username:this.manager_data.username ,
                first_name:this.man_form.value.first_name? this.man_form.value.first_name:this.manager_data.first_name,
                last_name:this.man_form.value.last_name? this.man_form.value.last_name:this.manager_data.last_name,
                email:this.man_form.value.email? this.man_form.value.email:this.manager_data.email,
                is_agent:false,
                is_manager:true,
                password:this.man_form.value.password?this.man_form.value.password:this.manager_data.password,
                password2:this.man_form.value.password2?this.man_form.value.password2:this.manager_data.password
            },
        gender:this.man_form.value.gender?this.man_form.value.gender:this.manager_data.gender,
        d_naissance:this.man_form.value.d_naissance?this.man_form.value.d_naissance:this.manager_data.d_naissance,
        phone_number:this.man_form.value.phone_number?this.man_form.value.phone_number:this.manager_data.phone_number,
        is_autorise:this.man_form.value.is_autorised,

    }

    console.log(data2.user)
    this.man_service.update_man(this.id,data2).subscribe(
      {
        next:(val)=>{
          this.snacbar.openSnackBar("Details Manager modifie avec succès")
         },
        error:console.log
        
      }
     )


    }
    

}
