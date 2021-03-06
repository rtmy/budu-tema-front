import { Component, OnInit, Input, forwardRef, Output } from "@angular/core";
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  AbstractControl,
  ValidationErrors,
  ControlValueAccessor,
  Validator
} from "@angular/forms";

import { VkApiService } from "../vk-api.service";

@Component({
  selector: "app-university-picker",
  templateUrl: "./university-picker.component.html",
  styleUrls: ["./university-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniversityPickerComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UniversityPickerComponent),
      multi: true
    }
  ]
})
export class UniversityPickerComponent
  implements OnInit, ControlValueAccessor, Validator {
  protected autoForVersity = null;
  protected chosenUniversity: any = {};
  protected universityQueryResponse = [];
  protected facultyQueryResponse = [];

  protected city_id: number;

  @Input()
  city: string = "Москва";

  @Input() disabled = false;

  @Output() university = new FormControl("");

  constructor(private api: VkApiService) {}

  ngOnInit() {
    this.getCityId();
  }

  updateUniversityQuery($event) {
    let query = $event.target.value;
    this.api.queryUniversitiesByName(query, this.city_id).subscribe(resp => {
      let universityQueryResponse = [];
      let universities = resp["response"]["items"];
      universities.forEach(u => {
        universityQueryResponse.push(u);
      });
      this.universityQueryResponse = universityQueryResponse;
    });
  }

  getCityId() {
    this.api.queryCitiesByName(this.city).subscribe(resp => {
      this.city_id = resp["response"]["items"][0].id;
    });
  }

  universityNameFn(obj): string {
    return obj.title;
  }

  onChange = (value: any) => {};

  onTouched = () => {};

  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.chosenUniversity = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    if (value) {
      this.chosenUniversity.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.chosenUniversity.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return this.chosenUniversity.valid
      ? null
      : { invalidForm: { valid: false, message: "fields are invalid" } };
  }
}
