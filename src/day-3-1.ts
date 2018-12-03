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

function initFabricForDisplay(xLength: number, yLength: number): Array < Array < string > > {
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

    let xLength: number = (claim.XLength + claim.XCoord);
    let yLength: number = (claim.YLength + claim.YCoord);

    for (let x: number = claim.XCoord; x < xLength; x++) {
        for (let y: number = claim.YCoord; y < yLength; y++) {
            if (result[y][x] === ".") {
                result[y][x] = "C";
            } else {
                result[y][x] = "X";
            }
        }
    }

    return result;
}

let inputFileName: string = "./input/input-3-1.txt";

let fabric: Array < Array < string > > = initFabricForDisplay(1000, 1000);

fs.readFile(inputFileName, "utf8", (err, contents) => {
    if (err) {
        throw err;
    }

    let claims: Array < Claim > = contents.split("\r\n")
        .map(line => new Claim(line));
});

let numberOfInches: number = 0;

console.log(fabric
    .filter(line => line.indexOf("X") > -1)
    .length);

console.log(numberOfInches);