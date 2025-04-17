import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

export const TEXTAREA_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextareaComponent),
  multi: true
};

@Component({
  selector: 'app-textarea',
  imports: [CommonModule],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.css',
  providers: [TEXTAREA_VALUE_ACCESSOR]
})

export class TextareaComponent implements ControlValueAccessor{
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() control!: AbstractControl | FormControl | null;
  public value: string = '';

  constructor(private translate: TranslateService){}
    onChange: (_value: string) => void = () => {};
    onTouched: () => void = () => {};

    getErrorMessage(): string {
      const ctrl = this.control;
      if (!ctrl || !ctrl.errors) return '';

      return this.translate.instant('required_field');
    }

    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.value = target.value;
      this.onChange(this.value);
    }

    onBlur() {
      this.onTouched();
    }

    writeValue(value: string): void {
      this.value = value ?? '';
    }

    registerOnChange(fn: (value: string) => void): void {
      this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
}
