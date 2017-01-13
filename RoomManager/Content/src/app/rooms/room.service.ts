import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { Room } from './room'

@Injectable()
export class RoomService {
    private roomUrl = '/api/room';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http){}

    getRooms(): Observable<Room[]> {
      return this.http
                 .get(this.roomUrl)
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    getRoom(id: number): Observable<Room> {
      const url = `${this.roomUrl}/${id}`;
      return this.http
                 .get(url)
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    search (term: string): Observable<Room[]> {
      let params = new URLSearchParams();
      params.set('filter', term);

      return this.http
                 .get(this.roomUrl, { search: params})
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    create (name: string): Observable<Room[]> {
      return this.http
                 .post(this.roomUrl, JSON.stringify({Name: name}), this.options)
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    private extractData(res: Response) {
      let body = res.json();
      return body || body.data || { };
    }

    private handleError (error: Response | any) {
      // In a real world app, we might use a remote logging infrastructure
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
}
