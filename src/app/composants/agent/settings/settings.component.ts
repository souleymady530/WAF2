import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SnackbarService } from 'src/app/components/core/snackbar.service';
import { AgentService } from 'src/app/services/local-services/agent.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  lat=0
  lon=0
  img_name="Aucune image"
 errors_tab!:any
  id!:number
  agent={
    username:'',
    email:'',
    first_name:'',
    last_name:'',
    
    gender:'M',
    d_naissance:'',
    phone_number:'',
    

    nic_number:'',
    profile_image:'',
     address:'',
     city:'',
     state:'',
     point:''

  }
 
 


private selectedFile:File=null;
private srcResult:any;
agent_form=this.form_builder.group(
  {
    username:[this.agent.username,[Validators.minLength(4),Validators.maxLength(100)]],
    email:[this.agent.email,[Validators.email]],
    first_name:[this.agent.first_name,[Validators.minLength(2),Validators.maxLength(100)]],
    last_name:[this.agent.last_name,[Validators.minLength(2),Validators.maxLength(100)]],
    password:[null,[Validators.minLength(8),Validators.maxLength(100)]],
    password2:[null,[Validators.minLength(8),Validators.maxLength(100)]],
    gender:this.agent.gender,
    d_naissance:this.agent.d_naissance,
    phone_number:[this.agent.phone_number,[Validators.minLength(8),Validators.maxLength(20)]],
    is_agent:true,
    is_manager:false,

    nic_number:[this.agent.nic_number,[Validators.minLength(2),Validators.maxLength(100)]],
    profile_image:[this.agent.profile_image,[Validators.minLength(2),Validators.maxLength(100)]],
     address:[this.agent.address,[Validators.minLength(2),Validators.maxLength(100)]],
     city:[this.agent.city,[Validators.minLength(2),Validators.maxLength(100)]],
     state:[this.agent.state,[Validators.minLength(2),Validators.maxLength(100)]],
     point:[this.agent.point,[Validators.minLength(2),Validators.maxLength(100)]]

  }
)
constructor(private form_builder:FormBuilder,
  private agent_service:AgentService,
  private router:ActivatedRoute,
  
  private snacbar:SnackbarService)
{
  this.id=this.router.snapshot.params['id']
 // console.log(this.router.snapshot.params['id'])
  this.agent_service.get_by_id(this.router.snapshot.params['id']).subscribe(
    {
      next:(res)=>
      {
          console.log(res);
          this.agent={
            username:res.user.username,
            email:res.user.email,
            first_name:res.user.first_name,
            last_name:res.user.last_name,
            
            gender:res.gender,
            d_naissance:res.d_naissance,
            phone_number:res.phone_number,
            
        
            nic_number:res.nic_number,
            profile_image:res.profile_image,
             address:res.location.address,
             city:res.location.city,
             state:res.location.state,
             point:res.location.point
        
          }
         
      },
      error:console.log
    }
  )

  
}



 ViewCoOrdinate() {
  if (navigator.geolocation)
  {
    
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
 //Exwecution de la requete de modification
 this.agent_service.update_agent(this.id,data2).subscribe(
  {
    next:(val)=>{
      this.snacbar.openSnackBar("Details agent modifie avec succès")
      
     },
    error:(error)=>{
       
      console.log(error)
    }
    
  }
 )
  
}
update_error(err){
  this.errors_tab=err
 // console.log(this.errors_tab.user)
}

}
