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
    'ru': {
      active: true,
      level: 'middle',
    },
  };
  addingMode = false;
  protected autoAdd = null;
  protected autoUpdate = null;

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
  }
  
  addNew() {
    this.addingMode = true;
  }

  setLevel(code, level) {
    this.chosenLanguages[code] = {
      ...this.chosenLanguages[code],
      level: level
    };
  }
  
  private mySortingFunction = (a, b) => {
    return 1;
  }
}
