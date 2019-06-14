import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationInterface } from 'src/interfaces';

@Injectable()
export class PaginationApiService
{

  private _pagination: BehaviorSubject<PaginationInterface> = new BehaviorSubject(null);
  public pagination: Observable<PaginationInterface> = this._pagination.asObservable();

  constructor(private http: Http)
  {
  }

  fetchPaginationInfo(): Observable<PaginationInterface>
  {
    return this.http.get('https://reqres.in/api/users?page=1')
      .pipe(map(response =>
      {
        return {
          total_pages: response.json().total_pages,
          per_page: response.json().per_page,
          total: response.json().total,
          page: response.json().page
        };
      }));
  }

  setPagination(response)
  {
    const paginationInfo = {
      total_pages: response.json().total_pages,
      per_page: response.json().per_page,
      total: response.json().total,
      page: response.json().page
    };
    this._pagination.next(paginationInfo)
  }
}
