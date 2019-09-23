import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    // next method provides information about paramters (e.g. product id) that include in our URL
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // the ProductDetail route contains 2 segments: products/id. We read this as an array index as 0,1,... 
    // So, index 0 refers to product and 1 for id.
    let id = +next.url[1].path; // extract only id parameter from the URL
    if(isNaN(id) || id < 1){ // isNan verifies whether a passed-in parameter is a number
      alert("Invalid product Id"); 
      this.router.navigate(['/products']);
      return false;
    };  
      return true;
  }
}
