import { LocalstorageName } from './../constants/localstorage-name.constant';
import { Client } from './../models/client.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { reject } from 'q';

@Injectable()
export class ClientService {

  constructor(private auth: AuthService, private router: Router) { }


  saveClient(client: Client) {
    return new Promise((resolve, reject) => {
      const a = {
        items: []
      };
      const clientsStorage = localStorage.getItem(LocalstorageName.CLIENTS);
      if (clientsStorage) {
        let clients: any = {};
        clients = JSON.parse(clientsStorage);
        if (clients) {
          clients.items.push(client);
          localStorage.setItem(LocalstorageName.CLIENTS, JSON.stringify(clients));
          if (clients.items.length) {
            resolve(true);
          }
        }
      } else {
        a.items.push(client);
        localStorage.setItem(LocalstorageName.CLIENTS, JSON.stringify(a));
        if (a.items.length) {
          resolve(true);
        }
      }
    });
  }

  getClients() {
    return new Promise((resolve, reject) => {
      const clientsStorage = localStorage.getItem(LocalstorageName.CLIENTS);
      if (clientsStorage) {
        let clients: any = {};
        clients = JSON.parse(clientsStorage);
        if (clients.items) {
          resolve(clients.items);
        } else {
          resolve([])
        }
      } else {
        resolve([])
      }
    });
  }
}
