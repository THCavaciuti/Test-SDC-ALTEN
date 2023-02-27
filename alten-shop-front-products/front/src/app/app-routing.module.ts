import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './base/admin-page/admin-page.component';
import { ProductsPageComponent } from './base/products-page/products-page.component';

const routes: Routes = [
  { path: "admin/products", component: AdminPageComponent },
  {path: "products", component: ProductsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
