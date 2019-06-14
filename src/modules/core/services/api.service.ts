import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { UserInterface, PaginationInterface } from '../../../interfaces';
import { PaginationApiService } from './pagination-api.service';

@Injectable()
export class ApiService
{

  constructor(private http: Http, private paginationApiService: PaginationApiService)
  {
  }

  fetchUsers(page): Observable<UserInterface[]>
  {
    return this.http.get('https://reqres.in/api/users?page=' + page)
      .pipe(tap(response => this.paginationApiService.setPagination(response)), map(response => response.json().data));
  }

  fetchPaginationInfo(): Observable<PaginationInterface>
  {
    return this.paginationApiService.fetchPaginationInfo();
  }

  fetchUserById(id: number): Observable<UserInterface>
  {
    return this.http.get(`https://reqres.in/api/users/${id}`)
      .pipe(
        map(response => response.json()),
        map(json => json.data)
      );
  }

}
