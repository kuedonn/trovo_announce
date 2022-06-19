const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');

const dotenv  = require('dotenv');
dotenv.config();


module.exports = {
    data:new SlashCommandBuilder()  //create slash command
    .setName('live')
    .setDescription('Trigger bot message on live')
    .addStringOption(option =>        //create user input for the slash command
        option.setName('input')
        .setDescription('user input')
        .setRequired(true)
    ),
async execute(interaction){
    const input = interaction.options.getString('input');   // get user input
    const config = {                                        //get the config with the options for the api request
        method: 'POST',
        url: 'https://open-api.trovo.live/openplatform/channels/id',
        headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.CLIENT_ID,                     //you need to create a .env file with your client-id so its safe, you also need dotenv install
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:`{\"username\":\"${input}\"}`
    };
  await axios(config)
.then(response=> {
    const data = response.data;

    if (data.is_live==true){                  //if stream is live create the embed 
        const embed = new MessageEmbed()
        .setAuthor({name: `${input} is now live on Trovo!`, url:`https://trovo.live/${input}`})
        .setTitle((data.live_title).toString())
        .setURL(`https://trovo.live/${input}`)
        .addField('Category',data.category_name,true)
        .addField('Viewers',(data.current_viewers).toString(),true)
        .setImage(data.thumbnail)
        .setFooter({text:'Author: Kuedon#4714'})
        interaction.reply({embeds: [embed]});
        }else{
            interaction.reply("Stream is not live(yet), check back later.");
        }
})
.catch(err=>console.log(err));
    },
};