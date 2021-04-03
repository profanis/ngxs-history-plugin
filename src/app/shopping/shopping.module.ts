import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { ShoppingComponent } from "./shopping/shopping.component";
import { ShoppingState } from "./store/shopping.state";

@NgModule({
  declarations: [ShoppingComponent],
  imports: [CommonModule, FormsModule, NgxsModule.forFeature([ShoppingState])],
  exports: [ShoppingComponent],
})
export class ShoppingModule {}
