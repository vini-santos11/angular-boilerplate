import { Component } from '@angular/core';
import { Pagination, TableComponent } from "../../../shared/components/table/table.component";

@Component({
  selector: 'app-home',
  imports: [TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loading = false;
  columns = [
    { label: 'Product', key: 'name' },
    { label: 'Color', key: 'color' },
    { label: 'Category', key: 'category' },
    { label: 'Price', key: 'price' }
  ];

  allProducts = [
    { name: 'MacBook Pro', color: 'Silver', category: 'Laptop', price: 2999 },
    { name: 'Magic Mouse', color: 'Black', category: 'Accessories', price: 99 },
    { name: 'iPhone 14', color: 'Blue', category: 'Smartphone', price: 999 },
    { name: 'Apple Watch', color: 'Gold', category: 'Wearable', price: 399 },
    { name: 'iPad Pro', color: 'Space Gray', category: 'Tablet', price: 1099 },
    { name: 'AirPods Pro', color: 'White', category: 'Accessories', price: 249 },
    { name: 'Apple TV', color: 'Black', category: 'Streaming', price: 199 },
    { name: 'HomePod Mini', color: 'White', category: 'Smart Speaker', price: 99 },
    { name: 'Magic Keyboard', color: 'Silver', category: 'Accessories', price: 129 },
    { name: 'iMac', color: 'Silver', category: 'Desktop', price: 1799 },
    { name: 'Mac Mini', color: 'Space Gray', category: 'Desktop', price: 699 },
    { name: 'AirTag', color: 'White', category: 'Accessories', price: 29 },
    { name: 'Beats Studio Buds', color: 'Black', category: 'Accessories', price: 149 },
    { name: 'Apple Pencil', color: 'White', category: 'Accessories', price: 129 },
    { name: 'AppleCare+', color: 'N/A', category: 'Warranty', price: 199 },
    { name: 'Magic Trackpad', color: 'Silver', category: 'Accessories', price: 129 },
    { name: 'AirPods Max', color: 'Space Gray', category: 'Accessories', price: 549 },
    { name: 'iPhone SE', color: 'Red', category: 'Smartphone', price: 429 },
    { name: 'iPad Air', color: 'Rose Gold', category: 'Tablet', price: 599 }
  ];

  products: any[] = [];

  pagination: Pagination = {
    page: 1,
    pageSize: 5,
    total: this.products.length
  }

  protected ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    setTimeout(() => {
      const start = (this.pagination.page - 1) * this.pagination.pageSize;
      const end = start + this.pagination.pageSize;

      this.products = this.allProducts.slice(start, end);
      this.pagination.total = this.allProducts.length;

      this.loading = false;
    }, 50);
  }

  handleEdit = (item: any) => {
    console.log('Editing item:', item);
  };

  handleDelete = (item: any) => {
    console.log('Deleting item:', item);
  };

  pageChanged(page: number) {
    this.pagination.page = page;
    this.loadData();
  }

  actions = [
    { label: 'Edit', callback: this.handleEdit },
    { label: 'Delete', callback: this.handleDelete },
  ];

  pageSizeChanged(size: number) {
    this.pagination.pageSize = +size;
    this.pagination.page = 1;
    this.loadData();
  }
}
