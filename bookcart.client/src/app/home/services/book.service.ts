import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICategoriesList } from '../interfaces/ICategoriesList.interface';
import { IBook } from '../interfaces/IBook.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseURL: string = 'https://localhost:7186/api/book';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategoriesList[]> {
    return this.http
      .get<ICategoriesList[]>(`${this.baseURL}/GetCategoriesList`)
      .pipe(
        map((response: ICategoriesList[]) => {
          return response;
        })
      );
  }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>(this.baseURL);
  }

  getBookById(idBook: number | null): Observable<IBook> {
    return this.http.get<IBook>(`${this.baseURL}/${idBook}`);
  }
}
