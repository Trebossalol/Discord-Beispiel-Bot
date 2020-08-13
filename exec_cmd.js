module.exports = (Client, Config, Message, Data, args) => {

    const { msg } = Data;
    const message = Message;
    const repPatterns = [
        [ /\$userid/g, message.author.id ],
        [ /\$usertag/g, message.author.tag ]
    ];

    if(msg) {
        let msg_to_send = msg;
        repPatterns.forEach(pattern => msg_to_send = msg_to_send.replace(pattern[0], pattern[1]));
        message.channel.send(`${msg_to_send}`)
        return true
    };

};