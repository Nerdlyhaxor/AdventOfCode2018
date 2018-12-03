import fs = require("fs");

function unique(arr: Array < string > ): Array < string > {
    let uniqueArray: Array < string > = [];

    arr.forEach((c) => {
        if (uniqueArray.indexOf(c) === -1) {
            uniqueArray.push(c);
        }
    });

    return uniqueArray;
}

function hasMultipleCharacters(s: string, num: number): boolean {

    var charArray: Array < string > = s.split("");
    var uniqueArray: Array < string > = unique(charArray);

    var found: boolean = false;

    for (var index: number = 0; index < uniqueArray.length && !found; index++) {
        found = charArray
            .filter((value) => uniqueArray[index] === value)
            .length === num;
    }

    return found;
}

let inputFileName: string = "./input/input-2-1.txt";

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }
    let numberContainsTwo: number = 0;
    let numberContainsThree: number = 0;

    contents.split("\r\n")
        .forEach(value => {
            if (hasMultipleCharacters(value, 2)) {
                numberContainsTwo++;
            }

            if (hasMultipleCharacters(value, 3)) {
                numberContainsThree++;
            }
        });

    console.log("Two: " + numberContainsTwo);
    console.log("Three: " + numberContainsThree);
    console.log("Checksum: " + numberContainsTwo * numberContainsThree);
});