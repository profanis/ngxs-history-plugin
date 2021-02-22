import { Memento } from './memento';

/**
 * The Originator holds some important state that may change over time. It also
 * defines a method for saving the state inside a memento and another method for
 * restoring the state from it.
 */
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
        return new Memento(state, 'actionName');
    }

    /**
     * Restores the Originator's state from a memento object.
     */
    public restore(memento: Memento<T>): T {
        this.state = memento.state;
        console.log(`Originator: My state has changed to: ${JSON.stringify(this.state)}`);

        return this.state
    }
}
