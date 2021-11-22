import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./login/auth-guard";
import { LogoutComponent } from "./logout/logout.component";
import { PageComponent } from "./config/page/page.component";
import { MainComponent } from "./main/main.component";
import { ModuleComponent } from "./config/module/module.component";
import { OrganizationComponent } from "./config/organization/organization.component";
import { RoleComponent } from "./config/role/role.component";
import { UserComponent } from "./config/user/user.component";
import { CountryComponent } from "./masterInfo/country/country.component";
import { LocationComponent } from "./masterInfo/location/location.component";
import { CustomerComponent } from "./operationalInfo/customer/customer.component";
import { HotelComponent } from "./operationalInfo/hotel/hotel.component";
import { PackageComponent } from "./operationalInfo/package/package.component";
import { BookingComponent } from "./operationalAction/booking/booking.component";
import { HomeComponent } from "./home/home.component";
import { TeamComponent } from "./team/team.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "team", component: TeamComponent },
  { path: "main", component: MainComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },

  { path: "logout", component: LogoutComponent, canActivate: [AuthGuard] },
  {
    path: "main",
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "page", component: PageComponent, canActivate: [AuthGuard] },
      { path: "module", component: ModuleComponent, canActivate: [AuthGuard] },
      {
        path: "organization",
        component: OrganizationComponent,
        canActivate: [AuthGuard],
      },
      { path: "role", component: RoleComponent, canActivate: [AuthGuard] },
      { path: "user", component: UserComponent, canActivate: [AuthGuard] },
      {
        path: "country",
        component: CountryComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "location",
        component: LocationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "customer",
        component: CustomerComponent,
        canActivate: [AuthGuard],
      },
      { path: "hotel", component: HotelComponent, canActivate: [AuthGuard] },
      {
        path: "package",
        component: PackageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "booking",
        component: BookingComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
