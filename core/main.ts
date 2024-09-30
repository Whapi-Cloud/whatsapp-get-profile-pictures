import { Channel } from "./channel";
import { config } from "../config"
import * as fs from "fs"

export class Main {

    usedChannels: string[];
    notUsedChannels: string[];
    constructor(channels: string[]) {
        this.notUsedChannels = channels;
        this.usedChannels = [];
    }

    async downloadPicture(url: string, fileName: string) {
        console.log(url)
        const responseRaw = await fetch(url, { method: "GET" });
        const blob = await responseRaw.blob();
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync(`./pictures/${fileName}.jpg`, buffer)
    }

    async oneGetPicture(phone: string) {
        const timeOfComplete = new Date();
        const channel = await this.selectRandomChannel();
        let profile;
        try{
            profile = await channel.getProfileInfo(phone);
        }
        catch(e){
            console.log(`${phone}, ${JSON.stringify(e)}`);
            return;
        }

        console.log(profile)
        if (!profile.icon_full) {
            console.log(`Profile picture don't get for profile ${phone}.`)
        }
        else {
            await this.downloadPicture(profile.icon_full, phone);
        }
        console.log(`${channel.token} in ${timeOfComplete}`)
    }

    async massGetPictures(phones: string[]) {
        let queue = 1;
        for (let j = 0; j < phones.length; j++) {
            const phone = phones[j];
            setTimeout(this.oneGetPicture.bind(this), config.delay * queue, phone);
            queue++;
        }
    }

    async selectRandomChannel() {
        if (this.notUsedChannels.length === 0) {
            this.usedChannels.map(token => this.notUsedChannels.push(token));
            this.usedChannels = []
        }
        // get random channel
        const randomIndex = this.randomIntFromInterval(0, this.notUsedChannels.length - 1); // random index of array
        const token = this.notUsedChannels[randomIndex]
        const channel = new Channel(token); // create instance of channel
        try {
            await channel.checkHealth(); //check channel status
        } catch (e) {
            // console.log("Select random channel e: ", e)
            if (e === 401) {
                // if channel not auth - remove him from tokens array in config and try new
                console.log(
                    `Token ${this.notUsedChannels[randomIndex]} - unauth. Remove from config file.`
                );
                this.notUsedChannels.splice(randomIndex, 1)
                return await this.selectRandomChannel();
            }
            return await this.selectRandomChannel();
        }
        this.usedChannels.push(token);
        this.notUsedChannels.splice(randomIndex, 1);
        return channel;
    }
    randomIntFromInterval(min, max) {
        if(min === max) return min;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}