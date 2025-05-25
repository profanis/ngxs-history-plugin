// Configuration de l'application avec les providers
import { ApplicationConfig, importProvidersFrom, NgModule } from '@angular/core';
import { NgxsModule, provideStore } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule, withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';
import { NgxsHistoryModule } from 'ngxs-history-plugin';
import { environment } from 'src/environments/environment';
import { TodoState } from './todo/store/todo.state';
import { ShoppingState } from './shopping/store/shopping.state';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            NgxsModule.forRoot([TodoState, ShoppingState], {
                developmentMode: !environment.production,
            }),
            NgxsReduxDevtoolsPluginModule.forRoot(),
            NgxsDispatchPluginModule.forRoot(),
            NgxsHistoryModule.forRoot({
                historyLength: 25, // <-- use the historyLength option
            })
        ),
    ],
};
