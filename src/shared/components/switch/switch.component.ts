import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

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
  @Input() control!: AbstractControl | FormControl | null;
  @Input() disabled: boolean = false;

  value: boolean = false;

  @Output() valueChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private translate: TranslateService) {}

  onChange = (value: boolean) => {};
  onTouched = () => {};

  toggle() {
    if (this.disabled) return;
    this.value = !this.value;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(this.value);
  }

  getErrorMessage(): string {
    const ctrl = this.control;
    if (!ctrl || !ctrl.errors) return '';

    return this.translate.instant('required_field');
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
