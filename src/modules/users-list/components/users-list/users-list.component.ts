import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { UserInterface, PaginationInterface } from '../../../../interfaces';
import { PaginationApiService } from 'src/modules/core/services/pagination-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit
{

  displayedColumns = ['first_name', 'last_name', 'email'];
  userList: UserInterface[] = [];
  pagesCount$: Observable<PaginationInterface>;

  constructor(private activatedRoute: ActivatedRoute,
    private paginatonService: PaginationApiService,
    private router: Router)
  {
  }

  ngOnInit()
  {
    this.activatedRoute.data.pipe(
      map(data => data.users)
    )
      .subscribe((users: UserInterface[]) =>
      {
        this.userList = users;
      });

    this.pagesCount$ = this.paginatonService.pagination;
  }

  pageChanged(event: PageEvent): void
  {
    let page: number = event.pageIndex + 1;
    this.router.navigate(['./'], { queryParams: { page } });
  }

  userSelected(user: UserInterface): void
  {
    this.router.navigate(['./user', user.id]);
  }
}
