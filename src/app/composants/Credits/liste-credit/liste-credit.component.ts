import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/Snackbar/snackbar.service';
import { CreditService } from 'src/app/services/Credit/credit.service';
 import { ApplicantService } from 'src/app/services/Applicants/applicant.service';
 import { filter } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-liste-credit',
  templateUrl: './liste-credit.component.html',
  styleUrls: ['./liste-credit.component.css']
})
export class ListeCreditComponent 
{
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  number_credits=0;
  all_applicant!:Array<any>
  data2!:any
  credit_form!:FormGroup;
  formule='Formule Classique'
  //is_man=true;
  user=JSON.parse(localStorage.getItem("currentUser"));
  is_man=this.user.user.is_manager
  displayedColumns: string[] = [
            
         
    "is_active" ,
    "applicant" ,
      
    "loan_amount" ,
    "loan_rate",
    "indice_initial",
    
    
    "repayment_amount" ,
      
    "actions"
     ];
     data_source!: MatTableDataSource<any>;
     data_source1!: MatTableDataSource<any>;
     data_source2!: MatTableDataSource<any>;
     data_source3!: MatTableDataSource<any>;
     data_source4!: MatTableDataSource<any>;
     data_source_geler!: MatTableDataSource<any>;
     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatPaginator) paginator1: MatPaginator;
     @ViewChild(MatPaginator) paginator2: MatPaginator;
     @ViewChild(MatPaginator) paginator3: MatPaginator;
     @ViewChild(MatPaginator) paginator4: MatPaginator;
     @ViewChild(MatPaginator) paginator_geler: MatPaginator;
      @ViewChild(MatSort) sort : MatSort;
      @ViewChild(MatSort) sort1 : MatSort;
      @ViewChild(MatSort) sort2 : MatSort;
      @ViewChild(MatSort) sort3 : MatSort;
      @ViewChild(MatSort) sort4 : MatSort;
      @ViewChild(MatSort) sort_geler : MatSort;



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_source.filter = filterValue.trim().toLowerCase();
    this.data_source1.filter = filterValue.trim().toLowerCase();
    this.data_source2.filter = filterValue.trim().toLowerCase();
    this.data_source3.filter = filterValue.trim().toLowerCase();
    this.data_source4.filter = filterValue.trim().toLowerCase();
    this.data_source_geler.filter = filterValue.trim().toLowerCase();

    if (this.data_source.paginator) { this.data_source.paginator.firstPage(); }
    if (this.data_source1.paginator) { this.data_source1.paginator.firstPage(); }
    if (this.data_source2.paginator) { this.data_source2.paginator.firstPage(); }
    if (this.data_source3.paginator) { this.data_source3.paginator.firstPage(); }
    if (this.data_source4.paginator) { this.data_source4.paginator.firstPage(); }
    if (this.data_source_geler.paginator) { this.data_source_geler.paginator.firstPage(); }
  }

  constructor( private credit_service:CreditService ,private snacbar:SnackbarService,private route:Router,private activatedRoute:ActivatedRoute)
  {
    
    

   }
ngOnInit(): void {
  
   

  this.get_credits();
   
    
      
 }
 add_for_old_client(){
  if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/oldaddcredits')
  else   this.route.navigateByUrl('/agent-home/oldaddcredits')
  
 }
 save_value(app)
 {
   
   this.all_applicant=app;
  


  
  }
   

