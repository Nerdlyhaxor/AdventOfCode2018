import fs = require("fs");

let inputFileName: string = "./input/input-1-1.txt";
let frequency: number = 0;


fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let array: string[] = contents.split("\r\n");

    for (var i: number = 0; i < array.length; i++) {
        let frequencyChange: number = parseInt(array[i], 10);

        frequency += frequencyChange;
    }

    console.log(frequency);
});