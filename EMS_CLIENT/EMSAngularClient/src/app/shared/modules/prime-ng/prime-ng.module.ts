import { NgModule } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  imports: [
    CheckboxModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    DialogModule
  ],
  exports: [
    CheckboxModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    CalendarModule,
    ConfirmDialogModule,
    TabViewModule,
    DialogModule
  ],
  declarations: []
})
export class PrimeNgModule { }
