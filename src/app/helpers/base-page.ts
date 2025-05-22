import { Directive, ElementRef } from "@angular/core";
import { ToastService } from "../../shared/components/toast/toast.service";
import { TooltipService } from "../../shared/components/tooltip/tooltip.service";

@Directive()
export abstract class BasePage {
  constructor(private tooltip: TooltipService, private toast: ToastService) {}

  protected showTooltip(elementRef: ElementRef, message: string, variant: 'dark' | 'light' | 'primary' = 'dark') {
    this.tooltip.showTooltip(
      elementRef,
      message,
      variant
    );
  }

  protected hideTooltip() {
    this.tooltip.hideTooltip();
  }

  protected showToast(message: string, variant: 'success' | 'danger' | 'info' | 'warning' = 'info', duration = 3000) {
    this.toast.show({message, variant, duration});
  }

  protected hideToast(id: number) {
    this.toast.dismiss(id);
  }
}
