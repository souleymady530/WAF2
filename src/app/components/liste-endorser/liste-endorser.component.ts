import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
 import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
 import { SnackbarService } from '../core/snackbar.service';
 import { AddEditEndorserComponent } from '../add-edit-endorser/add-edit-endorser.component';
import { EndorserService } from 'src/app/services/Endorser/endorser.service';
 
@Component({
  selector: 'app-liste-endorser',
  templateUrl: './liste-endorser.component.html',
  styleUrls: ['./liste-endorser.component.css']
})
export class ListeEndorserComponent implements OnInit
{

   
  endorser_form!:FormGroup;
  displayedColumns: string[] = [
       
      "first_name" ,
      "last_name" ,
      "phone_number" ,
      "location",
      'actions',
     ];
     data_source!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private matdialog:MatDialog,private endorser_service:EndorserService,private snacbar:SnackbarService)
  {
    
  }
ngOnInit(): void {
  this.get_endorsers();
}

  get_endorsers()
  {
    this.endorser_service.get_endorsers().subscribe(
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
    const dialogRef= this.matdialog.open(AddEditEndorserComponent);
    dialogRef.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.get_endorsers();
            }
          },
          error:console.log
      }
    )
  }

  open_edit_form(data:any)
  {
     data.first_name=data.user.first_name
      data.last_name=data.user.last_name
      data.profession=data.profession
      data.nic_image=data.nic_image
      data.gender=data.gender
      data.d_naissance=data.d_naissance
      data.address=data.location.address
      data.state=data.location.state
      data.city=data.location.city
      data.point=data.location.point

     const dialogRef=this.matdialog.open(AddEditEndorserComponent,{
        data,
     });
     

     dialogRef.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.get_endorsers();
            }
          },
          error:console.log
      }
    )
  }

  delete_endorser(id:number)
  {
    console.log("Hello")
    if(confirm("Confirmer la suppression"))
    {
      this.endorser_service.delete_endorser(id).subscribe(
        {
          next:(val)=>
          {
             
            this.snacbar.openSnackBar("endorser deleted","DONE")
            this.get_endorsers();
          },
          error:console.log
        }
      )
    }
       
     
    
  }
  
}
/*
{
        "id": "number",
        "location": {
          "address": "string",
          "city": "string",
          "state": "string",
          "point": "string"
        },
        "first_name": "string",
        "last_name": "string",
        "gender": "string",
        "nic_image": "string",
        "phone_number": "string",
        "profession": "string",
        "created_date": "string"
      }
*/