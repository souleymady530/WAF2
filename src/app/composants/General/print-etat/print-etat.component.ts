import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditService } from 'src/app/services/Credit/credit.service';
import { EcheanceService } from 'src/app/services/Echeance/echeance.service';

@Component({
  selector: 'app-print-etat',
  templateUrl: './print-etat.component.html',
  styleUrls: ['./print-etat.component.css']
})
export class PrintEtatComponent implements  OnInit
{
  is_ok=false
  loan!:any
  credit_id=0
  to_day=this.datePipe.transform(new Date(),'yyyy-MM-dd')
  tab_echeance=new Array()
  constructor(private credits$:CreditService,private router:ActivatedRoute,private datePipe:DatePipe,private echeance$:EcheanceService){
    this.credit_id=this.router.snapshot.params['id']
    this.credits$.get_by_id(this.credit_id).subscribe({
      next:(loan)=>{
        this.save_loan(loan)
        this.echeance$.get_echeance().subscribe({
          next:(val)=>{
            val.forEach(element => {
              if(element.credit_id==loan.id){
                this.save_tab(element.echeance);
                this.save_is_ok();
                  setTimeout(this.print,3000);
              } 
            });
            
          },
          error:console.log
        })
      },
      error:console.log
    })

  }

  save_is_ok(){
    this.is_ok=true
  }
save_loan(loan){
  this.loan=loan
}
  save_tab(all){
    this.tab_echeance=new Array();
    this.tab_echeance=all
  }

  ngOnInit(): void {
    
  }

  print(){
    window.print() 
  }
}
