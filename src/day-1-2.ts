import fs = require("fs");

let inputFileName: string = "./input/input-1-2.txt";
let frequency: number = 0;
let frequencies: number[] = [0];
let found: boolean = false;

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let array: string[] = contents.split("\r\n");

    while (!found) {
        for (var i: number = 0; i < array.length && !found; i++) {
            let frequencyChange: number = parseInt(array[i], 10);

            frequency += frequencyChange;

            if (frequencies.indexOf(frequency) > -1 && !found) {
                found = true;
            } else {
                frequencies.push(frequency);
            }
        }
    }

    if (found) {
        console.log(frequency);
    } else {
        console.log("Not Found!");
    }
});