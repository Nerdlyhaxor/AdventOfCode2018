import fs = require("fs");

class Guard {
    Id: number = 0;

    constructor(Id: number) {
        this.Id = Id;
    }
}

let inputFileName: string = "./input/input-4-1.txt";
// let inputFileName: string = "./testData/testData-4-1.txt";

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let beginShiftPattern: RegExp = /\[(\d\d\d\d)\-(\d\d)\-(\d\d)\s(\d\d)\:(\d\d)]\sGuard\s#(\d+)\sbegins\sshift/;
    let fallsAsleepPattern: RegExp = /\[(\d\d\d\d)\-(\d\d)\-(\d\d)\s\d\d\:\d\d]\sfalls\sasleep/;
    let wakesUpPattern: RegExp = /\[(\d\d\d\d)\-(\d\d)\-(\d\d)\s\d\d\:\d\d]\swakes\sup/;

    let guards: Array < Guard > = [];

    guards.push(new Guard(10));
    // contents.split("\r\n")
    //     .sort()
    //     .forEach(line => {
    //         if (beginShiftPattern.test(line)) {
    //         }
    //     });
});

function findGuardById(guards: Array < Guard > , id: number): Guard | undefined {
    let index: number = guards
        .map(guard => guard.Id)
        .indexOf(id);

    if (index === -1) {
        return undefined;
    } else {
        return guards[index];
    }
}