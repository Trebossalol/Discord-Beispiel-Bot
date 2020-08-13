// Node Module
const fs = require('fs');
const INI = require('ini');
const Discord = require('discord.js');

// Discord.js Zeug
const Client = new Discord.Client({ disableEveryone: true });
Client.Commands = new Discord.Collection();
Client.Events = new Discord.Collection();

// Config und Aktionen importieren
const Config = INI.parse(fs.readFileSync('./config.ini', 'utf-8'));
const Actions = INI.parse(fs.readFileSync('./actions.ini', 'utf-8'));


// Bot-Funktion exportieren
module.exports = () => {

    // Befehle laden
    const cmd_keys = Object.keys(Actions);
    cmd_keys.forEach(key => {
        const [ type, name ] = key.split(':')
        if (type === 'command') Client.Commands.set(name, Actions[key])
        else Client.Events.set(name, Actions[key])
    });


    // Event: Nachricht erhalten
    Client.on('message', async (message) => {

        // Author der Nachricht darf kein Bot sein
        if (message.author.bot) return;

        // Lese ggf. Prefix und Befehlsname aus Nachricht
        var messageArray = message.content.split(" ");
        var command = messageArray[0].slice(config.prefix.length);
        if (!Config.caseSensitive) command = command.toLowerCase();
        const args = messageArray.slice(1);

        // Überprüfen ob Nachricht Befehl beinhaltet, wenn ja wird der Befehl ausgeführt
        let cmdcontet = Client.Commands.get(command);
        if(cmdcontet) require('./exec_cmd')(Client, Config, message, cmdcontet, args);
        
    });

    Client.login(Config.token)
};