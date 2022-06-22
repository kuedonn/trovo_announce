const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const dotenv  = require('dotenv');
dotenv.config();

module.exports = {
    data:new SlashCommandBuilder()
    .setName('socials')
    .setDescription('Streamer socials')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('user input')
        .setRequired(true)
    ),
async execute(interaction){
    const inputt = interaction.options.getString('input');
    const input = inputt.toUpperCase();
    const config = {
        method: 'POST',
        url: 'https://open-api.trovo.live/openplatform/channels/id',
        headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.CLIENT_ID,
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:`{\"username\":\"${input}\"}`
    };
  await axios(config)
.then(response=> {
    const data = response.data;

    if (data.social_links[4]==null){
        const embed = new MessageEmbed()
    .setAuthor({name: `${input} socials!`, url: `https://trovo.live/${input}`})
    .addFields(
        {name:'Facebook',value: (data.social_links[1].url).toString()},
        {name:'Instagram', value:(data.social_links[2].url).toString()},
        {name:'Youtube', value: (data.social_links[3].url).toString()}
    )
    interaction.reply({ embeds:[embed]});
    }else{

    const embed = new MessageEmbed()
    .setAuthor({name: `${input} socials!`, url: `https://trovo.live/${input}`})
    .addFields(
        {name:'Facebook',value: (data.social_links[1].url).toString()},
        {name:'Instagram', value:(data.social_links[2].url).toString()},
        {name:'Twitter', value: (data.social_links[3].url).toString()},
        {name:'Youtube', value: (data.social_links[4].url).toString()}
    )
    interaction.reply({ embeds:[embed]}); 
    }  
})
},
};