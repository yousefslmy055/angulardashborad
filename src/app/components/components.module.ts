import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoustomJsComponent } from './coustom-js/coustom-js.component';
import { CulomnsOfTablesComponent } from './culomns-of-tables/culomns-of-tables.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CoustomJsComponent,
    CulomnsOfTablesComponent,
    DatatableComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CoustomJsComponent,
    CulomnsOfTablesComponent,
      DatatableComponent
  ]
})
export class ComponentsModule { }
