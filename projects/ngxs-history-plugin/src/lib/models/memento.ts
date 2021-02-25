
/**
 * The Memento provides a way to retrieve the memento's metadata, such
 * as creation date or name. However, it doesn't expose the Originator's state.
 */
export class Memento {

    public date: string;

    constructor(public state: any, public actionName: string) {
        this.date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    }

}
