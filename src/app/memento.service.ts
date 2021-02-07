import { Injectable } from '@angular/core';
import { Memento } from './Imemento';

// @Injectable({
//   providedIn: 'root'
// })
export class ConcreteMemento<T> implements Memento<T> {

  private state: T;

    private date: string;

    constructor(state: T) {
        this.state = state;
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

    /**
     * The Originator uses this method when restoring its state.
     */
    public getState(): T {
        return this.state;
    }

    public getDate(): string {
        return this.date;
    }

}
