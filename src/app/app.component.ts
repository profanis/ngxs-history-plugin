import { Component } from '@angular/core'
import { Store } from '@ngxs/store'
import { NgxsHistoryUndo } from 'ngxs-history-plugin'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) {}

  undo() {
    this.store.dispatch(new NgxsHistoryUndo())
  }
}
