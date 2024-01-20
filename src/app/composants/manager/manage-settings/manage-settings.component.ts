import { Component, OnInit,AfterViewInit, ViewChild  } from '@angular/core';
import { SecteurServicesService } from 'src/app/services/local-services/secteur-services.service';
import { SoussecteurServices } from 'src/app/services/local-services/sous-secteur-services.service';
import * as XLSX from 'xlsx';
import { AgentService } from 'src/app/services/agent/agent.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
 import { SnackbarService } from 'src/app/components/core/snackbar.service';  
 import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ManagerService } from 'src/app/services/local-services/manager.service';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import { FormuleServicesService } from 'src/app/services/local-services/formule-services.service';
import { AddEditLevelComponent } from '../../add-edit-level/add-edit-level.component';
import { Formule2ServiceService } from 'src/app/services/local-services/formule2-service.service';
import { AddEditLevelFormule2Component } from '../../add-edit-level-formule2/add-edit-level-formule2.component';


@Component({
  selector: 'app-manage-settings',
  templateUrl: './manage-settings.component.html',
  styleUrls: ['./manage-settings.component.css']
})
export class ManageSettingsComponent implements OnInit
 {  
  user=JSON.parse(localStorage.getItem("currentUser"));
  img_name="Fichier courant:"
  errors_tab!:any
  is_file_imported=false
  title = 'NGXlsx';
  tableau=new Array()
  id_tableau=new Array()
  sheet_name_tab=new Array()
  res=1;
  all_secteur_in_bd!:Array<any>
  formule_1!:any
  formule_2!:any
  agent_form!:FormGroup;
  manager_data={
    username:"",
      email:'',
      first_name:'',
      last_name:'',
      password:'',
      password2:'',
      gender:'',
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:'',
      is_autorised:'',
      created_at:Date,
  }

  man_form=this.form_builder.group(
    {
      username:[this.manager_data.username,[Validators.minLength(4),Validators.maxLength(100)]],
      email:[this.manager_data.email,[Validators.email]],
      first_name:[this.manager_data.first_name,[Validators.minLength(2),Validators.maxLength(100)]],
      last_name:[this.manager_data.last_name,[ Validators.minLength(2),Validators.maxLength(100)]],
      password:[this.manager_data.password,[ Validators.minLength(8),Validators.maxLength(100)]],
      password2:[this.manager_data.password,[ Validators.minLength(8),Validators.maxLength(100)]],
      gender:this.manager_data.gender,
      is_agent:false,
      is_manager:true,
      d_naissance:Date,
      phone_number:[this.manager_data.phone_number,[ Validators.minLength(2),Validators.maxLength(20)]],
      is_autorised:this.manager_data.is_autorised,
      created_at:Date,
    }
  )

   
  displayedColumns: string[] = [
      "secteurs" ,
      "sous_secteurs" ,
      
       'actions',
     ];
     data_source!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
  private data2:any

  is_light_mode=localStorage.getItem("theme_mode")==='light'? true:false


constructor(private form_builder:FormBuilder,private secteur:SecteurServicesService,private sous_secteur:SoussecteurServices,
  public matdialog:MatDialog,
  private man_service:ManagerService,
  private snacbar:SnackbarService,
  private forumle_1$:FormuleServicesService,
  private formule_2$:Formule2ServiceService,
 
  private route:Router){
 
   this.secteur.get_secteurs().subscribe({
    next:(res)=>{
      this.all_secteur_in_bd=res
      for(let i=0;i<res.length;i++)
      {
        let secteur=Object.keys(res[i])[0]
        this.sheet_name_tab.push(secteur)
         this.tableau.push(Object.values(res[i][secteur]).join(','))
        this.id_tableau.push(res[i].id)
        //console.log(res[i].id)
      }
    }
  })

  this.init_profile();
  this.init_formule();
  
}


init_profile(){
  this.man_service.get_by_id(1).subscribe({
    next:(res)=>{
      //console.log(res)
      this.manager_data.username=res.user.username,
      this.manager_data.email=res.user.email,
      this.manager_data.first_name=res.user.first_name,
      this.manager_data.last_name=res.user.last_name,
      this.manager_data.password=res.user.password,
      this.manager_data.password2=res.user.password,
      this.manager_data.gender=res.gender,
      this.manager_data.d_naissance=res.d_naissance,
      this.manager_data.phone_number=res.phone_number,
      this.manager_data.is_autorised=res.user.is_autorise
    }
   })
}

init_formule(){

  //initialisation formule 1
this.forumle_1$.get_formule().subscribe({
  next:(formule)=>{
    this.formule_1=formule
    //console.log(this.formule_1)
  }
  
})

this.formule_2$.get_formule().subscribe({
  next:(formule)=>{
    this.formule_2=formule
    //console.log(this.formule_1)
  }
  
})


//initialisation formule 2


}


applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.data_source.filter = filterValue.trim().toLowerCase();

  if (this.data_source.paginator) {
    this.data_source.paginator.firstPage();
  }
}
submit_add_formule_1()
{
      
}

 

