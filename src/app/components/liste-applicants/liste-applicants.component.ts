 import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditApplicantComponent } from '../add-edit-applicant/add-edit-applicant.component';
import { SnackbarService } from '../core/snackbar.service';
import { ApplicantServiceService } from 'src/app/services/Applicants/applicant-service.service';
import { ApplicantService } from 'src/app/services/Applicants/applicant.service';
 
@Component({
  selector: 'app-liste-applicants',
  templateUrl: './liste-applicants.component.html',
  styleUrls: ['./liste-applicants.component.css']
})
export class ListeApplicantsComponent 
{
  app_form!:FormGroup;
  displayedColumns: string[] = [
            
        "first_name" ,
        "last_name" ,
        "email",
       "wave_phone_number" ,
      "business_line" ,
      "profession" ,
      "revenue" ,
        "location" ,
      
      "actions",





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


  constructor(private matdialog:MatDialog,private app_service:ApplicantService,private snacbar:SnackbarService)
  {
    
  }
ngOnInit(): void {
  this.get_applicants();
}


open_add_form()
{
  const dialogRef= this.matdialog.open(AddEditApplicantComponent);
  dialogRef.afterClosed().subscribe(
    {
        next:(val)=>{
          if(val)
          {
            this.get_applicants();
          }
        },
        error:console.log
    }
  )
}
get_applicants()
{
  this.app_service.get_applicants().subscribe(
    {
      next:(res)=>{
          //console.log(res);
          this.data_source=new MatTableDataSource(res)
          this.data_source.sort=this.sort;
          this.data_source.paginator=this.paginator;
          
      },
      error:console.log
    }
  )
}

open_edit_form(data:any)
{
  data.username=data.user.username
  data.first_name=data.user.first_name
  data.last_name=data.user.last_name
  data.email=data.user.email
  data.password=data.user.password
  data.password2=data.user.password2

  data.address=data.location.address
  data.state=data.location.state
  data.city=data.location.city
  data.point=data.location.point

   const dialogRef=this.matdialog.open(AddEditApplicantComponent,{
      data,
   });
   

   dialogRef.afterClosed().subscribe(
    {
        next:(val)=>{
          if(val)
          {
            this.get_applicants();
          }
        },
        error:console.log
    }
  )
}

delete_applicant(id:number)
{
  console.log("Hello")
  if(confirm("Confirmer la suppression"))
  {
    this.app_service.delete_applicants(id).subscribe(
      {
        next:(val)=>
        {
           
          this.snacbar.openSnackBar("Agent deleted","DONE")
          this.get_applicants();
        },
        error:console.log
      }
    )
  }
     
   
  
}

}
