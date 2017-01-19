import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable }     from 'rxjs/Observable';

import { Member } from './member'

@Injectable()
export class MemberService {
    private memberUrl = '/api/members';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });

    constructor (private http: Http){}

    getMembers(roomId?: number): Observable<Member[]> {
      let params = new URLSearchParams();
      if(roomId){
        params.set('roomId', roomId.toString());
      }
      return this.http
                 .get(this.memberUrl, { search: params})
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    get(id: number): Observable<Member> {
      const url = `${this.memberUrl}/${id}`;
      return this.http
                 .get(url)
                 .map(this.extractData)
                 .catch(this.handleError);
    }

    create (name: string, roomId: number): Observable<Member[]> {
      return this.http
                 .post(this.memberUrl, JSON.stringify({Name: name, RoomId: roomId}), this.options)
                 .catch(this.handleError);
    }

    update (member: Member): Observable<Member[]> {
      const url = `${this.memberUrl}/${member.Id}`;
      return this.http
                 .put(url, member, this.options)
                 .catch(this.handleError);
    }

    delete (id: number): Observable<Response> {
      const url = `${this.memberUrl}/${id}`;
            return this.http
                 .delete(url)
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
