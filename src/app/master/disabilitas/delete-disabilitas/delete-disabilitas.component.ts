import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Disabilitas } from 'app/model/disabilitas';
import { ApiService } from 'app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../add-disabilitas/add-disabilitas.component';

@Component({
  selector: 'app-delete-disabilitas',
  templateUrl: './delete-disabilitas.component.html',
  styles: []
})
export class DeleteDisabilitasComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(
    public dialogRef: MatDialogRef<DeleteDisabilitasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private disabilitasApi: ApiService,
    private _snackBar: MatSnackBar) {
  }

  delete(e) {
    this.disabilitasApi.DeleteDisabilitas(e.id).subscribe(result => {
      this._snackBar.openFromComponent(SnackBarComponent, {
        duration: 5 * 1000,
      });
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
