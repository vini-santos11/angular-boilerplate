import { AfterContentInit, Component, ContentChildren, forwardRef, Input, QueryList } from '@angular/core';
import { RadioButtonComponent } from '../radio-button/radio-button.component';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-radio-group',
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
})
export class RadioGroupComponent implements ControlValueAccessor, AfterContentInit {
  @Input() disabled = false;
  @Input() labelPosition: 'top' | 'bottom' | 'left' | 'right' = 'right';
  @Input() control!: AbstractControl | FormControl | null;

  @ContentChildren(RadioButtonComponent) radios!: QueryList<RadioButtonComponent>;

  value: unknown;
  private onChange: (value: unknown) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterContentInit(): void {
    this.radios.forEach(radio => {
      radio.registerGroup({
        get value() {
          return this.value;
        },
        setValue: (val: unknown) => {
          this.value = val;
          this.onChange(val);
          this.onTouched();
          this.updateChildren();
        },
        getGroupProps: () => ({
          disabled: this.disabled,
          labelPosition: this.labelPosition,
          control: this.control,
        }),
      });
    });
    this.updateChildren();
  }

  writeValue(value: unknown): void {
    this.value = value;
    this.updateChildren();
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private updateChildren(): void {
    this.radios?.forEach(radio => {
      radio.updateFromGroup(this.value, this.disabled, this.labelPosition, this.control);
    });
  }
}
