import { Component, OnInit, forwardRef, Input, Output } from "@angular/core";
import {
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
  ValidationErrors,
  NG_VALIDATORS,
  Validator
} from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { languages } from "../language-list.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-language-picker",
  templateUrl: "./language-picker.component.html",
  styleUrls: ["./language-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguagePickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LanguagePickerComponent),
      multi: true
    }
  ]
})
export class LanguagePickerComponent
  implements OnInit, ControlValueAccessor, Validator {
  availableLanguages = languages;
  filteredLanguages: Observable<any[]>;

  @Output()
  chosenControl = new FormControl('Русский');

  @Input() disabled = false;
  protected autoAdd = null;
  protected autoUpdate = null;

  constructor() {}

  ngOnInit() {

    this.filteredLanguages = this.chosenControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.availableLanguages.slice()))
    );
  }

  private _filter(name: string) {
    const filterValue = name.toLowerCase();
    return this.availableLanguages.filter(
      l => l.value.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onChange = (rating: number) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    if (value) {
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

  validate(c: AbstractControl): ValidationErrors | null {
    return this.chosenControl.valid
      ? null
      : {
          invalidForm: {
            valid: false,
            message: "language control fields are invalid"
          }
        };
  }
}
