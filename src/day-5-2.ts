import fs = require("fs");

function createPattern(): RegExp {

    let upperCaseBase: number = 65;
    let lowerCaseBase: number = 97;

    let patternArray: Array < string > = [];

    for (var i: number = 0; i <= 25; i++) {
        let lowerCaseLetter: string = String.fromCharCode(lowerCaseBase + i);
        let upperCaseLetter: string = String.fromCharCode(upperCaseBase + i);

        patternArray.push(`${lowerCaseLetter}${upperCaseLetter}|${upperCaseLetter}${lowerCaseLetter}`);
    }

    return new RegExp(`${patternArray.join("|")}`);
}

function createRemovalPattern(): Array < RegExp > {

    let upperCaseBase: number = 65;
    let lowerCaseBase: number = 97;

    let patternArray: Array < RegExp > = [];

    for (var i: number = 0; i <= 25; i++) {
        let lowerCaseLetter: string = String.fromCharCode(lowerCaseBase + i);
        let upperCaseLetter: string = String.fromCharCode(upperCaseBase + i);

        patternArray.push(new RegExp(`${lowerCaseLetter}|${upperCaseLetter}`, "g"));
    }

    return patternArray;
}

function processInput(input: string): number {
    let pattern: RegExp = createPattern();

    while (pattern.test(input)) {
        input = input.replace(pattern, "");
    }

    return input.length;
}

let isTesting: boolean = false;

let inputFileName: string = !isTesting ?
    "./input/input-5-1.txt" :
    "./testData/testData-5-1.txt";

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let shortestStringLength: number | null = null;

    createRemovalPattern()
        .sort()
        .forEach(removalPattern => {
            let trimmedContents: string = contents.replace(removalPattern, "");
            let lengthOfProcessedContent: number = processInput(trimmedContents);

            if(!shortestStringLength || lengthOfProcessedContent < shortestStringLength) {
                shortestStringLength = lengthOfProcessedContent;
            }
    });

    console.log(shortestStringLength);
});