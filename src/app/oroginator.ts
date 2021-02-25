import { Memento } from './memento';

/**
 * The Originator holds some important state that may change over time. It also
 * defines a method for saving the state inside a memento and another method for
 * restoring the state from it.
 */
export class Originator {
    /**
     * For the sake of simplicity, the originator's state is stored inside a
     * single variable.
     */
    private state: any;

    constructor(state: any) {
        this.state = state;
        console.log(`Originator: My initial state is: ${JSON.stringify(state)}`);
    }


    /**
     * Saves the current state inside a memento.
     */
    public save(state: any): Memento {
        return new Memento(state, 'actionName');
    }

    /**
     * Restores the Originator's state from a memento object.
     */
    public restore(memento: Memento): any {
        this.state = memento.state;
        console.log(`Originator: My state has changed to: ${JSON.stringify(this.state)}`);

        return this.state
    }
}
