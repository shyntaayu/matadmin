import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Disabilitas } from 'app/model/disabilitas';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDisabilitasComponent } from './add-disabilitas/add-disabilitas.component';

@Component({
  selector: 'app-disabilitas',
  templateUrl: './disabilitas.component.html',
  styleUrls: ['./disabilitas.component.css']
})
export class DisabilitasComponent implements OnInit {

  DisabilitasData: any = [];
  dataSource: MatTableDataSource<Disabilitas>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['id', 'kategori', 'created_at', 'action'];

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

  deleteDisabilitas(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.disabilitasApi.DeleteDisabilitas(e.id).subscribe()
    }
  }

  openDialog(param) {
    let dialogRef;
    if (param) {
      dialogRef = this.dialog.open(AddDisabilitasComponent, {
        data: {
          kategori: param
        },
        width: '400px',
        disableClose: true
      });
    } else {
      dialogRef = this.dialog.open(AddDisabilitasComponent,{
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
