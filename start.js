const Discord = require('discord.js');
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
    if (!message.content.startsWith('*') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    message.channel.send('Win $1.000.000 if you crack the code. (Example: 1234)');
    var code = (Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9) + Math.floor(Math.random() * 9)).toLocaleString();

    if(command == code)
    {
        message.channel.send('You won $1.000.000!!!');
        eco.AddToBalance(message.author.id, 1000000);
    }
    else
    {
        message.channel.send('Wrong Code.');
    }
})

client.on('message', async message => {
    if (!message.content.startsWith('-') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const delay = ms => new Promise(res => setTimeout(res, ms));

    if(command == 'help')
    {
        message.channel.send('Type [-start] to start or [-bal] to see your balance.');
    }

    if(command == 'start')
    {
        var output = await eco.FetchBalance(message.author.id)
        if (output.balance < 5) return message.reply('You need $5 to gamble.')
        
        eco.SubtractFromBalance(message.author.id, 5);

        msg = await message.channel.send('$25 Max. Type -C to CASHOUT!');
        var value = 0;
        var maxValue = Math.floor(Math.random() * 26);
        console.log(maxValue);

        stop = false;
        do
        {
            await delay(2000 + Math.floor(Math.random() * 1000));
                value++;
                //var response = message.channel.send('Prize is: $' + value.toString());
                
                msg.edit('Prize is: $' + value.toString())
        }
        while(!stop && value < maxValue)
        if(stop)
        {
            msg.edit('Prize is: $' + (value - 1).toString())
            message.channel.send('You won ' + (value - 1) + ' coins!');
            var output = await eco.FetchBalance(message.author.id)
            message.channel.send(`You own ${output.balance} coins now.`);
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

    if(command == 'free')
    {
        eco.AddToBalance(message.author.id, 5);
    }

    if (command === 'bal') {
 
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`You own ${output.balance} coins.`);
      }

      if (command === 'balance') {
 
        var output = await eco.FetchBalance(message.author.id)
        message.channel.send(`You own ${output.balance} coins.`);
      }

      

    if (command === 'spam') {

        const delay = ms => new Promise(res => setTimeout(res, ms));
        var tijd = 0;
        while (tijd <= 1000) {
            message.channel.send(message.author + ' Laat mij dit spammen!!!');
            await delay(1000);
            tijd += 1;
        }
      }
});

client.on('message', async message => {
    if (!message.content.startsWith('/') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log('Ja of Nee.');
    var members = message.guild.members.cache;
    console.log(members);
    const randMember = members.random(); 
    const answers = ["Ja!", "Nee.", "Misschien.", "No man.", `Nee, wel ${randMember}.`, "Sowieso.", "Tuurlijk niet man. STOOPID!", "Ofkors.", `Ja, ${randMember} ook.`];
    const random = Math.floor(Math.random() * answers.length);
    message.channel.send(answers[random]);
    console.log(answers[random]);
});

client.on('message', async message => {
    if (!message.content.startsWith('$') || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    function isNumeric(value) {
        return /^-?\d+$/.test(value);
    }

    if(isNumeric(command))
    {

     output = await eco.FetchBalance(message.author.id)
     console.log(output + 'And: ' + parseInt(command));
    if(output.balance < parseInt(command))
    {
        message.channel.send('You need ' + command + " more $$$.");
    }
    else{

    eco.SubtractFromBalance(message.author.id, parseInt(command));

    msg = await message.channel.send('We are playing "Accept or Decline!" You gave the ATM $' + command + ".");
    var d = parseInt(command);
    var b = d * 2;
    const random = Math.floor(Math.random() * b);
    const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1000);
        msg.edit(":white_check_mark:")
        await delay(1000);
        msg.edit(":red_circle:")
        await delay(1500);
        msg.edit(":white_check_mark:")
        await delay(1500);
        msg.edit(":red_circle:")
        await delay(2000);
        msg.edit(":white_check_mark:")
        await delay(2000);
        msg.edit(":red_circle:")
        await delay(2000);
    if(random < d)
    {
        msg.edit(":white_check_mark:");
        message.channel.send('Nice! You won $' + (parseInt(command) * 2).toLocaleString() + ".");
        eco.AddToBalance(message.author.id, parseInt(command) * 2);
    }
    else
    {
        msg.edit(":red_circle:");
        message.channel.send('Shit! You lost $' + command + ".");
    }
}
    }
})

