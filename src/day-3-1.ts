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

    for (let y: number = claim.YCoord; y < maxY; y++) {
        for (let x: number = claim.XCoord; x < maxX; x++) {
            if (result[y][x] === ".") {
                result[y][x] = "C";
            } else {
                result[y][x] = "X";
            }
        }
    }

    return result;
}

function displayFabric(fabric: Array < Array < string > > ): void {
    for (var row: number = 0; row < fabric.length; row++) {
        console.log(fabric[row].join(""));
    }
}

let inputFileName: string = "./input/input-3-1.txt";
// let inputFileName: string = "./testData/testData-3-1.txt";

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let fabric: Array < Array < string > > = initFabric(1000, 1000);

    contents.split("\r\n")
        .map(line => new Claim(line))
        .forEach(claim => {
            fabric = processClaim(fabric, claim);
        });

    let numberOfConflicts: number = 0;

    fabric
        .forEach(line => {
            line
                .forEach(cell => {
                    if (cell === "X") {
                        numberOfConflicts++;
                    }
                });
        });

    console.log(numberOfConflicts);
});

console.log("");
console.log("");

// let numberOfInches: number = 0;

// console.log(numberOfInches);