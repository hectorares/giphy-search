import { GifsService } from './../core/services/gifs.service';
import { ClientService } from './../core/services/clients.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from './../core/models/client.model';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit {
  gifs: Gif;
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
  clients: Client[] = [];
  selectedClient: Client;
  transactions = [
    { name: 'Efectivo' },
    { name: 'Transferencia' }
  ];
  selectedTransaction;

  products: Product[] = [
    {
      amount: 0,
      value: 0,
      bonus: 0,
      available: 1,
    },
    {
      amount: 10,
      value: 10,
      bonus: 0,
      available: 35,
    },
    {
      amount: 30,
      value: 30,
      bonus: 35,
      available: 9661,
    },
    {
      amount: 50,
      value: 60,
      bonus: 10,
      available: 2456,
    },
    {
      amount: 100,
      value: 100,
      bonus: 0,
      available: 5,
    },
    {
      amount: 100,
      value: 125,
      bonus: 25,
      available: 2962,
    },
    {
      amount: 100,
      value: 130,
      bonus: 30,
      available: 5317,
    }
  ]
  constructor(private fb: FormBuilder, public gifsService: GifsService, public clientService: ClientService

  ) { }

  ngOnInit() {
    this.loadClients();
    this.loadTrending();
  }

  loadTrending() {
    this.gifsService.getTrending().then((data: Gif) => {
      console.log('response:', data);
      this.gifs = data;
    }, err => {
      console.log('Err:', err);
    })
  }

  loadClients() {
    this.clientService.getClients().then((data: Client[]) => {
      console.log(data);
      this.clients = data;
    }, err => {
      console.error('Error:', err);

    })
  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.selectedTransaction = null;
  }

  onChangeTransaction(deviceValue) {
    console.log(deviceValue);
  }

  toSell() {
    console.log('to sell');
    this.selectedTransaction = null;
    this.showNotification('top', 'center');
  }

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const color = 'warning';

    $.notify({
      icon: "notifications",
      message: "Recarga Exitosa!"

    }, {
        type: 'success',
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

}

export class Gif {
  embed_url: string;
  title: string;
}


export class Product {
  amount: number;
  value: number;
  available: number;
  bonus: number;
}