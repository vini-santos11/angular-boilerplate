import { Component } from '@angular/core';
import { Pagination, TableComponent } from "../../../shared/components/table/table.component";

@Component({
  selector: 'app-home',
  imports: [TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  columns = [
    { label: 'Product', key: 'name' },
    { label: 'Color', key: 'color' },
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price' }
  ];

  products = [
    { name: 'MacBook Pro', color: 'Silver', category: 'Laptop', price: 2999 },
    { name: 'Magic Mouse', color: 'Black', category: 'Accessories', price: 99 },
    { name: 'iPhone 14', color: 'Blue', category: 'Smartphone', price: 999 },
    { name: 'Apple Watch', color: 'Gold', category: 'Wearable', price: 399 },
    { name: 'iPad Pro', color: 'Space Gray', category: 'Tablet', price: 1099 },
    { name: 'AirPods Pro', color: 'White', category: 'Accessories', price: 249 }
  ];

  get pagedProducts() {
    const start = (this.pagination.page - 1) * this.pagination.pageSize;
    const end = start + this.pagination.pageSize;
    return this.products.slice(start, end);
  }

  pagination: Pagination = {
    page: 1,
    pageSize: 5,
    total: this.products.length
  }

  handleEdit = (item: any) => {
    console.log('Editing item:', item);
  };

  handleDelete = (item: any) => {
    console.log('Deleting item:', item);
  };

  pageChanged(page: number) {
    this.pagination.page = page;
  }

  actions = [
    { label: 'Edit', callback: this.handleEdit },
    { label: 'Delete', callback: this.handleDelete },
  ];
}
