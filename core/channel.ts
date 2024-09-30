import { Profile } from "../types";

export class Channel {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  async checkHealth() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`,
      }
    };

    const responseRaw = await fetch("https://gate.whapi.cloud/health?wakeup=false", options);
    const response = await responseRaw.json();
    if (responseRaw.status !== 200) throw responseRaw.status;
    if (response.status.text !== "AUTH") throw "Channel not auth";
  }

  async getProfileInfo(ContactID: string): Promise<Profile> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${this.token}`
      }
    };
    let responseRaw;
    try {
      responseRaw = await fetch(` https://gate.whapi.cloud/contacts/${ContactID}/profile`, options);
    }
    catch (e) {
      console.log(e)
      return await this.getProfileInfo(ContactID);
    }
    const response = await responseRaw.json();
    if (responseRaw.status !== 200) throw responseRaw.status;
    return response;
  }

  async getContacts(): Promise<string[]> {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.token}`
      }
    };

    const responseRaw = await fetch('https://gate.whapi.cloud/contacts', options);
    const response = await responseRaw.json();
    if (responseRaw.status !== 200) throw responseRaw.status;
    return response.contacts.map((elem) => elem.id);
  }
}
