import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';
import { EllipsisVertical } from 'lucide-angular';
import { DropdownComponent } from "../dropdown/dropdown.component";

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
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
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
  @Output() pageSizeChange = new EventEmitter<number>();

  readonly EllipsisVertical = EllipsisVertical;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  activeMenuItem: boolean = false;
  pageSizeOptions: number[] = [5, 10, 20, 50];

  constructor(private eRef: ElementRef) {}

  toggleMenu(item: boolean) {
    this.activeMenuItem = this.activeMenuItem === item ? false : item;
  }

  runAction(action: TableAction, item: boolean) {
    action.callback(item);
    this.activeMenuItem = false;
  }

  changePage(page: number) {
    if (page !== this.pagination.page) {
      this.pageChange.emit(page);
    }
  }

  changePageSize(size: number) {
    if (size !== this.pagination.pageSize) {
      this.pageSizeChange.emit(size);
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
      this.activeMenuItem = false;
    }
  }
}
