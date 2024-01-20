import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Formule2ServiceService } from 'src/app/services/local-services/formule2-service.service';
 import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-level-formule2',
  templateUrl: './add-edit-level-formule2.component.html',
  styleUrls: ['./add-edit-level-formule2.component.css']
})
export class AddEditLevelFormule2Component implements OnInit {
  
  level_form!:any
  constructor(private form_builder:FormBuilder,private formue_service:Formule2ServiceService,@Inject(MAT_DIALOG_DATA) public data:any){

    this.level_form=this.form_builder.group({
        name:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
        loan_limit:[Number,[Validators.required]],
        loan_rate:[Number,[Validators.required]],
        normal_loan_rate:[Number,[Validators.required]],
         
        mounthly_restitution_duration:[Number,[Validators.required]],
        
       
    });

  }

  formule_submit_add(){
    const level=
    {
      is_add:true,
      name:this.level_form.value.name,
      loan_limit:Number(this.level_form.value.loan_limit),
      TauxEmprunt1a6:Number(this.level_form.value.loan_rate)/100,
      TauxNormal: Number(this.level_form.value.normal_loan_rate)/100,
      DureeMois:this.level_form.value.mounthly_restitution_duration?this.level_form.value.mounthly_restitution_duration:1,
      //hebdo 1er emprunt
      Option1: (this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.loan_rate))/this.level_form.value.mounthly_restitution_duration,
      //hebdo 2em emprunt
      Option2: (this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.normal_loan_rate))/this.level_form.value.mounthly_restitution_duration,
      penalite:0.02,

    }

    this.formue_service.add_formule(level).subscribe({
      next:()=>console.log('Insertion reussie'),
      error:console.log,
      complete:()=>console.log('Fin de requete')
    }) 

  }
  ngOnInit(): void {
    this.level_form.patchValue(this.data);
  }
}
