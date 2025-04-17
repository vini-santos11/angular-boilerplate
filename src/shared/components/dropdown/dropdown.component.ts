import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ChevronDown, ChevronUp, LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, FormsModule, LucideAngularModule, TranslatePipe],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent<T> implements ControlValueAccessor {
  @Input() options: T[] = [];
  @Input() displayField: string = '';
  @Input() label: string = '';
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Input() selected: T | T[] | null = null;
  @Input() placeholder: string = 'Select...';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() control!: AbstractControl | FormControl | null;
  @Output() selectionChange = new EventEmitter<T | T[]>();

  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly Search = Search;

  isOpen = signal(false);
  searchTerm: string = '';

  constructor(private translate: TranslateService, private elementRef: ElementRef) {}

  private onChange = (_: T | T[] | null) => {};
  private onTouched = () => {};

  toggleDropdown() {
    this.isOpen.update(open => !open);
  }

  hasSelected(): boolean {
    return Array.isArray(this.selected)
      ? this.selected.length > 0
      : !!this.selected;
  }

  isSingleSelected(): boolean {
    return !Array.isArray(this.selected) && !!this.selected;
  }

  isMultipleSelected(): boolean {
    return Array.isArray(this.selected) && this.selected.length > 0;
  }

  getSingleLabel(): string {
    return this.selected != null && !(Array.isArray(this.selected) && this.selected.length === 0) ? this.getOptionLabel(this.selected as T) : this.placeholder;
  }

  getMultipleLabels(): string {
    return Array.isArray(this.selected)
      ? this.selected.map(opt => this.getOptionLabel(opt)).join(', ')
      : '';
  }

  isSelected(option: T): boolean {
    if (this.selectionMode === 'multiple')
      return Array.isArray(this.selected) && this.selected.includes(option);

    return this.selected === option;
  }

  selectOption(option: T): void {
    if (this.selectionMode === 'multiple') {
      this.handleMultipleSelection(option);
    } else {
      this.handleSingleSelection(option);
    }

    this.onTouched();
  }

  private handleSingleSelection(option: T): void {
    this.selected = option;
    this.onChange(option);
    this.selectionChange.emit(option);
    this.isOpen.set(false);
  }

  private handleMultipleSelection(option: T): void {
    if (!Array.isArray(this.selected)) {
      this.selected = [];
    }

    const selectedList = this.selected as T[];
    const index = selectedList.indexOf(option);

    index > -1
      ? selectedList.splice(index, 1)
      : selectedList.push(option);

    const updated = [...selectedList];
    this.onChange(updated);
    this.selectionChange.emit(updated);
  }

  deselectItem(option: T): void {
    if (this.selectionMode !== 'multiple' || !Array.isArray(this.selected)) return;

    this.selected = this.selected.filter(item => item !== option);
    this.onChange(this.selected);
    this.selectionChange.emit(this.selected);
  }

  getMultipleSelectedList(): T[] {
    return Array.isArray(this.selected) ? this.selected : [];
  }

  getOptionLabel(option: T): string {
    var field = typeof option === 'object' && (this.displayField || '')
      ? option && option[this.displayField as keyof T]?.toString() || ''
      : option?.toString();
    return field || '';
  }

  writeValue(value: T | T[] | null): void {
    this.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  getErrorMessage(): string {
    const ctrl = this.control;
    if (!ctrl || !ctrl.errors) return '';

    if (ctrl.errors['required']) {
      return this.translate.instant('required_field');
    }

    if (ctrl.errors['minlength']) {
      return this.translate.instant('minlength_field', {
        min: ctrl.errors['minlength'].requiredLength
      });
    }

    if (ctrl.errors['maxlength']) {
      return this.translate.instant('maxlength_field', {
        max: ctrl.errors['maxlength'].requiredLength
      });
    }

    if (ctrl.errors['email']) {
      return this.translate.instant('email_invalid');
    }

    return this.translate.instant('invalid_field');
  }

  filteredOptions(): T[] {
    if (!this.searchTerm) return this.options;

    const term = this.searchTerm.toLowerCase();
    return this.options.filter(option =>
      this.getOptionLabel(option).toLowerCase().includes(term)
    );
  }

  onInternalClick(event: MouseEvent): void {
    event.stopPropagation();
  }

  onDropdownClick(event: MouseEvent): void {
    event.stopPropagation();
    this.toggleDropdown();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isOpen.set(false);
    }
  }
}
