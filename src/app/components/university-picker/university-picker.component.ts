import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { VkApiService } from '../vk-api.service';

@Component({
  selector: 'app-university-picker',
  templateUrl: './university-picker.component.html',
  styleUrls: ['./university-picker.component.scss']
})
export class UniversityPickerComponent implements OnInit {

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

}
