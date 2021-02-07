import { Memento } from './Imemento';
import { ConcreteMemento } from './memento.service';

export class Originator<T> {
    /**
     * For the sake of simplicity, the originator's state is stored inside a
     * single variable.
     */
    private state: T;

    constructor(state: T) {
        this.state = state;
        console.log(`Originator: My initial state is: ${JSON.stringify(state)}`);
    }


    /**
     * Saves the current state inside a memento.
     */
    public save(state: T): Memento<T> {
        return new ConcreteMemento(state);
    }

    /**
     * Restores the Originator's state from a memento object.
     */
    public restore(memento: Memento<T>): T {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to: ${this.state}`);

        return this.state
    }
}
