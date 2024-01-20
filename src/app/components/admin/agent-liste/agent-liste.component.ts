import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { AgentService } from 'src/app/services/local-services/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddEditAgentComponent } from '../../add-edit-agent/add-edit-agent.component';
import { SnackbarService } from '../../core/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-liste',
  templateUrl: './agent-liste.component.html',
  styleUrls: ['./agent-liste.component.css'],
   
 })
export class AgentListeComponent implements OnInit
{
  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
  agent_form!:FormGroup;
   displayedColumns: string[] = [
      "username" ,
      "first_name" ,
      "last_name" ,
      "email" , 
      "nic_number" ,
      "phone_number" ,
      "location",
      'actions',
     ];
     data_source!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private matdialog:MatDialog,private agent_service:AgentService,private snacbar:SnackbarService,private router:Router)
  {
    
  }
ngOnInit(): void {
  this.get_agents();

}

  get_agents()
  {
    this.agent_service.get_agents().subscribe(
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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data_source.filter = filterValue.trim().toLowerCase();

    if (this.data_source.paginator) {
      this.data_source.paginator.firstPage();
    }
  }

  open_add_form()
  {
    const dialogRef= this.matdialog.open(AddEditAgentComponent);
    dialogRef.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.get_agents();
            }
          },
          error:console.log
      }
    )
  }

  open_edit_form(data:any)
  {
     this.router.navigateByUrl("dashboard/editagent/"+data)
  }

  delete_agent(id:number)
  {
    console.log("Hello")
    if(confirm("Confirmer la suppression"))
    {
      this.agent_service.delete_agent(id).subscribe(
        {
          next:(val)=>
          {
             
            this.snacbar.openSnackBar("Agent deleted","DONE")
            this.get_agents();
          },
          error:console.log
        }
      )
    }

   
       
     
    
  }
  
  add_agent(){
    this.router.navigateByUrl('dashboard/addagent')
    }
}
