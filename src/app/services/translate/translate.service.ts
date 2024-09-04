import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateTools {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['pt_br']);
    translateService.setDefaultLang('pt_br');
    translateService.use('pt_br');
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

  translate(text: string): string{
    return this.translateService.instant(text);
  }
}
