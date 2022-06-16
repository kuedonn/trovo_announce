const { MessageEmbed, MessageAttachment } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const dotenv  = require('dotenv');
dotenv.config();


module.exports = {
    data:new SlashCommandBuilder()
    .setName('live')
    .setDescription('Trigger bot message on live')
    .addStringOption(option =>
        option.setName('input')
        .setDescription('user input')
        .setRequired(true)
    ),
async execute(interaction){
    const input = interaction.options.getString('input');
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
    const file = new MessageAttachment('./assets/soon.png');

    if (data.is_live==true){
        const embed = new MessageEmbed()
        .setAuthor({name: `${input} is now live on Trovo!`, url:`https://trovo.live/${input}`})
        .setTitle((data.live_title).toString())
        .setURL(`https://trovo.live/${input}`)
        .addField('Category',data.category_name,true)
        .addField('Viewers',(data.current_viewers).toString(),true)
        .setImage('attachment://soon.png')
        interaction.reply({embeds: [embed], files:[file]});
        }else{
            interaction.reply("Stream is not live(yet), check back later.");
        }
})
.catch(err=>console.log(err));
    },
};