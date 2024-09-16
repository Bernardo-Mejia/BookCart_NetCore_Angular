import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { DeleteBookComponent } from './pages/delete-book/delete-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../Material/material.module';


@NgModule({
  declarations: [
    BookFormComponent,
    ManageBooksComponent,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AdminModule { }
