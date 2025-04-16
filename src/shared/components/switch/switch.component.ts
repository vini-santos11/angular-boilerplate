import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-switch',
  imports: [CommonModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchComponent,
      multi: true
    }
  ]
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() label : string = '';
  @Input() labelPosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
  @Input() disabled: boolean = false;

  value: boolean = false;

  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  onChange = (value: boolean) => {};
  onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
