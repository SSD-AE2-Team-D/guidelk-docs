import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ClickOutsideModule } from "ng-click-outside";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthGuard } from "./login/auth-guard";
import { JwtClientService } from "./service/data/jwt-client.service";
import { authInterceptorProviders } from "./util/auth.interceptor";
import { ErrorInterceptor } from "./util/error.interceptor";
import { UserService } from "./service/data/user.service";
import { AuthorityService } from "./service/data/authority.service";
import { ModuleService } from "./service/data/module.service";
import { PageService } from "./service/data/page.service";
import { PageTitleService } from "./core/page-title/page-title.service";
import { RolePermission } from "./shared/rolePermission/rolePermission";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { PageComponent } from "./config/page/page.component";
import { MainComponent } from "./main/main.component";
import { ModuleComponent } from "./config/module/module.component";
import { ModuleCreationComponent } from "./config/module/creation/module-creation.component";
import {
  ModuleDialogComponent,
  ModuleSearchComponent,
} from "./config/module/search/module-search.component";
import { AuditComponent } from "./shared/audit/audit.component";
import { ConfirmDialogComponent } from "./shared/confirm-dialog/confirm-dialog.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatNativeDateModule, MatRippleModule } from "@angular/material/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from "ng-pick-datetime-ex";
import { CommonModule } from "@angular/common";
import { MatRadioModule } from "@angular/material/radio";
import { MatListModule } from "@angular/material/list";
import { AgGridModule } from "ag-grid-angular";
import { AddressBookComponent } from "./config/common/addressBook/address-book.component";
import { OrganizationComponent } from "./config/organization/organization.component";
import { OrganizationCreationComponent } from "./config/organization/creation/organization-creation.component";
import { OrganizationService } from "./service/data/organization.service";
import { SelectCheckAllComponent } from "./shared/select-check-all/select-check-all.component";
import {
  OrganizationDialogComponent,
  OrganizationSearchComponent,
} from "./config/organization/search/organization-search.component";
import { PageCreationComponent } from "./config/page/creation/page-creation.component";
import { AuthorityDisplayComponent } from "./config/authority/authority-display.component";
import { AuthorityTruncatePipe } from "./config/authority/authority.pipe";
import {
  PageDialogComponent,
  PageSearchComponent,
} from "./config/page/search/page-search.component";
import { RoleComponent } from "./config/role/role.component";
import { PageDisplayComponent } from "./config/page/display/page-display.component";
import { RoleCreationComponent } from "./config/role/creation/role-creation.component";
import {
  RoleDialogComponent,
  RoleSearchComponent,
} from "./config/role/search/role-search.component";
import { RoleDisplayComponent } from "./config/role/display/role-display.component";
import { UserComponent } from "./config/user/user.component";
import { UserCreationComponent } from "./config/user/creation/user-creation.component";
import {
  UserDialogComponent,
  UserSearchComponent,
} from "./config/user/search/user-search.component";
import { CountryService } from "./service/data/country.service";
import { LocationService } from "./service/data/location.service";
import { CountryComponent } from "./masterInfo/country/country.component";
import { CountryCreationComponent } from "./masterInfo/country/creation/country-creation.component";
import {
  CountryDialogComponent,
  CountrySearchComponent,
} from "./masterInfo/country/search/country-search.component";
import { LocationComponent } from "./masterInfo/location/location.component";
import { LocationCreationComponent } from "./masterInfo/location/creation/location-creation.component";
import {
  LocationDialogComponent,
  LocationSearchComponent,
} from "./masterInfo/location/search/location-search.component";
import { CustomerComponent } from "./operationalInfo/customer/customer.component";
import { CustomerCreationComponent } from "./operationalInfo/customer/creation/customer-creation.component";
import {
  CustomerDialogComponent,
  CustomerSearchComponent,
} from "./operationalInfo/customer/search/customer-search.component";
import { MatTableExporterModule } from "mat-table-exporter";
import { HotelComponent } from "./operationalInfo/hotel/hotel.component";
import { HotelCreationComponent } from "./operationalInfo/hotel/creation/hotel-creation.component";
import { TypeFeatureGridComponent } from "./operationalInfo/hotel/creation/typefeature/type-feature-grid.component";
import { FeatureDisplayComponent } from "./operationalInfo/hotel/creation/typefeature/featureDisplay/feature-display.component";
import {
  HotelDialogComponent,
  HotelSearchComponent,
} from "./operationalInfo/hotel/search/hotel-search.component";
import { HotelService } from "./service/data/hotel.service";
import { PackageService } from "./service/data/package.service";
import { PackageComponent } from "./operationalInfo/package/package.component";
import { PackageCreationComponent } from "./operationalInfo/package/creation/package-creation.component";
import {
  PackageFeedbackDialogComponent,
  StayComponent,
} from "./operationalInfo/package/creation/stay/stay.component";
import { ActivityDisplayComponent } from "./operationalInfo/package/creation/stay/activityDisplay/activity-display.component";
import {
  HotelPackageDialogComponent,
  HotelPackageViewFeedbackDialogComponent,
  StayHistoryComponent,
} from "./operationalInfo/package/search/stayHistory/stay-history.component";
import { PackageSearchComponent } from "./operationalInfo/package/search/package-search.component";
import { StayFeedbackComponent } from "./operationalInfo/package/feedback/stayFeedback/stay-feedback.component";
import { BookingComponent } from "./operationalAction/booking/booking.component";
import { BookingCreationComponent } from "./operationalAction/booking/creation/booking-creation.component";
import { BookingService } from "./service/data/booking.service";
import { StayBookingCreationComponent } from "./operationalAction/booking/hotelBooking/stayBookingCreation/stay-booking-creation.component";
import { BookingSearchComponent } from "./operationalAction/booking/search/booking-search.component";
import {
  HotelBookingDialogComponent,
  StayBookingSearchComponent,
} from "./operationalAction/booking/hotelBooking/stayBookingSearch/stay-booking-search.component";
import { ViewFeedbackComponent } from "./operationalInfo/package/feedback/dispalyFeedback/view-feedback.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { TeamComponent } from "./team/team.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    PageComponent,
    MainComponent,
    ModuleComponent,
    OrganizationComponent,
    RoleComponent,
    UserComponent,
    CountryComponent,
    LocationComponent,
    CustomerComponent,
    HotelComponent,
    PackageComponent,
    BookingComponent,
    ModuleCreationComponent,
    ModuleSearchComponent,
    OrganizationCreationComponent,
    OrganizationSearchComponent,
    PageCreationComponent,
    PageSearchComponent,
    RoleCreationComponent,
    RoleSearchComponent,
    UserCreationComponent,
    UserSearchComponent,
    CountryCreationComponent,
    CountrySearchComponent,
    LocationCreationComponent,
    LocationSearchComponent,
    CustomerCreationComponent,
    CustomerSearchComponent,
    HotelCreationComponent,
    HotelSearchComponent,
    TypeFeatureGridComponent,
    PackageCreationComponent,
    PackageSearchComponent,
    StayComponent,
    StayHistoryComponent,
    StayFeedbackComponent,
    ViewFeedbackComponent,
    BookingCreationComponent,
    BookingSearchComponent,
    StayBookingCreationComponent,
    StayBookingSearchComponent,
    AuditComponent,
    AddressBookComponent,
    ConfirmDialogComponent,
    ModuleDialogComponent,
    OrganizationDialogComponent,
    PageDialogComponent,
    RoleDialogComponent,
    UserDialogComponent,
    CountryDialogComponent,
    LocationDialogComponent,
    CustomerDialogComponent,
    HotelDialogComponent,
    PackageFeedbackDialogComponent,
    HotelPackageDialogComponent,
    HotelBookingDialogComponent,
    HotelPackageViewFeedbackDialogComponent,
    AuthorityDisplayComponent,
    PageDisplayComponent,
    RoleDisplayComponent,
    FeatureDisplayComponent,
    ActivityDisplayComponent,
    SelectCheckAllComponent,
    AuthorityTruncatePipe,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    TeamComponent,
  ],
  entryComponents: [
    ConfirmDialogComponent,
    ModuleDialogComponent,
    OrganizationDialogComponent,
    PageDialogComponent,
    RoleDialogComponent,
    UserDialogComponent,
    CountryDialogComponent,
    LocationDialogComponent,
    CustomerDialogComponent,
    HotelDialogComponent,
    HotelPackageDialogComponent,
    PackageFeedbackDialogComponent,
    HotelBookingDialogComponent,
    HotelPackageViewFeedbackDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    HttpClientModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatSortModule,
    MatTableExporterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AgGridModule,
    AgGridModule.withComponents([]),
  ],
  providers: [
    AuthGuard,
    JwtClientService,
    authInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    UserService,
    AuthorityService,
    ModuleService,
    PageService,
    OrganizationService,
    CountryService,
    LocationService,
    HotelService,
    PackageService,
    BookingService,
    PageTitleService,
    RolePermission,
  ],
  exports: [FlexLayoutModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
