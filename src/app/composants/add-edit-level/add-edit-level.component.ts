import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormuleServicesService } from 'src/app/services/local-services/formule-services.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-edit-level',
  templateUrl: './add-edit-level.component.html',
  styleUrls: ['./add-edit-level.component.css']
})
export class AddEditLevelComponent implements OnInit{
   
  level_form!:any
  constructor(private form_builder:FormBuilder,
    private formule1_service:FormuleServicesService,
    private dialogRef:MatDialogRef<AddEditLevelComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    
    ){

    this.level_form=this.form_builder.group({
        name:[null,[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
        loan_limit:[Number,[Validators.required]],
        rateOne:[Number,[Validators.required]],
        rateTwo:[Number,[Validators.required]],
        rateThree:[Number,[Validators.required]],
        rateNormal:[Number,[Validators.required]],
        DurationInMounth:[Number,[Validators.required]],
        DurationInWeekOne:[Number,[Validators.required]],
        DurationInWeekTwo:[Number,[Validators.required]],
        DurationInWeekThree:[Number,[Validators.required]],
        DurationInWeekNormal:[Number,[Validators.required]],
    });

  }
  formule_submit_add(){
    
    
    const level={
        is_add:true,
        name:this.level_form.value.name,
        loan_limit:this.level_form.value.loan_limit,
        rateOne:Number(this.level_form.value.rateOne)/100,
        rateTwo:Number(this.level_form.value.rateTwo)/100,
        rateThree:Number(this.level_form.value.rateThree)/100,
        rateNormal:Number(this.level_form.value.rateNormal)/100,
        DurationInMounth:this.level_form.value.DurationInMounth,
        DurationInWeekOne:this.level_form.value.DurationInWeekOne,
        DurationInWeekTwo:this.level_form.value.DurationInWeekTwo,
        DurationInWeekThree:this.level_form.value.DurationInWeekThree,
        DurationInWeekNormal:this.level_form.value.DurationInWeekNormal,

        //hebdo 1er emprunt
        Option1: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateOne/100))/this.level_form.value.DurationInWeekOne),
        //hebdo 2em emprunt
        Option2: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateTwo/100))/this.level_form.value.DurationInWeekTwo),

        //mensuel 2em emprunt
        Option3: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateTwo/100))/this.level_form.value.DurationInMounth),

        //Restitution hebdo 3ème emprunt en FCFA
        Option4: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateThree/100))/this.level_form.value.DurationInWeekThree),

        //Restitution en mois 3ème emprunt en FCFA
        Option5: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateThree/100))/this.level_form.value.DurationInMounth),

        //Restitution hebdo normale en FCFA
        Option6: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateNormal/100))/this.level_form.value.DurationInWeekNormal),

        //Restitution en mois normale en FCFA
        Option7: Math.trunc((this.level_form.value.loan_limit+(this.level_form.value.loan_limit*this.level_form.value.rateNormal/100))/this.level_form.value.DurationInMounth),
        penalite: 0.02
  }

    //console.log(level)
  
    this.formule1_service.add_formule(level).subscribe({
      next:()=>console.log('Insertion reussie'),
      error:console.log,
      complete:()=>console.log('Fin de requete')
    }) 
    

  }
  ngOnInit(): void {
    this.level_form.patchValue(this.data);
  }

}


/*

       "Option1": 38970,
       "Option2": 38369.99999999999,
       "Option3": 159874.99999999997,
       "Option4": 36605.769230769234,
       "Option5": 158625.00000000003,
       "Option6": 36057.692307692305,
       "Option7": 156250

        this.formule1_service.add_formule(this.level_form).subscribe({
      next:()=>console.log('Insertion reussie'),
      error:console.log,
      complete:()=>console.log('Fin de requete')
    }) 
*/