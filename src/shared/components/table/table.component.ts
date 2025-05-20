import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { EllipsisVertical } from 'lucide-angular';

export interface TableAction {
  label: string;
  callback: (item: any) => void;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

@Component({
  selector: 'app-table',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: { label: string; key: string }[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() actions: TableAction[] = [];
  @Input() pagination!: Pagination;
  @Output() pageChange = new EventEmitter<number>();

  readonly EllipsisVertical = EllipsisVertical;

  activeMenuItem: any = null;

  constructor(private eRef: ElementRef) {}

  toggleMenu(item: any) {
    this.activeMenuItem = this.activeMenuItem === item ? null : item;
  }

  runAction(action: TableAction, item: any) {
    action.callback(item);
    this.activeMenuItem = null;
  }

  changePage(page: number) {
    if (page !== this.pagination.page) {
      this.pageChange.emit(page);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.pagination.total / this.pagination.pageSize);
  }

  get currentRange(): { start: number; end: number } {
    const start = (this.pagination.page - 1) * this.pagination.pageSize + 1;
    const end = Math.min(start + this.pagination.pageSize - 1, this.pagination.total);
    return { start, end };
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.activeMenuItem = null;
    }
  }
}
