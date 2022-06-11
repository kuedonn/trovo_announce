const { MessageEmbed, MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

const dotenv  = require('dotenv');
dotenv.config();


module.exports = {
    data:new SlashCommandBuilder()
    .setName('islive')
    .setDescription('Trigger bot message on live'),
async execute(interaction){
fetch('https://open-api.trovo.live/openplatform/channels/id', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: '{"username":"tiesel1"}'
}).then(response=>response.json())
.then(data=> {

    const file = new MessageAttachment('./assets/soon.png');

    if (data.is_live==true){
        const embed = new MessageEmbed()
        .setAuthor({name: 'Tiesel is now live on Trovo!', url:'https://trovo.live/tiesel1'})
        .setTitle((data.live_title).toString())
        .setURL('https://trovo.live/tiesel')
        .setImage('attachment://soon.png')
        interaction.reply({embeds: [embed], files:[file]});
        }else{
            interaction.reply("Stream is not live(yet), check back later.");
        }
})
.catch(err=>console.log(err));
    },
};