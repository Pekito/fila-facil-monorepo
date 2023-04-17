export class Observer {
    public readonly event: string;
    public readonly callback: Function;
	constructor (event: string, callback: Function) {
        this.event = event;
        this.callback = callback;
	}
}