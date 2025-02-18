import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ShoppingCart } from '../../models/shoppingcart';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItemCount = 0;
  baseURL: string = 'https://localhost:7186/api/ShoppingCart/';

  constructor(private http: HttpClient) {}

  addBookToCart(userId: number, bookId: number) {
    return this.http.post<number>(
      this.baseURL + `addToCart/${userId}/${bookId}`,
      {}
    );
  }

  getCartItems(userId: number) {
    return this.http.get<ShoppingCart[]>(this.baseURL + userId).pipe(
      map((response: ShoppingCart[]) => {
        this.cartItemCount = response.length;
        return response;
      })
    );
  }

  removeCartItems(userId: number, bookId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}/${bookId}`, {});
  }

  deleteOneCartItem(userId: number, bookId: number) {
    return this.http.put<number>(this.baseURL + `${userId}/${bookId}`, {});
  }

  clearCart(userId: number) {
    return this.http.delete<number>(this.baseURL + `${userId}`, {});
  }

  setCart(oldUserId: number, newUserId: number) {
    return this.http
      .get(this.baseURL + `setShoppingCart/${oldUserId}/${newUserId}`, {})
      .pipe(
        map((response: any) => {
          this.cartItemCount = response;
          return response;
        })
      );
  }
}
