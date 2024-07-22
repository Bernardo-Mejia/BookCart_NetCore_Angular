import { Component, Input, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ICategoriesList } from '../../interfaces/ICategoriesList.interface';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrl: './book-filter.component.css',
})
export class BookFilterComponent implements OnInit {
  @Input('category') category: any;
  categoryList!: ICategoriesList[];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getCategories().subscribe(
      (resCategories: ICategoriesList[]) => {
        console.log(resCategories)
        this.categoryList = resCategories;
      }
    );
  }
}
