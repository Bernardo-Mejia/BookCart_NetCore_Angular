import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICategoriesList } from '../interfaces/ICategoriesList.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  baseURL: string = 'https://localhost:7186/api/book';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategoriesList[]> {
    return this.http.get<ICategoriesList[]>(`${this.baseURL}/GetCategoriesList`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
