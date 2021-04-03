import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { NgxsModule } from '@ngxs/store'
import { NgxsHistoryModule } from 'ngxs-history-plugin'
import { environment } from './../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ShoppingModule } from './shopping/shopping.module'
import { TodoModule } from './todo/todo.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsHistoryModule.forRoot({
      historyLength: 5,
    }),
    NgxsDispatchPluginModule.forRoot(),
    FormsModule,
    TodoModule,
    ShoppingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
