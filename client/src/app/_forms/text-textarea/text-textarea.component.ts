import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-textarea',
  templateUrl: './text-textarea.component.html',
  styleUrls: ['./text-textarea.component.css']
})
export class TextTextareaComponent implements ControlValueAccessor {
  @Input() label: string;
  @Input() rows: number;
  
  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
   }
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
}
