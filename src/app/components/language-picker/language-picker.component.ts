import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { languages } from '../language-dict.service';

@Component({
  selector: 'app-language-picker',
  templateUrl: './language-picker.component.html',
  styleUrls: ['./language-picker.component.scss']
})
export class LanguagePickerComponent implements OnInit {

  availableLanguages = languages;
  chosenLanguages = {
    'ru': true,
  };
  addingMode = false;
  protected autoAdd = null;
  protected autoUpdate = null;

  chosenControl = new FormControl([]);

  constructor() { }

  ngOnInit() {
  }

  private mySortingFunction = (a, b) => {
    return 1;
  }

  updateChosenControl() {
    this.chosenControl.setValue(Object.keys(this.chosenLanguages));
  }

  addToChosen(code) {
    this.chosenLanguages[code] = true;
    this.updateChosenControl();
    this.addingMode = false;
  }

  removeFromChosen(code) {
    this.chosenLanguages[code] = false;
    delete this.chosenLanguages[code];
    this.updateChosenControl();
  }

  addNew() {
    this.addingMode = true;
  }

}
