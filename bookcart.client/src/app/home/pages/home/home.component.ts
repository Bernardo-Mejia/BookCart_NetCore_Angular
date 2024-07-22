import { Component, OnInit } from '@angular/core';
import { IBook } from '../../interfaces/IBook.interface';
import { ICategoriesList } from '../../interfaces/ICategoriesList.interface';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  books: IBook[] = [];
  filteredBooks: IBook[] = [];
  category: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.bookService
      .getAllBooks()
      .pipe(
        switchMap((data: IBook[]) => {
          this.filteredBooks = data;
          return this.route.queryParams;
        })
      )
      .subscribe((params) => {
        this.category = params['category'];
        this.books = this.category
          ? this.filteredBooks.filter(
              (b: IBook) =>
                b.category?.toLowerCase() === this.category.toLowerCase()
            )
          : this.filteredBooks;
      });
  }
}
