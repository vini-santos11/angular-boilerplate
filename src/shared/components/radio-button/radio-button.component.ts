import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SwitchComponent } from '../switch/switch.component';
import { CommonModule } from '@angular/common';

interface RadioGroupContext {
  value: any;
  setValue: (val: any) => void;
  getGroupProps: () => {
    disabled: boolean;
    labelPosition: 'top' | 'bottom' | 'left' | 'right';
    control: AbstractControl | FormControl | null;
  };
}

@Component({
  selector: 'app-radio-button',
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SwitchComponent,
      multi: true
    }
  ]
})
export class RadioButtonComponent {
  @Input() label: string = '';
  @Input() checkedValue: any;

  value: any;
  disabled = false;
  labelPosition: 'top' | 'bottom' | 'left' | 'right' = 'right';
  control!: AbstractControl | FormControl | null;

  private group?: RadioGroupContext;

  registerGroup(group: RadioGroupContext): void {
    this.group = group;
    const props = group.getGroupProps();
    this.disabled = props.disabled;
    this.labelPosition = props.labelPosition;
    this.control = props.control;
  }

  updateFromGroup(value: any, disabled: boolean, labelPosition: any, control: AbstractControl | FormControl | null) {
    this.value = value;
    this.disabled = disabled;
    this.labelPosition = labelPosition;
    this.control = control;
  }

  setValue(): void {
    if (!this.disabled && this.group) {
      this.group.setValue(this.checkedValue);
    }
  }
}
