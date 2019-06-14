import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ApiService } from './services/api.service';
import { PaginationApiService } from './services/pagination-api.service';

@NgModule({
  imports: [
    HttpModule
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ApiService,
        PaginationApiService
      ]
    }
  }
}
