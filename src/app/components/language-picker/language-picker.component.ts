import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { languages } from '../language-dict.service';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguagePickerComponent),
      multi: true
    }
  ]
})
export class LanguagePickerComponent implements OnInit, ControlValueAccessor {

  availableLanguages = languages;
  chosenLanguages = {
    'ru': {
      active: true,
      level: 'middle',
    },
  };
  addingMode = false;
  protected autoAdd = null;
  protected autoUpdate = null;

  @Input() disabled = false;

  chosenControl = new FormControl([]);

  constructor() { }

  ngOnInit() {
  }
  
  updateChosenControl() {
    this.chosenControl.setValue(Object.keys(this.chosenLanguages));
  }
  
  addToChosen(code) {
    this.chosenLanguages[code] = {active: true, level: 'middle'};
    this.addingMode = false;
    this.updateChosenControl();
  }
  
  removeFromChosen(code) {
    delete this.chosenLanguages[code];
    this.updateChosenControl();
  }

  changeChosen(oldCode, newCode) {
    this.removeFromChosen(oldCode);
    this.addToChosen(newCode);
    this.updateChosenControl();
  }
  
  addNew() {
    this.addingMode = true;
  }

  setLevel(code, level) {
    this.chosenLanguages[code] = {
      ...this.chosenLanguages[code],
      level: level
    };
    this.updateChosenControl();
  }
  
  private mySortingFunction = (a, b) => {
    return 1;
  }

  onChange = (rating: number) => {};
  
  onTouched = () => {};

  writeValue(value: any): void {
    if(value) {
      this.chosenControl.setValue(value);
    }
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
