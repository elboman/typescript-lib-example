import * as moment from 'moment';

export class Greeter {
    constructor(public greeting: string) { }
    greet() {
        if (typeof moment !== 'undefined') {
            console.log('it is now: ', moment().format());
        } else {
            console.log('it is now: ', new Date().toString());
        }
        return `Hello, ${this.greeting}!`;
    }
}