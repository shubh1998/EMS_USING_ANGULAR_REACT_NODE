import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PrimeNgModule } from "./modules/prime-ng/prime-ng.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
      //Declare shared components here
  ],
  imports: [
    //Import shared module here
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    //Export shared module here
    CommonModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule {}
