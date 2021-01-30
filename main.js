﻿const Discord = require('discord.js');
const fetch = require('node-fetch');
//const { INTEGER } = require('sequelize/types');
const client = new Discord.Client();
const prefix = '.'
client.login(process.env.token);
var stop = new Boolean(false);
var eco = require('discord-economy');

client.on('ready', () => {
    console.log("Bot is logged on");
})

client.on('message', async message => {
    if (!message.content.startsWith('.') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    var url = ('https://artii.herokuapp.com/make?text=' + command);
    console.log(url);
    const response = await fetch(url);
    const data = await response.text();

    message.channel.send('```' + data + '```');

})

client.on('message', async message => {
    if (!message.content.startsWith('-') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    if(command == 'start')
    {
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < 5) return message.reply('You need $5 to gamble.')
        
        eco.SubtractFromBalance(message.author.id, 5);

        msg = await message.channel.send('$26 Max');
        var value = 0;
        var maxValue = Math.floor(Math.random() * 26);
        console.log(maxValue);

        stop = false;
        do
        {
            await delay(2000);
                value++;
                //var response = message.channel.send('Prize is: $' + value.toString());
                
                msg.edit('Prize is: $' + value.toString())
        }
        while(!stop && value < maxValue)
        if(stop)
        {
            message.channel.send('You won ' + value + ' coins!');
            eco.AddToBalance(message.author.id, value);
        }
        if(value >= maxValue)
        {
            message.channel.send('You lost!');
        }
        stop = false;
        console.log('Stop');
    }

    if(command == 'cashout')
    {
        stop = true;
    }

    if(command == 'c')
    {
        stop = true;
    }

    if(command == 'add')
    {
        eco.AddToBalance(message.author.id, 5);
    }

    if (command === 'bal') {
 
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`You own ${output.balance} coins.`);
      }
});

