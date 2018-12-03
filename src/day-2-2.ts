import fs = require("fs");

let inputFileName: string = "./input/test-2-2.txt";

function onlyOneCharacterDifference(stringOne: string, stringTwo: string): boolean {
    let numberOfDifferences: number = 0;

    let stringOneArray: Array < string > = stringOne.split("");
    let stringTwoArray: Array < string > = stringTwo.split("");

    for (var index: number = 0; index < stringOneArray.length && index < stringTwoArray.length; index++) {
        if (!(stringOneArray[index] === stringTwoArray[index])) {
            numberOfDifferences++;
        }
    }

    return numberOfDifferences === 1;
}

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    var lines: Array < string > = contents.split("\r\n");

    let found: boolean = false;
    let originalLine: string = "";
    let otherLine: string = "";

    for (var lineIndex: number = 0; lineIndex < lines.length && !found; lineIndex++) {
        originalLine = lines[lineIndex];

        let otherLines: Array < string > = lines
            .filter(otherLine => !(originalLine === otherLine));

        for (var otherLineIndex: number = 0; otherLineIndex < otherLines.length && !found; otherLineIndex++) {
            otherLine = otherLines[otherLineIndex];

            found = onlyOneCharacterDifference(originalLine, otherLine);
        }
    }

    console.log(originalLine);
    console.log(otherLine);

    // lines
    //     .forEach(line => {
    //         console.log("Original Line: " + line);
    //         console.log("");

    //         let differentLine: Array < string > = lines.filter(otherLines => {
    //             return !(line === otherLines);
    //         }).filter(otherLine => {
    //             return onlyOneCharacterDifference(line, otherLine);
    //         });

    //         differentLine
    //             .forEach(o => console.log(o));
    //     });
});