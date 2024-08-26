import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Technician } from '../../../models/technician';
import {TechnicianService } from '../../../services/technician.service';
import { ToastrService } from 'ngx-toastr';
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'technician-list',
  templateUrl: './technician-list.component.html',
  styleUrl: './technician-list.component.css',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule],
  providers: [ToastrService]
})

export class TechnicianListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource: MatTableDataSource<Technician> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: TechnicianService,
    private toastr: ToastrService
  ) { 
    this.toastrConfig();
   }

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  findAll(){
    this.service.findAll().subscribe({
    next: (response) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    },
    error: (error) => {
      this.toastr.error("Erro ao buscar");
    }
  })}

  toastrConfig(){
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true; 
    this.toastr.toastrConfig.progressBar = true;
  }
}