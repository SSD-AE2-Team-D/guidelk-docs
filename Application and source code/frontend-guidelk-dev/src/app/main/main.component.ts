import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Module} from "../config/module/module";
import {Page} from "../config/page/page";
import {ModuleService} from "../service/data/module.service";
import {PageService} from "../service/data/page.service";
import {take} from "rxjs/operators";
import {JwtClientService} from "../service/data/jwt-client.service";
import {Router} from "@angular/router";
import {MatSidenav} from "@angular/material/sidenav";
import {UserService} from "../service/data/user.service";
import {AuthorityService} from "../service/data/authority.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
    @ViewChild('sidenav') sidenav: MatSidenav;
    isShowing: boolean;
    moduleList: Module[] = [];
    pageList: Page[] = [];
    @Output() closeSideNav = new EventEmitter();


    constructor(private router: Router,
                private jwtClientService: JwtClientService,
                private userService: UserService,
                private authorityService: AuthorityService,
                private moduleService: ModuleService,
                private pageService: PageService) {
    }

    ngOnInit(): void {
        this.userModules();
    }

    toggleSidenav() {
        this.isShowing = !this.isShowing;
    }

    callMethods() {
        this.toggleSidenav();
    }

    onToggleClose() {
        this.closeSideNav.emit();
    }

    public userModules() {
        const username = window.sessionStorage.getItem('username');
        if (username) {
            this.moduleService.getUserModules(username, Number(window.sessionStorage.getItem('organizationId')))
                .pipe((take(1))).subscribe(modules => {
                if (modules && modules.length > 0) {
                    modules.forEach(mod => {
                        this.moduleList.push(mod);
                    })
                }

            })
        }
    }

    public getPages(moduleId: number) {
        this.pageList = [];
        this.pageService.getPagesByModule(moduleId, Number(window.sessionStorage.getItem('userId'))).pipe(take(1))
            .subscribe(pages => {
                if (pages && pages.length > 0) {
                    pages.forEach(page => {
                        this.pageList.push(page);
                    })
                    this.toggleSidenav();
                }
            })
    }

    public logOut() {
        this.moduleList = [];
        this.pageList = [];
        this.jwtClientService.doLogout(window.sessionStorage.getItem('userId')).pipe(take(1))
            .subscribe((lo) => {
                if (lo) {
                    this.router.navigate(['logout']);
                }
            });


    }


}
