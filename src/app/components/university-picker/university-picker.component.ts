import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, NG_VALIDATORS, AbstractControl, ValidationErrors, ControlValueAccessor, Validator } from '@angular/forms';

import { VkApiService } from '../vk-api.service';

@Component({
  selector: 'app-university-picker',
  templateUrl: './university-picker.component.html',
  styleUrls: ['./university-picker.component.scss'],
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
export class UniversityPickerComponent implements OnInit, ControlValueAccessor, Validator {

  protected formGroup: FormGroup;
  protected autoForFaculty = null;
  protected autoForVersity = null;
  protected universityQueryResponse = [];
  protected facultyQueryResponse = [];

  protected chosenUniversity: any = {};
  protected chosenFaculty: any = {};
  protected city_id: number;
  
  @Input()
  city: string = 'Москва';

  @Input() disabled = false;

  // TODO: университетов может быть несколько

  constructor(
    private api: VkApiService
  ) { 
    this.formGroup = new FormGroup({
      university: new FormControl(''),
      faculty: new FormControl(''),
      specialization: new FormControl(''),
      startDate: new FormControl(''),
      finishedDate: new FormControl(''),
      qualification: new FormControl(''),
      averageScore: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getCityId();
  }

  updateUniversityQuery($event) {
    let query = $event.target.value;
    this.api.queryUniversitiesByName(query, this.city_id).then((resp) => {
      let universityQueryResponse = [];
      let universities = resp['response']['items'];
      universities.forEach((u) => {
        universityQueryResponse.push(u);
      });
      this.universityQueryResponse = universityQueryResponse;
    });
  }

  updateFacultyQuery($event) {
    this.api.queryFacultiesByName(this.chosenUniversity.id).then((resp) => {
      let facultyQueryResponse = [];
      let faculties = resp['response']['items'];
      faculties.forEach((u) => {
        facultyQueryResponse.push(u);
      });
      this.facultyQueryResponse = facultyQueryResponse;
    });
  }

  getCityId() {
    this.api.queryCitiesByName(this.city).then((resp) => {
      this.city_id = resp['response']['items'][0].id;
    });
  }

  setUniversity(university_obj) {
    this.chosenUniversity = university_obj;
  }

  setFaculty(faculty_obj) {
    this.chosenFaculty = faculty_obj;
  }

  universityNameFn(obj): string {
      return obj.title;
  }

  onChange = (value: any) => {};
  
  onTouched = () => {};

  set value (val){  // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
      this.formGroup = val;
      this.onChange(val);
      this.onTouched();
  }

  writeValue(value: any): void {
    if(value) {
      this.formGroup.setValue(value);
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.formGroup.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(c: AbstractControl): ValidationErrors | null{
    return this.formGroup.valid ? null : { invalidForm: {valid: false, message: "fields are invalid"}};
  }

}
