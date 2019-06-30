import { ClientService } from './../core/services/clients.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from './../core/models/client.model';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  form = this.fb.group({
    userNumber: ['', Validators.required],
    inmateNumber: ['', Validators.required],
    housingUnit: ['', Validators.required],
    callingProfile: ['', Validators.required],
    userGroup: ['', Validators.required],

    lastName: ['', Validators.required],
    middletName: [''],
    firstName: ['', Validators.required],
    country: ['', Validators.required],

    timeZone: ['', Validators.required],
    status: ['', Validators.required],
    lock: [false],
    lockPin: [''],
    credit: [0],
  });

  clientsload: Client[] = [
    {
      userNumber: '00001',
      inmateNumber: '49472',
      housingUnit: 'dos',
      callingProfile: 'indefinido',
      userGroup: '12',
      firstName: 'Héctor',
      lastName: 'Pérez',
      middletName: 'armando',
      country: 'México',
      status: 'active',
      lock: false,
      lockPin: '2232',
      credit: 560
    },
    {
      userNumber: '00002',
      inmateNumber: '4232332',
      housingUnit: 'dos',
      callingProfile: 'indefinido',
      userGroup: '13',
      firstName: 'Juan',
      lastName: 'Meneses',
      middletName: 'carlos',
      country: 'México',
      status: 'active',
      lock: false,
      lockPin: '2232',
      credit: 560
    }
  ];
  constructor(private fb: FormBuilder, public clientService: ClientService

  ) { }

  ngOnInit() {
    this.loadClients();
  }

  loadForm() {
    this.form = this.fb.group({
      userNumber: ['', Validators.required],
      inmateNumber: ['', Validators.required],
      housingUnit: ['', Validators.required],
      callingProfile: ['', Validators.required],
      userGroup: ['', Validators.required],

      lastName: ['', Validators.required],
      middletName: [''],
      firstName: ['', Validators.required],
      country: ['', Validators.required],

      timeZone: ['', Validators.required],
      status: ['', Validators.required],
      lock: [false],
      lockPin: [''],
      credit: [0],
    });
    this.loadClients();

  }
  loadClients() {
    this.clientService.getClients().then((data: Client[]) => {
      this.clients = data;
      if (this.clients && this.clients.length < 1) {
        this.clientsload.forEach(element => {
          this.clientService.saveClient(element);
        });
        this.loadClients();
      }
    }, err => {
      console.error('Error:', err);

    })
  }

  saveCLient() {
    this.clientService.saveClient(this.form.value).then(res => {
      $("#exampleModal").modal('hide');
      this.form.reset();
      this.loadForm();
    }, err => {
      console.error('error:', err);

    });
  }

}
