import { Injectable } from '@angular/core';
import { Memento } from './memento';

/**
 * The Caretaker doesn't depend on the Concrete Memento class. Therefore, it
 * doesn't have access to the originator's state, stored inside the memento. It
 * works with all mementos via the base Memento interface.
 */
@Injectable({
    providedIn: 'root'
})
export class CareTaker<T> {
    private mementos: Memento<T>[] = [];

    // private originator: Originator<T>;

    // constructor(originator: Originator<T>) {
    //     this.originator = originator;
    // }

    public backup(memento: Memento<T>): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos.push(memento);
    }

    public undo(): T {
        if (!this.mementos.length) {
            return;
        }
        const memento = this.mementos.pop();

        return memento.state

        // console.log(`Caretaker: Restoring state to: ${memento.getName()}`);
        // return this.originator.restore(memento);

    }

    public showHistory(): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos) {
            console.log(memento.date, JSON.stringify(memento.state));
        }
    }
}
