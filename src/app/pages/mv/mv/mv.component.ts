import { Component, ElementRef, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileText, LockKeyhole, LucideAngularModule, Mail, MousePointer2, Phone, Signature, User, Wifi } from 'lucide-angular';
import { SwitchComponent } from '../../../../shared/components/switch/switch.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DropdownComponent } from "../../../../shared/components/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';
import { TextareaComponent } from "../../../../shared/components/textarea/textarea.component";
import { DatePickerComponent, DatePickerValue } from "../../../../shared/components/date-picker/date-picker.component";
import { CheckboxComponent } from "../../../../shared/components/checkbox/checkbox/checkbox.component";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { BasePage } from '../../../helpers/base-page';
import { TabItemComponent } from '../../../../shared/components/tabs/tab-item/tab-item.component';
import { TabsComponent } from '../../../../shared/components/tabs/tabs.component';
import { RadioButtonComponent } from '../../../../shared/components/radio-button/radio-button.component';
import { RadioGroupComponent } from '../../../../shared/components/radio-group/radio-group.component';

interface Option {
  id: number;
  name: string;
}

@Component({
  selector: 'app-mv',
  imports: [ButtonComponent,
    InputComponent,
    SwitchComponent,
    LucideAngularModule,
    ReactiveFormsModule,
    RouterModule,
    TranslatePipe,
    DropdownComponent,
    CommonModule,
    TextareaComponent,
    DatePickerComponent,
    CheckboxComponent,
    CardComponent,
    TabsComponent,
    TabItemComponent,
    RadioGroupComponent,
    RadioButtonComponent
  ],
  templateUrl: './mv.component.html',
  styleUrl: './mv.component.css'
})

export class MvComponent extends BasePage {
  public form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    document: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    active: new FormControl(false, Validators.requiredTrue),
    options: new FormControl([], Validators.required),
    description: new FormControl('', Validators.required),
    date: new FormControl(new Date(), Validators.required),
    gender: new FormControl(''),
  });

  readonly LockKeyhole = LockKeyhole;
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly User = User;
  readonly Signature = Signature;
  readonly Wifi=Wifi;
  readonly MousePointer2 = MousePointer2;
  readonly FileText = FileText

  options: Option[] = [
    { id: 1, name: 'Murillo Nahas' },
    { id: 2, name: 'Rafael Serinolli' },
    { id: 3, name: 'Marcus Vinicius' },
    { id: 3, name: 'Ana Maria' },
    { id: 3, name: 'Ana Peraçoli' },
    { id: 3, name: 'Duda Serinolli' },
  ];

  selectedOptions: Option[] = [];

  onOptionsChange(selectedOptions: Option | Option[]) {
  }

  onDateChange(date: DatePickerValue) {
    console.log(date);
  }

  send() {
    if (this.form.valid) {
      this.showToast('Formulário enviado com sucesso!', 'success', 3000);
    } else {
      this.showToast('Preencha todos os campos obrigatórios!', 'danger', 3000);
    }
  }

  tabChanged(index: number) {
    console.log('A aba selecionada é: ', index);
  }
}
