import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  errorMessage: string;
  imageWidth: number = 200;
  imageMargin: number = 2;
  // filteredProduct: IProduct[];
  // productName: string;
  // imageWidth: number = 50;
  // imageMargin: number = 2;
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    // extract id parameter from the Url
    const param = this.route.snapshot.paramMap.get('id');
    if (param){
      const id = +param;
      this.getProductById(id);
    }
  }

  getProductById(id: number) {
    // call the Product service to retrieve product data 
    // then Subscribe to get emitted items 
    this.productService.getProductById(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  /* my solution            
  performFilterById(id: string): void{
    this.filteredProduct = this.product.filter((product: IProduct) =>
    product.productId.toString() == id); 
    this.productName = this.filteredProduct[0].productName;
    console.log(this.productName);
  }             

  ngOnInit(): void{
    let id = this.route.snapshot.paramMap.get('id');
    this.productService.getProducts().subscribe({
      next: products => {
        this.product = products,
        this.performFilterById(id);
      }, 
      error: err => this.errorMessage = err
    });
  }
  */

 onBack(): void {
    // routes with code
    this.router.navigate(['/products']);
  }
}
