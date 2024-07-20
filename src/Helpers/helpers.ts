export const formatString = (input: string): [string, string, string, string] => {
    const MAX_LENGTH = 14;
    const MAX_LINES = 4;
    const result: [string, string, string, string] = ["", "", "", ""];
    const words = input.split(" ");

    let currentLine = 0;
    let currentLength = 0;

    for (const word of words) {
        if (currentLength + word.length + (result[currentLine].length > 0 ? 1 : 0) <= MAX_LENGTH) {
            if (result[currentLine].length > 0) {
                result[currentLine] += " ";
                currentLength += 1;
            }
            result[currentLine] += word;
            currentLength += word.length;
        } else {
            currentLine += 1;
            if (currentLine >= result.length) {
                break;
            }
            result[currentLine] = word;
            currentLength = word.length;
        }
    }

    const nonEmptyLines = result.filter((line) => line.length > 0).length;

    // Adjust padding for non-empty lines
    if (nonEmptyLines > 0 && nonEmptyLines < MAX_LINES) {
        const emptyLinesAbove = Math.floor((MAX_LINES - nonEmptyLines) / 2);
        const emptyLinesBelow = MAX_LINES - nonEmptyLines - emptyLinesAbove;

        const paddedResult: [string, string, string, string] = new Array(emptyLinesAbove)
            .fill(" ".repeat(MAX_LENGTH))
            .concat(result.filter((line) => line.length > 0))
            .concat(new Array(emptyLinesBelow).fill(" ".repeat(MAX_LENGTH))) as [string, string, string, string];

        for (let i = emptyLinesAbove; i < emptyLinesAbove + nonEmptyLines; i++) {
            const line = paddedResult[i];
            const spacesNeeded = MAX_LENGTH - line.length;
            const leftPadding = Math.floor(spacesNeeded / 2);
            const rightPadding = spacesNeeded - leftPadding;
            paddedResult[i] = " ".repeat(leftPadding) + line + " ".repeat(rightPadding);
        }

        return paddedResult;
    }

    return result.map((line) => {
        const spacesNeeded = MAX_LENGTH - line.length;
        const leftPadding = Math.floor(spacesNeeded / 2);
        const rightPadding = spacesNeeded - leftPadding;
        return " ".repeat(leftPadding) + line + " ".repeat(rightPadding);
    }) as [string, string, string, string];
}

export const randomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const allLetter = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
]