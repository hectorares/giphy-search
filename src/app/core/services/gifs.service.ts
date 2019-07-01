import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/operator/map';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable()
export class GifsService {
    path = 'http://api.giphy.com/v1/gifs';



    constructor(private http: Http, private router: Router, private httpClient: HttpClient) {

    }

    getTrending = async () => {
        let params = new HttpParams()

        params = params.append('api_key', environment.api_key);
        params = params.append('limit', '20');
        params = params.append('offset', '5');
        params = params.append('rating', 'g');

        return new Promise((resolve, reject) => {
            this.httpClient.get(this.path + '/trending', { params: params }).subscribe((res: any) => {
                resolve(res.data);
            }, (err: any) => {
                reject(err.message ? err.message : 'Ocurrío un error al consultar la información')
            });
        })

    }

    search = async (query: string) => {
        let params = new HttpParams()

        params = params.append('api_key', environment.api_key);
        params = params.append('limit', '20');
        params = params.append('offset', '5');
        params = params.append('rating', 'g');
        params = params.append('q', query);

        return new Promise((resolve, reject) => {
            this.httpClient.get(this.path + '/search', { params: params }).subscribe((res: any) => {
                resolve(res.data);
            }, (err: any) => {
                reject(err.message ? err.message : 'Ocurrío un error al consultar la información')
            });
        })

    }

}





