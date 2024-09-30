import * as fs from "fs"

export class CSV {
    readPhonesFromCSV(path: string): string[] {
        if(!fs.existsSync(path)) throw "File not found"
        const rawData = fs
            .readFileSync(path, "utf-8")
            .replace(/(\r\n|\r|\n)/g, ",");
        const returnedData: string[] = rawData.split(",");
        returnedData.pop();
        return returnedData;
    }
}