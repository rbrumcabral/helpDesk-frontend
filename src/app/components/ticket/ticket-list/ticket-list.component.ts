import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getPriorityString } from '../../../models/enums/ticketPriority.enum';
import { getStatusString } from '../../../models/enums/ticketStatus.enum';
import { Ticket } from '../../../models/ticket';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, RouterLink, MatRadioModule, MatTabsModule],
  providers: [ToastrService]
})
export class TicketListComponent {
  displayedColumns: string[] = ['id', 'title', 'client', 'technician', 'openedDate', 'priority', 'status', 'acoes'];
  dataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  filterDataSource: MatTableDataSource<Ticket> = new MatTableDataSource();
  ELEMENT_DATA: Ticket[] = [];
  statusFilter = 'ALL';
  textFilter = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: TicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = (data: Ticket, filter: string): boolean => {
      console.log("Dentro da função predicate");
      const matchesText = Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(this.textFilter) || this.textFilter == ''
      );

      const matchesStatus = this.statusFilter == 'ALL' || data.status == this.statusFilter;

      return matchesText && matchesStatus;
    };

    this.toastrConfig();
    this.findAll();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onTabChanged(event: MatTabChangeEvent) {
    const selectedIndex = event.index;
    let list: Ticket[] = [];
    let status: string;

    switch (selectedIndex) {
      case 1:
        status = '0';
        break;
      case 2:
        status = '1';
        break;
      case 3:
        status = '2';
        break;
      default:
        status = 'ALL';
    }

    if (status == 'ALL') {
      list = this.ELEMENT_DATA;
    } else {
      this.ELEMENT_DATA.forEach(element => {
        if (element.status == status) {
          list.push(element);
        }
      })
    }

    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.applyFilter();
  }

  applyTextFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.textFilter = filterValue.trim().toLowerCase();
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.textFilter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  findAll() {
    this.service.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource(response);
        this.paginator.pageSize = 10;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        this.toastr.error("Erro ao buscar");
      }
    })
  }

  displayPriorityString(value: number): string {
    return getPriorityString(value);
  }

  displayStatusString(value: number): string {
    return getStatusString(value);
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

}


