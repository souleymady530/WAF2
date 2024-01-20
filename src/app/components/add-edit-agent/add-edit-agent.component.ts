import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';

 import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { AgentService } from 'src/app/services/agent/agent.service';

@Component({
  selector: 'app-add-edit-agent',
  templateUrl: './add-edit-agent.component.html',
  styleUrls: ['./add-edit-agent.component.css']
})
export class AddEditAgentComponent implements OnInit{
    lat=0
    lon=0
    img_name="Aucune image"
   errors_tab!:any

   
   


  private selectedFile:File=null;
  private srcResult:any;
  agent_form=this.form_builder.group(
    {
      username:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      email:[null,[Validators.email]],
      first_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      last_name:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      password:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      password2:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(100)]],
      gender:'M',
      d_naissance:Date,
      phone_number:[null,[Validators.required,Validators.minLength(8),Validators.maxLength(20)]],
      is_agent:true,
      is_manager:false,

      nic_number:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      profile_image:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       address:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       city:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       state:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
       point:[null,[Validators.required,Validators.minLength(2),Validators.maxLength(100)]]

    }
  )
  constructor(private form_builder:FormBuilder,
    private agent_service:AgentService,
    
    
    private snacbar:SnackbarService)
  {
    
    

  }



   ViewCoOrdinate() {
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition((position: any) => {this.lat=position.coords.latitude,this.lon=position.coords.longitude});

    } else {
        alert('Geo Location feature is not supported in this browser.');
    }

    return false;
}

 









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


  ngOnInit(): void {
    //this.agent_form.patchValue(this.data);
     
   }

  submit_form( )
  {
    
    
     this.ViewCoOrdinate();
   const data2={
          user:
              {
                  username:this.agent_form.value.username,
                  first_name:this.agent_form.value.first_name,
                  last_name:this.agent_form.value.last_name,
                  email:this.agent_form.value.email,
                  is_agent:this.agent_form.value.is_agent,
                  is_manager:this.agent_form.value.is_manager,
                  password:this.agent_form.value.password,
                  password2:this.agent_form.value.password2
              },
        gender:this.agent_form.value.gender,
        d_naissance:this.agent_form.value.d_naissance,
        profile_image:this.agent_form.value.profile_image,
        nic_number:this.agent_form.value.nic_number,
        phone_number:this.agent_form.value.phone_number,
        location:
            {
              address:this.agent_form.value.address,
              city:this.agent_form.value.city,
              state:this.agent_form.value.state,
              point:
              {
                "type": "Point",
                "coordinates": [
                  this.lat,
                  this.lon
                ]
              }
            }  
   }
    
   /* if(this.data)
    {
      this.agent_service.update_agent(this.data.id,data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Details agent modifie avec succès")
            
            this.dialogRef.close(true);
          },
          error:(error)=>{
             
            console.log(error)
          }
          
        }
       )
    }
    else
    {
      this.agent_service.add_agent(data2).subscribe(
        {
          next:(val)=>{
            this.snacbar.openSnackBar("Agent Ajouté avec succès")
            
            this.dialogRef.close(true);
          },
          error:(erreurs)=>{
           
            
            this.update_error(erreurs.error)
           }
          
          
        }
       )
    }
    */
  }
  update_error(err){
    this.errors_tab=err
   // console.log(this.errors_tab.user)
  }
}
