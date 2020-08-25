import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Template } from '../models/templates/template';
import { Result } from '../models/result';

@Injectable()
export class TemplatesService {
  private _url = 'api/templates';

  constructor(private http: HttpClient) {}

  get(
    skip: number,
    take: number,
    filter?: string
  ): Observable<Result<Template[]>> {
    let params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString());

    if (filter) {
      params = params.set('filter', filter);
    }

    const options = {
      params: params,
    };

    return this.http.get<Result<Template[]>>(this._url, options);
  }

  getById(id: string): Observable<Result<Template>> {
    return this.http.get<Result<Template>>(`${this._url}/${id}`);
  }

  add(template: Template): Observable<Result<Template>> {
    return this.http.post<Result<Template>>(this._url, template);
  }

  update(template: Template): Observable<Result<Template>> {
    return this.http.put<Result<Template>>(this._url, template);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this._url}/${id}`);
  }
}
