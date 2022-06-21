const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const dotenv  = require('dotenv');
dotenv.config();

//this is to create slash commands inside of discord on a server


const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('js'));

for (const file of commandFiles){
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({version:9}).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands})
.then(() => console.log("Succesfully registered application commands"))
.catch(console.error);