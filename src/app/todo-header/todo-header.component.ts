import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  theme = 'dark';
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.loadStyle(this.theme);
  }
  changeTheme() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    this.loadStyle(this.theme);
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName + '.css';
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}.css`;
      head.appendChild(style);
    }
  }

}
