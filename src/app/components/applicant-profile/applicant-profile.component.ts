import { Component ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.css']
})
export class ApplicantProfileComponent {

  constructor(
    private dialogRef:MatDialogRef<ApplicantProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any)
  {
    

  }


}
