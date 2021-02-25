import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsModule } from '@ngxs/store';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsMementoModule } from './ngxs-memento.module';
import { TodoState } from './store/todo.state';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([TodoState], {
      developmentMode: !environment.production
    }),
    NgxsMementoModule.forRoot(),
    NgxsDispatchPluginModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
