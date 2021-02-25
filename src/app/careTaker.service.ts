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
export class CareTaker {
    private mementos: Record<string, Memento[]> = {};

    public backup(stateName: string, memento: Memento): void {
        console.log('\nCaretaker: Saving Originator\'s state...');
        this.mementos[stateName] ? this.mementos[stateName].push(memento) : this.mementos[stateName] = [memento];
    }

    public undo(stateName: string): any {
        if (!this.mementos[stateName].length) {
            return;
        }
        const memento = this.mementos[stateName].pop();

        return memento.state
    }

    public showHistory(stateName: string): void {
        console.log('Caretaker: Here\'s the list of mementos:');
        for (const memento of this.mementos[stateName]) {
            console.log(memento.date, JSON.stringify(memento.state));
        }
    }
}
