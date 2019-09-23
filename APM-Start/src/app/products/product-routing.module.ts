import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent },
      // implement a Guard for this route
      {path: 'products/:id', 
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class ProductRoutingModule { }
