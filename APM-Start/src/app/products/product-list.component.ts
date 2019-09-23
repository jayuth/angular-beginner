import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    // tie ProductService service to only ProductListComponent
    providers: [ProductService]
})

export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    showFilteredBy: boolean = false;
    errorMessage: string;
    // user entered keyword 
    _listFilter: string;
    get listFilter(): string{
        //this.showFilteredBy = false;
        return this._listFilter;
    }
    // listens to user-enters/modifies-value event, data biniding calls the setter and set _listFilter to entered value
    set listFilter(value: string){
        this._listFilter = value;
        // show and hide text Filtered by: on the template
        this.showFilteredBy =  this._listFilter ? this.showFilteredBy = true : this.showFilteredBy = false;
        // find and return value that exists in filteredProducts array 
        // if listFilter exists, call performFilter() function to retrieve a product list. Otherwise, show list of all products 
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    // filter function: we don't use the original product array here because once it gets filtered
    // we lose our original data 
    // an array with IProduct interface type
    // this property will hold all product data from our web API  
    products: IProduct[] = [];

    // inject a service - define a dependency here
    constructor(private productService: ProductService){
    }

    filteredProducts: IProduct[];

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        // use bulit-in array filter to create a new array with elements that pass the test case
        // syntax: filter((any_variable_name: data_type of our target variable we want to filter)) => ...
        // in this case, we want to filter 'products' and products is a type of IProduct
        return this.products.filter((product: IProduct) =>
            // search for product list by comparing productName property to filterBy  
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List:' + message;
    }

    // this function is executed when the application starts
    ngOnInit(): void{
        // call the service from ProductService to get a list of products
        // since the reurn type of http calls is an Observable, we need to emit its value to match IProduct array 
        this.productService.getProducts().subscribe({
            //next function is executed after an Observable emits an item
            next: products => {
                this.products = products,
                // set default value of filteredProducts to show list of all products retrieved from ProductService
                // filteredProducts now is set after the products property is set to our list of products
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
    }
}