open_edit_form(data:any,type:number)
{
  
   const data2={  
    "name":data.name,
    "Pret":data.loan_limit,
    "rateOne":data.rateOne,
    "rateTwo":data.rateTwo,
    "rateThree":data.rateThree,
    "rateNormal":data.rateNormal,
    "DurationInMounth":data.DurationInMounth,
    "DurationInWeekOne":data.DurationInWeekOne,
    "DurationInWeekTwo":data.DurationInWeekTwo,
    "DurationInWeekThree":data.DurationInWeekThree,
    "DurationInWeekNormal":data.DurationInWeekNormal,
  }

  if(type==1)
  {
    //console.log(data)
   
  

    //edit for formule 1
    const dialogRef= this.matdialog.open(AddEditLevelFormule2Component,{data,position: {right:'10px', top: '10px'} });
    dialogRef.afterClosed().subscribe(
      {
          next:(val)=>{
            if(val)
            {
              this.init_formule();
            }
          },
          error:console.log
      }
    )
  }
  else{
  // console.log(type)
    //edit for formule2
    const dialogRef= this.matdialog.open(AddEditLevelFormule2Component,{data});
        dialogRef.afterClosed().subscribe(
          {
              next:(val)=>{
                if(val)
                {
                  this.init_formule();
                }
              },
              error:console.log
          }
        )

    
  }
  //this.route.navigateByUrl('dashboard/editmanager/'+data.id)
}
 
delete_level(id:number,type:number){
  if(type==1){
      this.forumle_1$.delete_formule(id).subscribe({
        next:()=>{console.log('ok')},
        error:console.log,
        complete:()=>{console.log('fin de requete')}
      })
  }
  else{
    this.formule_2$.delete_formule(id).subscribe({
      next:()=>{console.log('ok')},
      error:console.log,
      complete:()=>{console.log('fin de requete')}
    })
  }
}
add_secteur(){

}
open_edit_form_secteur(data:any){

}
ngOnInit(): void {
  
}
 


      
    open_add_form(type)
    {
      if(type==1)
      {
         

        const dialogRef= this.matdialog.open(AddEditLevelComponent);
        dialogRef.afterClosed().subscribe(
          {
              next:(val)=>{
                if(val)
                {
                  this.init_formule();
                }
              },
              error:console.log
          }
        )
      }
      else{
        const dialogRef= this.matdialog.open(AddEditLevelFormule2Component);
        dialogRef.afterClosed().subscribe(
          {
              next:(val)=>{
                if(val)
                {
                  this.init_formule();
                }
              },
              error:console.log
          }
        )
      }
    }
    read(e:any){
      var fichier=e.target.files[0]
      // console.log(e.target.result)
      var reader = new FileReader();
      this.tableau=new Array();
      this.sheet_name_tab=new Array();
      reader.onload = (e)=>(this.onread(e),this.tableau,this.sheet_name_tab,this.is_file_imported)
      reader.readAsBinaryString(fichier);
    }
  
  onread(e:any) 
    {
        var data = e.target.result;
        var workbook = XLSX.read(data, {
                  type: 'binary'
              });
  
             
              var  sheetLength=workbook.SheetNames.length
              for(let i=0;i<sheetLength;i++)
              { 
                  var sheetname=workbook.SheetNames[i]
                  this.sheet_name_tab.push(sheetname)
                  var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheetname],{header: 1});
                   var sheet_data=new Array()
                  for(let j=0;j<arr.length;j++)
                  {
                    sheet_data.push(''+arr[j])
                   }         
                  this.tableau.push(sheet_data)                            
              }
              this.is_file_imported=true
               
          }


          supprimer(){
        
            // console.log(all)
             const doIt=JSON.stringify(this.all_secteur_in_bd)==='[]';
                  if(doIt==false)
                  {
      
                 
                    
                    this.all_secteur_in_bd.forEach(element => {
                      this.secteur.delete_secteur(element.id).subscribe(
                        {
                          next:()=>{
      
                          },
                          complete:()=>console.log('fin de requete')
                        }
                      )
                    });
                   
            }
           

           

            
        
      }

      importer()
      {
        
        if(this.tableau.length!=0 && confirm('Cette operation va supprimer les anciennes donnees pour les remplacer par les nouvelles'))
        {

         
       //vider ce qu il y a deja
      /* this.secteur.get_secteurs().subscribe({
        next:(all)=>{
        const doIt=JSON.stringify(all)==='[]';
          if(doIt==false)
          {
            this.supprimer(all);
          }
        },
        complete:console.log
       })*/
          
       // this.supprimer(this.id_tableau);
       this.save_table()  
        
      }
    }
    
      save_table()
            {
        
              var data;
    
            for(let i=0;i<this.tableau.length;i++)
            {
                data=new Map()
                data[this.sheet_name_tab[i]]=Object.assign({},this.tableau[i])
                this.secteur.add_secteur(Object.assign({},data)).subscribe({
                  next:()=>{
                    console.log('ok')
    
                  },
                  complete:()=>console.log('Requete terminee')
                })
            }   
          } 

}
