import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from '../../../models/client';
import { Technician } from '../../../models/technician';
import { Ticket } from '../../../models/ticket';
import { ClientService } from '../../../services/client/client.service';
import { TechnicianService } from '../../../services/technician/technician.service';
import { TicketService } from '../../../services/ticket/ticket.service';

@Component({
  selector: 'app-ticket-read',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, MatFormField, ReactiveFormsModule, MatRadioModule, MatSelectModule, NgFor],
  providers: [ToastrService],
  templateUrl: './ticket-read.component.html',
  styleUrl: './ticket-read.component.css'
})
export class TicketReadComponent {

  form: FormGroup;

  ticket: Ticket = {
    priority: '',
    status: '',
    title: '',
    description: '',
    technician: '',
    client: '',
  }

  clients: Client[] = [];
  technicians: Technician[] = [];

  constructor(
    private service: TicketService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private technicianService: TechnicianService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.toastrConfig();
    this.findAllClients();
    this.findAllTechnicians();
    this.form = this.fb.group({
      title: [{ value: '', disabled: true}],
      description: [{ value: '', disabled: true}],
      technician: [{ value: '', disabled: true}],
      client: [{ value: '', disabled: true}],
      priority: [{ value: '', disabled: true}],
      status: [{ value: '', disabled: true}]
    });
    this.findById();
  }

  toastrConfig() {
    this.toastr.toastrConfig.timeOut = 4000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.progressBar = true;
  }

  findAllClients() {
    this.clientService.findAll().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: (error) => {
        this.toastr.error("Erro ao buscar");
      }
    });
  }

  findAllTechnicians() {
    this.technicianService.findAll().subscribe({
      next: (response) => {
        this.technicians = response;
      },
      error: (error) => {
        this.toastr.error("Erro ao buscar");
      }
    });
  }

  findById() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    this.service.findById(id).subscribe({
      next: (response) => {
        this.ticket = response;
        this.fillForm();
      },
      error: (error) => {
        this.toastr.error("Falha ao recuperar chamado", "Erro");
      }
    });
  }

  fillForm() {
    console.log("Chega no fill form: ", this.ticket);
    this.form.get('title').setValue(this.ticket.title);
    this.form.get('description').setValue(this.ticket.description);
    this.form.get('status').setValue(this.ticket.status);
    this.form.get('priority').setValue(this.ticket.priority);
    this.form.get('technician').setValue(this.ticket.technician);
    this.form.get('client').setValue(this.ticket.client);
  }
}
