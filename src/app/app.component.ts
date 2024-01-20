import { Component } from '@angular/core';
import {LanguageService} from "./services/language/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'saveafrica';

  constructor(
    private languageService: LanguageService
  ) {
  }
}
