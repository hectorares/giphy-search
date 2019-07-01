import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class GifsService {
    path = "http://api.giphy.com/v1/gifs";
    params = new HttpParams()

   

    constructor(private http: Http, private router: Router, private httpClient: HttpClient) { 
        this.params = this.params.append('api_key', environment.api_key);
        this.params = this.params.append('limit', '20');
        this.params = this.params.append('offset', '5');
        this.params = this.params.append('rating', 'g');
    }

    getTrending = async () => {

        return new Promise((resolve, reject) => {
            this.httpClient.get(this.path + '/trending', { params: this.params }).subscribe((res: any) => {
                console.log('res_____:', res);
                resolve(res.data);
            }, (err: any) => {
                console.log('errr_', err);
                reject(err.message ? err.message : 'Ocurrío un error al consultar la información')
            });
        })

    }

    search = async (query: string) => {
        this.params = this.params.append('q', query);

        return new Promise((resolve, reject) => {
            this.httpClient.get(this.path + '/search', { params: this.params }).subscribe((res: any) => {
                console.log('res_____:', res);
                resolve(res.data);
            }, (err: any) => {
                console.log('errr_', err);
                reject(err.message ? err.message : 'Ocurrío un error al consultar la información')
            });
        })

    }

}





