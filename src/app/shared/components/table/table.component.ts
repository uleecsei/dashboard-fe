import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { ISignUpResponse } from '../../../core/interfaces/signup-response.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements AfterViewInit {
  @Input() tableData!: ISignUpResponse[]
  displayedColumns = ['email', 'googleId', 'id', 'isAdmin', 'name', 'password'];
  dataSource = new MatTableDataSource(this.tableData);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.dataSource.data = this.tableData
    this.dataSource.paginator = this!.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  onRowClicked(row: any) {
    console.log('Row clicked: ', row.id);
  }

}
