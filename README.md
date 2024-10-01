# WhatsApp Profile Picture Retriever

This script allows you to retrieve and download WhatsApp profile pictures using phone numbers. Follow the steps below to set up and run the script.

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- A valid account and phone connected to [whapi.cloud](https://whapi.cloud).

## Setup Guide

### 1. Register at Whapi Cloud
- Visit [whapi.cloud](https://whapi.cloud) and create an account.
- Follow the instructions to connect your phone to their API service, which allows automation for WhatsApp.

### 2. Get Your API Token
- Once your phone is connected, you will receive an API token. This token is required for the script to make API requests.

### 3. Prepare Your Data
- Create a `phones.csv` file in the root folder of the script. This file should contain phone numbers in the first column, without any headers.

### 4. Configure the Script
- Open the `config.ts` file and add the API token(s) obtained in Step 2.
- You can also set custom pause durations between API requests to reduce the risk of getting blocked by WhatsApp.

### 5. Install Dependencies and Run the Script

- Open a terminal in the script's root folder and run the following commands:

```bash
npm i
npm run start
