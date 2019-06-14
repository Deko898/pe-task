import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { UserInterface } from 'src/interfaces';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class UsersResolver implements Resolve<UserInterface[]> {

  constructor(private apiService: ApiService)
  {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserInterface[]>
  {
    const page: number = route.queryParams['page'] || 1;
    return this.apiService.fetchUsers(page);
  }

}
