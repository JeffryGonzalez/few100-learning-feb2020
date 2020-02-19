export class Employee {


    constructor(public firstName: string, public lastName: string, private currentSalary: number) { }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get salary(): number {
        return this.currentSalary;
    }

    giveRaise(amount: number) {
        this.currentSalary += amount;
    }
}
