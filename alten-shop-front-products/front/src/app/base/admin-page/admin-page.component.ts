import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  styles: [`
      :host ::ng-deep .p-cell-editing {
          padding-top: 0 !important;
          padding-bottom: 0 !important;
      }
  `]
})
export class AdminPageComponent implements OnInit {
  products: Product[];
  statuses: SelectItem[];
  categories: SelectItem[];

  editingMode: boolean = false;

  clonedProducts: { [s: string]: Product; } = {};

  matchModeOptions: SelectItem[];

  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.productsService.getProducts().then(products => {
      this.products = products
    });

    this.statuses = [
      { label: 'In Stock', value: 'INSTOCK' },
      { label: 'Low Stock', value: 'LOWSTOCK' },
      { label: 'Out of Stock', value: 'OUTOFSTOCK' },
    ];

    this.categories = [
      { label: 'Accessories', value: 'Accessories' },
      { label: 'Fitness', value: 'Fitness' },
      { label: 'Clothing', value: 'Clothing' },
      { label: 'Electronics', value: 'Electronics' },
    ];
  }

  debugF(obj: any) {
    console.log(obj);
  }

  isEditing() {
    this.editingMode = !this.editingMode;
  }

  onRowEditInit(product: Product) {
    this.isEditing();
    this.clonedProducts[product.id] = { ...product };
  }

  onRowEditSave(product: Product) {
    if (product.price > 0) {
      delete this.clonedProducts[product.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
    this.isEditing();
  }

  onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.products[product.id];
    this.isEditing();
  }

  onRowEditDelete(id: string) {
    this.products = this.products.filter(p => p.id !== id);
  }
}
