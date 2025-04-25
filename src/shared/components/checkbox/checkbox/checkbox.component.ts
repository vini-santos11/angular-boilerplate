import { Component, Input, forwardRef } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label?: string = 'Checkbox';
  @Input() labelPosition?: 'top' | 'right' | 'bottom' | 'left' = 'left';
  @Input() labelColor?: 'primary' | 'secondary' | 'default' = 'default';
  @Input() checkboxColor?: 'primary' | 'secondary' | 'default' = 'default';
  @Input() checkboxSize?: 'small' | 'medium' | 'large' = 'medium';

  checked: boolean = false;
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  getLabelColorClass(): string {
    switch (this.labelColor) {
      case 'primary':
        return 'text-primary';
      case 'secondary':
        return 'text-secondary';
      case 'default':
      default:
        return 'text-gray-150';
    }
  }

  getCheckboxColorClass(): string {
    switch (this.checkboxColor) {
      case 'primary':
        return this.checked ? 'bg-primary border-primary' : 'border-primary';
      case 'secondary':
        return this.checked ? 'bg-secondary border-secondary' : 'border-secondary';
      case 'default':
      default:
        return this.checked ? 'bg-gray-300 border-gray-300' : 'border-gray-300';
    }
  }

  getCheckboxSizeClass(): string {
    switch (this.checkboxSize) {
      case 'small':
        return 'w-4 h-4';
      case 'medium':
        return 'w-6 h-6';
      case 'large':
        return 'w-8 h-8';
      default:
        return 'w-6 h-6';
    }
  }

  toggleCheckbox() {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.onChange(this.checked);
      this.onTouched();
    }
  }

  // ControlValueAccessor interface methods
  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
