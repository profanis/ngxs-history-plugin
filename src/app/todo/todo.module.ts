import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxsModule } from "@ngxs/store";
import { TodoState } from "./store/todo.state";
import { TodoComponent } from "./todo/todo.component";

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule, FormsModule, NgxsModule.forFeature([TodoState])],
  exports: [TodoComponent],
})
export class TodoModule {}
