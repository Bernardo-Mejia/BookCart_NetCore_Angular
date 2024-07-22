import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { BookFilterComponent } from './components/book-filter/book-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../Material/material.module';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';


@NgModule({
  declarations: [
    HomeComponent,
    BookFilterComponent,
    BookCardComponent,
    BookDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    MaterialModule
  ],
  providers: [
    // BookService
  ]
})
export class HomeModule { }
