import { Injectable } from '@angular/core';
import { Memento } from './Imemento';
import { Originator } from './oroginator';

@Injectable({
  providedIn: 'root'
})
export class CareTaker<T> {
  private mementos: Memento<T>[] = [];

  private originator: Originator<T>;

  constructor(originator: Originator<T>) {
      this.originator = originator;
  }

  public backup(state: T): void {
      console.log('\nCaretaker: Saving Originator\'s state...');
      this.mementos.push(this.originator.save(state));
  }

  public undo(): T {
      if (!this.mementos.length) {
          return;
      }
      const memento = this.mementos.pop();

      // console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
      return this.originator.restore(memento);

  }

  public showHistory(): void {
      console.log('Caretaker: Here\'s the list of mementos:');
      for (const memento of this.mementos) {
          console.log(memento.getDate(), JSON.stringify(memento.getState()));
      }
  }
}
