 import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../core/snackbar.service';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { AddEditCreditComponent } from '../add-edit-credit/add-edit-credit.component';
import { ApplicantService } from 'src/app/services/Applicants/applicant.service';
import { EditCreditComponent } from '../edit-credit/edit-credit.component';
import { filter } from 'rxjs';
import { ApplicantProfileComponent } from '../applicant-profile/applicant-profile.component';
@Component({
  selector: 'app-liste-credits',
  templateUrl: './liste-credits.component.html',
  styleUrls: ['./liste-credits.component.css']
})
export class ListeCreditsComponent implements OnInit
 {
  number_credits=0;
  all_applicant!:Array<any>
  data2!:any
  credit_form!:FormGroup;
  
  //is_man=true;
  user=JSON.parse(localStorage.getItem("currentUser"));
  is_man=this.user.user.is_manager
  displayedColumns: string[] = [
            
         
    "is_active" ,
    "applicant" ,
      
    "loan_amount" ,
    "loan_rate",
    
    "repayment_amount" ,
    "statut_remboursement",
    "actions"
     ];
     data_source!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_source.filter = filterValue.trim().toLowerCase();

    if (this.data_source.paginator) {
      this.data_source.paginator.firstPage();
    }
  }


  constructor(private matdialog:MatDialog,private credit_service:CreditService ,private snacbar:SnackbarService,private applicants_service:ApplicantService)
  {
    console.log(this.is_man)
    
   }
ngOnInit(): void {
  
  this.get_credits();
   
    
      
 }
 save_value(app)
 {
   
   this.all_applicant=app;
   
  
  }
  open_details(data){
    const dialogRef= this.matdialog.open(ApplicantProfileComponent,{
      data,
   });
  }

open_add_form()
{
  const dialogRef= this.matdialog.open(AddEditCreditComponent);
  dialogRef.afterClosed().subscribe(
    {
        next:(val)=>{
          if(val)
          {
            this.get_credits();
          }
        },
        error:console.log
    }
  )
}
get_credits()
{
  this.credit_service.get_credits().subscribe(
    {
      next:(res)=>{
         
        
          this.data_source=new MatTableDataSource(res)
          this.data_source.sort=this.sort;
          this.data_source.paginator=this.paginator;
         for(let i=0;i<res.length;i++)
            {
              console.log(this.user)
            }
          
          
      },
      error:console.log
    }
  )
}

open_edit_form(data:any)
{
  data={

   
    
     
      app_email:data.applicant.email,
      app_first_name:data.applicant.first_name,
      app_last_name:data.applicant.last_name,
     
      app_gender:data.applicant.gender,
      app_d_naissance:data.applicant.d_naissance,
      app_phone_number:data.applicant.phone_number,
     
      app_nic_number:data.applicant.nic_number,
      app_profile_image:data.applicant.profile_image,
      app_address:data.applicant.location.address,
      app_city:data.applicant.location.city,
      app_state:data.applicant.location.state,
      app_point:data.applicant.location.point,
      app_wave_phone_number:data.applicant.wave_phone_number,
      app_profession:data.applicant.profession,
      app_revenue: data.applicant.revenue,
      app_profile: data.applicant.profile,
      app_business_line: data.applicant.business_line,
      app_created_at:data.applicant.created_at,
      
    
    
    
      first_name:data.endorser.first_name,
      last_name:data.endorser.last_name,
      gender:data.endorser.gender,
      d_naissance:data.endorser.d_naissance,
      phone_number:data.endorser.phone_number,
      nic_image:data.endorser.nic_image,
      profession:data.endorser.profession,
      address:data.endorser.location.address,
      city:data.endorser.location.city,
      state:data.endorser.location.state,
      point:data.endorser.location.point,
      created_date:data.endorser.created_date ,
     
      recommending_agent: 1,
      is_active: false,
      loan_amount: data.loan_amount,
      loan_rate: data.loan_rate,
      loan_delay: data.loan_delay,
      repayment_amount:data.repayment_amount,
      created_at:data.created_at,
     id:data.id,
    
   
   }
   const dialogRef=this.matdialog.open(EditCreditComponent,{
      data,
   });
   

   dialogRef.afterClosed().subscribe(
    {
        next:(val)=>{
          if(val)
          {
            this.get_credits();
          }
        },
        error:console.log
    }
  )
}

delete_applicant(id:number)
{
  
  if(confirm("Confirmer la suppression"))
  {
    this.credit_service.delete_credits(id).subscribe(
      {
        next:(val)=>
        {
           
          this.snacbar.openSnackBar("Loans deleted","DONE")
          this.get_credits();
        },
        error:console.log
      }
    )
  }
     
   
  
}

activate_loans(data)
{
  const data2={

   
      applicant: data.applicant,
      endorser:data.endorser,
      recommending_agent: data.recommending_agent,
      is_active: true,
      loan_amount: data.loan_amount,
      loan_rate: data.loan_rate,
      loan_delay: data.loan_delay,
      repayment_amount: data.repayment_amount,
      
    }

    this.credit_service.update_credits(data.id,data2).subscribe(
      {
        next:(val)=>{
          alert("Credit Updated")
      },
      error:console.log
    }
    )

   this.credit_service.update_credits(data.id,data2).subscribe(
    {
      next:(val)=>{
        alert("Credit Updated")
    },
    error:console.log
  }
   )
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
  }*/