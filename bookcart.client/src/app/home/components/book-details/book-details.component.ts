import { Component, OnInit } from '@angular/core';
import { IBook } from '../../interfaces/IBook.interface';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
})
export class BookDetailsComponent implements OnInit {
  public book: IBook = {};
  public bookId: number | null = null;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.bookId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((param) => {
      this.activatedRoute.params.subscribe((params) => {
        this.bookId = params['id'];
        this.getBookDetails();
      });
    });
  }

  getBookDetails() {
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((book: IBook) => {
        this.book = book;
      });
    } else {
      console.log('no hay id');
    }
  }
}
