import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
  animations: [
    trigger("menuTrigger", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("200ms ease-out", style({ opacity: 1 })),
      ]),
      transition(":leave", [animate("150ms ease-in", style({ opacity: 0 }))]),
    ]),
  ],
})
export class NavbarComponent implements OnInit {
  showDiv: boolean = false;
  showDiv2: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  showDivFunction2() {
    this.showDiv2 = !this.showDiv2;
  }

  isShown() {
    this.showDiv2 = false;
  }
}
