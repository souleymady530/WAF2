import { AfterViewInit, Component, ViewChild,OnInit } from '@angular/core';
  import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
 import { SnackbarService } from 'src/app/components/core/snackbar.service';  
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManagerService } from 'src/app/services/local-services/manager.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-manager-lister',
  templateUrl: './manager-lister.component.html',
  styleUrls: ['./manager-lister.component.css']
})
export class ManagerListerComponent 
{
  is_light_mode=true

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
    this.is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false
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

   

  open_edit_form(data:any)
  {
     
    this.route.navigateByUrl('dashboard/editmanager/'+data.user.username)
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


  active_count(id:number,event){
    
    this.man_service.get_by_id(id).subscribe({
      next:(man)=>{
         
        man.is_autorise=man.is_autorise? false:true
         
        this.man_service.update_man(id,man).subscribe({
          next:()=>console.log('requete effectuee avec succes'),
          error:()=>console.log('requete non effectuee'),
          complete:()=>console.log('Fin de requete'),
        })
        
      },
      error:console.log,
      complete:()=>console.log("Fin de requete")
    })
  }
}
