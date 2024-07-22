import { Component, Input } from '@angular/core';
import { IBook } from '../../interfaces/IBook.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input('book') book: IBook = {};
  isActive: boolean = false;

  constructor(private route: Router){}

  goToPage(id: number){
    this.route.navigate(['/details/', id])
  }
}
