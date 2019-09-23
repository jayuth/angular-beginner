import { Injectable } from '@angular/core';
import { IProduct } from './product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService{
  // web API url
  private productUrl = 'api/products/products.json';

  // inject http service because we want to use this service
  // Angular injects HttpClient instance to a http private variable
  constructor(private http: HttpClient){}

  // we don't have any property here because we use this class to encapsulate data feature
  getProducts(): Observable<IProduct[]>{
    // map the raw http response to the specified type such as IProduct[] array 
      return this.http.get<IProduct[]>(this.productUrl).pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // this function will return only one item so we defined a return type as IProduct (object), not IProduct[] array
  getProductById(id: number): Observable<IProduct | undefined>{
    // call getProducts() methos to get a list of products
    return this.getProducts()
      .pipe(
        // syntax: map((any_variable_name, data type of variable we want to filter))
        map((products: IProduct[]) => products.find(p => p.productId === id))
      );
  }

  private handleError(err: HttpErrorResponse){
    let errorMessage = '';

    if(err.error instanceof ErrorEvent){
      // a client-side or network error occured.
      errorMessage = `An error occured: ${ err.error.message }`;
    } else{
      // the backend returned an unsucessful reponse code
      // the response body may contain clues as to what went wrong
      errorMessage = `Server returned code: ${ err.status }, error message is: ${ err.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}