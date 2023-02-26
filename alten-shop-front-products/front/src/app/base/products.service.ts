import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];

  getProducts() {
    return this.http.get<any>('../assets/products.json')
      .toPromise()
      .then(res => <Product[]>res.data)
      .then(data => data);
  }

  constructor(private http: HttpClient) { }
}