add()
{
  if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/addcredits')
  else   this.route.navigateByUrl('/agent-home/addcredits')
  


}
get_credits()
{

  
  
  this.credit_service.get_credits().subscribe(
    {
      //if is agent alors on e fait que selectionner toutes les demandes avec le recommending agen

      //sinon si c est un manageur alors on ne fait selectionner tout le monde
      
      next:(res)=>{
        
        let tab_loans=new Array();
        let tab_loans1=new Array();
        let tab_loans2=new Array();
        let tab_loans3=new Array();
        let tab_loans4=new Array();
        let data_source_geler=new Array();
        res.forEach(element => {
          if(element.loan_type==this.formule)
          {

              if(this.user.user.is_agent)
              {

                if(element.recommending_agent==this.user.user.id)
                {
                    if(element.loan_statut==1)      tab_loans.push(element)
                    else if(element.loan_statut==2)  tab_loans1.push(element)
                    else if(element.loan_statut==3)  tab_loans2.push(element)
                    else if(element.loan_statut==4)  tab_loans3.push(element)
                    else if(element.loan_statut==5)  tab_loans4.push(element)
                    else if(element.loan_statut==-1)  data_source_geler.push(element) 
                }
              }
              else if(this.user.user.is_manager)
              {
                if(element.loan_statut==1)      tab_loans.push(element)
                else if(element.loan_statut==2)  tab_loans1.push(element)
                else if(element.loan_statut==3)  tab_loans2.push(element)
                else if(element.loan_statut==4)  tab_loans3.push(element)
                else if(element.loan_statut==5)  tab_loans4.push(element)
                else if(element.loan_statut==-1)  data_source_geler.push(element) 
              }

             /* if(element.loan_statut==1)      tab_loans.push(element)
              else if(element.loan_statut==2)  tab_loans1.push(element)
              else if(element.loan_statut==3)  tab_loans2.push(element)
              else if(element.loan_statut==4)  tab_loans3.push(element)
              else if(element.loan_statut==5)  tab_loans4.push(element)
              else if(element.loan_statut==-1)  data_source_geler.push(element) */
        }
        });
          this.data_source=new MatTableDataSource(tab_loans)
          this.data_source.sort=this.sort;
          this.data_source.paginator=this.paginator;
         
          this.data_source1=new MatTableDataSource(tab_loans1)
          this.data_source1.sort=this.sort1;
          this.data_source1.paginator=this.paginator1;
         
          this.data_source2=new MatTableDataSource(tab_loans2)
          this.data_source2.sort=this.sort2;
          this.data_source2.paginator=this.paginator2;
         
          this.data_source3=new MatTableDataSource(tab_loans3)
          this.data_source3.sort=this.sort3;
          this.data_source3.paginator=this.paginator3;
         
          this.data_source4=new MatTableDataSource(tab_loans4)
          this.data_source4.sort=this.sort4;
          this.data_source4.paginator=this.paginator4;

          this.data_source_geler=new MatTableDataSource(data_source_geler)
          this.data_source_geler.sort=this.sort_geler;
          this.data_source_geler.paginator=this.paginator_geler;
         
          
          
      },
      error:console.log
    }
  )
}

redirect_edit_form(id:any)
{
   

  if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/editcredits/'+id)
  else   this.route.navigateByUrl('/agent-home/editcredits/'+id)

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

view_details(id:Number)
{
   
  console.log('----------------------')
  console.log(this.user)
  if(this.user.user.is_manager)  this.route.navigateByUrl('/dashboard/viewcredits/'+id)
  else   this.route.navigateByUrl('/agent-home/viewcredits/'+id)
}


geler_demander(loan:any)
{
    loan.loan_statut=-1;
    this.credit_service.update_credits(loan.id,loan).subscribe({
      next:(val)=>{
          this.get_credits();
            console.log(loan)
      },
      error:console.log
    })
}

}
/*
 if(!this.is_man){
          res.forEach(element => {
            if(element.loan_statut==1)      tab_loans.push(element)
            else if(element.loan_statut==2)  tab_loans1.push(element)
            else if(element.loan_statut==3)  tab_loans2.push(element)
            else if(element.loan_statut==4)  tab_loans3.push(element)
            else if(element.loan_statut==5)  tab_loans4.push(element) });
        }
        else
        {
          res.forEach(element => {
            if(element.recommending_agent==1){
              if(element.loan_statut==1)      tab_loans.push(element)
              else if(element.loan_statut==2)  tab_loans1.push(element)
              else if(element.loan_statut==3)  tab_loans2.push(element)
              else if(element.loan_statut==4)  tab_loans3.push(element)
              else if(element.loan_statut==5)  tab_loans4.push(element)
            }
             });
        }

*/