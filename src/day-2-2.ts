import fs = require("fs");

let inputFileName: string = "./input/input-2-2.txt";


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

function getSameCharacters(stringOne: string, stringTwo: string): string {
    let result: Array < string > = [];

    for (var index: number = 0; index < stringOne.length && index < stringTwo.length; index++) {
        if (stringOne[index] === stringTwo[index]) {
            result.push(stringOne[index]);
        }
    }

    return result.join("");
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

    console.log(getSameCharacters(originalLine, otherLine));
});