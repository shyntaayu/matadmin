import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Disabilitas } from 'app/model/disabilitas';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDisabilitasComponent, SnackBarComponent } from './add-disabilitas/add-disabilitas.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteDisabilitasComponent } from './delete-disabilitas/delete-disabilitas.component';

@Component({
  selector: 'app-disabilitas',
  templateUrl: './disabilitas.component.html',
  styleUrls: ['./disabilitas.component.css']
})
export class DisabilitasComponent implements OnInit {

  DisabilitasData: any = [];
  dataSource: MatTableDataSource<Disabilitas>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'kategori', 'action'];

  constructor(private disabilitasApi: ApiService, private dialog: MatDialog) {
    this.getData();
  }

  getData() {
    this.disabilitasApi.GetAllDisabilitas().subscribe(data => {
      this.DisabilitasData = data.data;
      console.log(data)
      this.dataSource = new MatTableDataSource<Disabilitas>(this.DisabilitasData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })
  }

  ngOnInit() { }

  deleteDisabilitas(index: number, e): void {
    const dialogRef = this.dialog.open(DeleteDisabilitasComponent, {
      width: '300px',
      data: { index: index, e: e }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getData();
    });
  }

  openDialog(param) {
    let dialogRef;
    if (param) {
      dialogRef = this.dialog.open(AddDisabilitasComponent, {
        data: {
          param
        },
        width: '400px',
        disableClose: true
      });
    } else {
      dialogRef = this.dialog.open(AddDisabilitasComponent, {
        width: '400px',
        disableClose: true
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      console.log(`Dialog result: ${result}`);
    });
  }

}