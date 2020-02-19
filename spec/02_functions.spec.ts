describe('writing functions', () => {
    describe('how to create them', () => {
        it('the syntax', () => {


            expect(add(2, 2)).toBe(4);
            // named function
            function add(a: number, b: number): number {
                return a + b;
            }

            // anonymous functions

            type MathOperation = (a: number, b: number) => number;

            const multiply: MathOperation = function (a: number, b: number): number {
                return a * b;
            };

            const divide: MathOperation = (a: number, b: number) => a / b;

            expect(multiply(2, 3)).toBe(6);
            expect(divide(10, 2)).toBe(5);

            let someOp: MathOperation;
            someOp = multiply;
            expect(someOp(3, 3)).toBe(9);
            someOp = divide;
            expect(someOp(20, 10)).toBe(2);

            someOp = (a, b) => a - b;
            expect(someOp(10, 2)).toBe(8);


        });

        describe('some things about parameters to functions', () => {
            it('does not allow you to overload a function', () => {

                function formatName(first: string, last: string, mi?: string) {
                    let fullName = `${last}, ${first}`;
                    if (mi) {
                        fullName += ` ${mi}.`;
                    }
                    return fullName;
                }

                expect(formatName('Han', 'Solo')).toBe('Solo, Han');
                expect(formatName('Han', 'Solo', 'D')).toBe('Solo, Han D.');
            });

            it('default values', () => {

                function add(a: number = 10, b: number = 5, ...rest: number[]) {
                    const firstTwo = a + b;
                    return rest.reduce((state, next) => state + next, firstTwo);
                }

                expect(add()).toBe(15);
                expect(add(20)).toBe(25);
                expect(add(2, 2)).toBe(4);
                expect(add(undefined, 20)).toBe(30);
                expect(add(1, 2, 3, 4, 5, 6, 7, 8, 9)).toBe(45);
            });
        });

    });
    describe('higher order functions', () => {
        it('functions that take a function', () => {

            type MathOperation = (a: number, b: number) => number;

            function messItUp(a: number, b: number, c: MathOperation) {
                a += a;
                b += b;
                return c(a, b);
            }

            expect(messItUp(2, 3, (a, b) => a + b)).toBe(10);
            expect(messItUp(5, 10, (x, y) => x * y)).toBe(200);

        });
        describe('HOF that returns a function', () => {
            it('doing it old-skool', () => {

                function makeElement(tag: string, content: string): string {
                    return `<${tag}>${content}</${tag}>`;
                }

                expect(makeElement('h1', 'Hello')).toBe('<h1>Hello</h1>');
                expect(makeElement('h1', 'Bye')).toBe('<h1>Bye</h1>');
                expect(makeElement('p', 'Story')).toBe('<p>Story</p>');
            });

            it('doing it using a class (OOP Style)', () => {

                class TagMaker {

                    private tag: string;
                    constructor(tag: string) {
                        this.tag = tag;
                    }

                    make(content: string) {
                        return `<${this.tag}>${content}</${this.tag}>`;
                    }
                }

                const h1Maker = new TagMaker('h1');
                const pMaker = new TagMaker('p');

                expect(h1Maker.make('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker.make('Bye')).toBe('<h1>Bye</h1>');
                expect(pMaker.make('Story')).toBe('<p>Story</p>');


            });

            it('doing it with a higher-order function', () => {

                function tagMaker(tag: string) {
                    return (content: string) => `<${tag}>${content}</${tag}>`;
                }

                const h1Maker = tagMaker('h1');
                const pMaker = tagMaker('p');

                expect(h1Maker('Hello')).toBe('<h1>Hello</h1>');
                expect(h1Maker('Bye')).toBe('<h1>Bye</h1>');
                expect(pMaker('Story')).toBe('<p>Story</p>');
            });
        });
    });
});

describe('array methods', () => {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    it('look at each of them', () => {
        numbers.forEach(n => console.log('Got ', n));
    });
    describe('that return new arrays', () => {
        it('filter', () => {
            const evens = numbers.filter(isEven);
            expect(evens).toEqual([2, 4, 6, 8]);

            function isEven(n: number): boolean {
                return n % 2 === 0;
            }
        });

        it('map', () => {

            const result = numbers.map(n => n * 2);
            expect(result).toEqual([2, 4, 6, 8, 10, 12, 14, 16, 18]);
        });
    });

    describe('some methods that return a single (scalar) value', () => {
        it('checking the membership', () => {
            expect(numbers.some(n => n % 2 === 0)).toBeTrue();
            expect(numbers.every(n => n % 2 === 0)).toBeFalse();
        });

        it('reduce', () => {

            expect(numbers.reduce((s, n) => s + n)).toBe(45);
            expect(numbers.reduce((s, n) => s + n, 100)).toBe(145);
        });
    });
});
describe('a couple of examples', () => {
    it('working with something other than integers', () => {
        interface Vehicle { vin: string; make: string; model: string; year: number; mileage: number; }
        const data: Vehicle[] = [
            { vin: '3893839', make: 'Ford', model: 'Explorer', year: 2013, mileage: 100_013 },
            { vin: '7038938', make: 'Honda', model: 'Pilot', year: 2019, mileage: 1_323 },
            { vin: '8399393', make: 'Chevy', model: 'Bolt', year: 2018, mileage: 223_338 }
        ];

        // YOUR CODE HERE
        // Using on statement, find all the vehciles that have more that 100_000 miles and give me the make and model as below.
        const results = data
            .filter(v => v.mileage > 100_000)
            .map(v => `${v.make} ${v.model}`);

        expect(results).toEqual(['Ford Explorer', 'Chevy Bolt']);

        // another one to try - what is the total mileage of all vehicles older than 2015?

        const totalMileage = data // vehicle[].length === 3
            .filter(v => v.year > 2015) // vehicle[].length === 2
            .map(v => v.mileage)  // number[]
            .reduce((s, n) => s + n); // number

        expect(totalMileage).toEqual(1_323 + 223_338);
    });

    it('simple redux for dummies', () => {

        interface State {
            count: number;
        }

        const initialState: State = {
            count: 0
        };

        interface Action { type: string; }

        class Increment implements Action {
            readonly type = 'Increment';
        }

        class Decrement implements Action {
            readonly type = 'Decrement';
        }
        class Reset implements Action {
            readonly type = 'Reset';
        }

        const allTheThingsThatHappened: Action[] = [
            new Increment(),
            new Increment(),
            new Increment(),
            new Increment(),
            new Reset(),
            new Increment(),
            new Increment(),
            new Increment(),
            new Decrement(),
            new Increment()
        ];

        const finalCount = allTheThingsThatHappened.reduce((s: State, n: Action) => {
            switch (n.type) {
                case 'Increment':
                    return {
                        count: s.count + 1
                    };
                case 'Decrement':
                    return {
                        count: s.count - 1
                    };

                case 'Reset': {
                    return initialState;
                }
            }
        }, initialState);

        expect(finalCount.count).toBe(3);
    });
});
