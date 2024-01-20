import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
import { AddEditManagerComponent } from '../../add-edit-manager/add-edit-manager.component';
 import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
 import { SnackbarService } from '../../core/snackbar.service';
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManagerService } from 'src/app/services/local-services/manager.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent {
  agent_form!:FormGroup;
  displayedColumns: string[] = [
      "username" ,
      "first_name" ,
      "last_name" ,
      "email" , 
      "is_autorise" ,
      "phone_number" ,
       'actions',
     ];
     data_source!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private matdialog:MatDialog,private man_service:ManagerService,private snacbar:SnackbarService,
    private route:Router)
  {
    
  }
ngOnInit(): void {
  this.get_man();
}

  get_man()
  {
    this.man_service.get_man().subscribe(
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
    const dialogRef= this.matdialog.open(AddEditManagerComponent);
    dialogRef.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.get_man();
            }
          },
          error:console.log
      }
    )
  }

  open_edit_form(data:any)
  {
    this.route.navigateByUrl('dashboard/editmanager/'+data.id)
  }

  delete_agent(id:number)
  {
    console.log("Hello")
    if(confirm("Confirmer la suppression"))
    {
      this.man_service.delete_man(id).subscribe(
        {
          next:(val)=>
          {
            this.snacbar.openSnackBar("Agent deleted","DONE")
            this.get_man();
          },
          error:console.log
        }
      )
    }    
  }
  redirect_to_add(){
    this.route.navigateByUrl('dashboard/addmanager')
  } 
}
