import fs = require("fs");

class Claim {
    ClaimNumber: number = 0;
    XCoord: number = 0;
    YCoord: number = 0;
    XLength: number = 0;
    YLength: number = 0;

    constructor(claimText: string) {
        let pattern: RegExp = /#(\d+)\s@\s(\d+),(\d+):\s(\d+)x(\d+)/;
        let claimInfo: RegExpExecArray | null = pattern.exec(claimText);

        if (claimInfo != null) {
            this.ClaimNumber = Number(claimInfo[1]);
            this.XCoord = Number(claimInfo[2]);
            this.YCoord = Number(claimInfo[3]);
            this.XLength = Number(claimInfo[4]);
            this.YLength = Number(claimInfo[5]);
        }
    }
}

function initFabric(xLength: number, yLength: number): Array < Array < string > > {
    let fabric: Array < Array < string > > = [];

    for (var xIndex: number = 0; xIndex < xLength; xIndex++) {

        fabric.push([]);

        for (var yIndex: number = 0; yIndex < yLength; yIndex++) {
            fabric[xIndex].push(".");
        }
    }

    return fabric;
}

function processClaim(fabric: Array < Array < string > > , claim: Claim): Array < Array < string > > {
    let result: Array < Array < string > > = fabric;

    let maxX: number = claim.XCoord + claim.XLength;
    let maxY: number = claim.YCoord + claim.YLength;

    for (let yPoint: number = claim.YCoord; yPoint < maxY; yPoint++) {
        for (let xPoint: number = claim.YCoord; xPoint < maxX; xPoint++) {
            if (result[yPoint][xPoint] === ".") {
                result[yPoint][xPoint] = "C";
            } else {
                result[yPoint][xPoint] = "X";
            }
        }
    }

    displayFabric(result);

    return result;
}

function displayFabric(fabric: Array < Array < string > > ): void {
    for (var row: number = 0; row < fabric.length; row++) {
        console.log(fabric[row].join(""));
    }
}

// let inputFileName: string = "./input/input-3-1.txt";
let inputFileName: string = "./testData/testData-3-1.txt";

let fabric: Array < Array < string > > = initFabric(10, 10);

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let claims: Array < Claim > = contents.split("\r\n")
        .map(line => new Claim(line));

    for (var i: number = 0; i < claims.length; i++) {
        fabric = processClaim(fabric, claims[i]);
    }
});

displayFabric(fabric);
console.log("");

// let numberOfInches: number = 0;

// console.log(numberOfInches);