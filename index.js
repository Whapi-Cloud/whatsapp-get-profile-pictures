const { Main, CSV } = require("./core/index");
const { config } = require("./config")

async function start() {
    const tokens = config.tokens;
    const csv = new CSV();
    const phones = csv.readPhonesFromCSV("./phones.csv");
    const main = new Main(tokens);
    await main.massGetPictures(phones);
}

start().then()