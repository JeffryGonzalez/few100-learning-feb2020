describe('declaring variables', () => {
    describe('using let', () => {
        it('uninitialized let', () => {
            let x: any;

            x = 12;
            expect(x).toBe(12);

            x = 'Pizza';
            expect(x).toBe('Pizza');
        });
        it('using a typed let', () => {
            let x: number;

            x = 12;
            expect(x).toBe(12);

            // x = 'Pizza';
            // expect(x).toBe('Pizza');
        });
        it('using an intialized let', () => {
            let x = 12;

            expect(x).toBe(12);

            // x = 'Tacos'; // nope! it is a number!

            x = 42;

            const PI = 3.14;

        });
    });
    describe('using const', () => {
        it('protects you from reassigning a variable', () => {
            const minimumAge = 21;

            // minimumAge = 13;

            const friends = ['Sean', 'Amy', 'Jessika'];

            friends[0] = 'Byron';

            expect(friends).toEqual(['Byron', 'Amy', 'Jessika']);

            const message = { from: 'Stacey', note: 'Get Milk' };

            // message = {};
            message.note = 'Get Soy Milk';

            const name = 'Bob Dylan';


            console.log('Pizza');

        });
    });
    describe('advanced types', () => {
        it('has union types', () => {
            let x: number | string;

            x = 12;

            x = 'Puppy';

            expect(x).toBe('Puppy');

        });
        it('type aliases', () => {
            type ThingWithLettersAndStuff = string;

            let name: ThingWithLettersAndStuff;

            name = 'Putintane';

            type NumberOrString = number | string;

            type CreditCardNumber = string;
            interface Person {
                name: string;
                age: number;
                cc: CreditCardNumber;
            }

        });
    });

    describe('some of the built-in types', () => {
        it('has numbers', () => {
            const n1 = 3;
            const n2 = 3.14;
            const n3 = 0xFF; // Hexadecimal (base 16)
            const n4 = 0o22; // Base 8
            const n5 = 0b1010; // base 2 (binary)
            const myPay = 1_333_222;

            let x: number;

            x = n1;
            x = n2;
            x = n3; // etc. etc.
        });

        it('has strings', () => {
            const s1 = 'This is a string';
            // tslint:disable-next-line: quotemark
            const s2 = "Double Quote";

            const s3 = 'She said "Ok"';
            // tslint:disable-next-line: quotemark
            const s4 = "The name is Flanner O'Connor";

            const s5 = 'It is Four O\'Clock';



        });

        it('template strings', () => {

            // These are back-tick delimited.

            const s1 = `Jeff`;
            const story = `Chapter 1.

            It was a dark and stormy night.

            The end.`;

            const age = 50;

            const s3 = 'The name is ' + s1 + ' and the age is ' + age + '.';
            const s4 = `The name is ${s1} and the age is ${age}.`;

            expect(s3).toEqual(s4);

            const someHtml = `<main>
            <h1>Hello, World!</h1>
            <p>The story is here</p>
            </main>`;
        });
    });
    it('what is so bad about the var keyword??', () => {
        // var name = 'Jeff';

        const age = 27;

        if (age >= 18) {

            // tslint:disable-next-line: no-var-keyword
            var message = 'Old Enough';
        }

        expect(message).toBe('Old Enough');
    });

    describe('arrays', () => {
        it('has a literal syntax', () => {


            const friends = ['Amy', 'David', 'Jessika'];
            const someCrazyArray = [1, 2, 'tacos', ['bread', 'wine'], friends];

            expect(someCrazyArray[4][1]).toBe('David');

            expect(friends[0]).toBe('Amy');


            friends[1] = 'Dave';
            expect(friends[1]).toBe('Dave');

            // friends[2] = 99; // NO! This is an array of strings!

            const what = friends[999];
            expect(what).toBeUndefined();

            friends[999] = 'Gaia';

            expect(friends[999]).toBe('Gaia');
        });
        it('more on declaring them', () => {
            let favoriteNumbers: number[]; // an array of numbers.

            let favoriteNumbers2: Array<number>;

            let stuff: (number | string)[];
            let stuff2: Array<number | string>;

            stuff2 = [12, 'tacos'];

        });
    });

    describe('solving problems with tuples', () => {
        it('first the problem, without a tuple', () => {
            function formatName(first: string, last: string): { fullName: string, numberOfLetters: number } {
                const result = `${last}, ${first}`;
                return {
                    fullName: result,
                    numberOfLetters: result.length
                };
            }

            const formattingResponse = formatName('Han', 'Solo');

            expect(formattingResponse.fullName).toBe('Solo, Han');
            expect(formattingResponse.numberOfLetters).toBe(9);

            const { fullName: hisName } = formatName('Kylo', 'Ren'); // object destructuring
            expect(hisName).toBe('Ren, Kylo');

            const movie = {
                title: 'Jaws',
                director: 'Spielberg',
                yearReleased: 1977
            };

            // const { title, director: by } = movie;
            // expect(title).toBe('Jaws');
            // expect(by).toBe('Spielberg');

            const title = movie.title;
            const by = movie.director;
            expect(title).toBe('Jaws');
            expect(by).toBe('Spielberg');


        });
        it('doing it with a tuple', () => {

            function formatName(first: string, last: string): [string, number] {
                const result = `${last}, ${first}`;
                return [result, result.length];
            }

            const formattingResponse = formatName('Han', 'Solo');

            expect(formattingResponse[0]).toBe('Solo, Han');
            expect(formattingResponse[1]).toBe(9);

            const [name, letters] = formatName('Kylo', 'Ren');
            expect(name).toBe('Ren, Kylo');
            expect(letters).toBe(9);


        });
    });
});
