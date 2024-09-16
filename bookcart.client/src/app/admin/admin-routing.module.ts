import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { ManageBooksComponent } from './pages/manage-books/manage-books.component';
import { DeleteBookComponent } from './pages/delete-book/delete-book.component';

const routes: Routes = [
  {
    path: 'books',
    children: [
      {
        path: 'new',
        component: BookFormComponent
      },
      {
        path: 'edit/:id',
        component: BookFormComponent
      },
      {
        path: 'delete/:id',
        component: DeleteBookComponent
      },
      {
        path: '',
        component: ManageBooksComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'books'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
