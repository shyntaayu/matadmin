import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Disabilitas } from 'app/model/disabilitas';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from 'app/services/api.service';

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

  constructor(private disabilitasApi: ApiService) {
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

  deleteDisabilitas(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.disabilitasApi.DeleteDisabilitas(e.id).subscribe()
    }
  }

}
