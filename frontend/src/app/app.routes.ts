import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { SelectedProductComponent } from './product/selected-product/selected-product.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'cart', component: CartComponent},
    { path: 'product', component: ProductComponent},    
    { path: 'selected-product/:productId', component: SelectedProductComponent },
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'home'
    },
];
