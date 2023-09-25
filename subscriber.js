const amqp = require("amqplib/callback_api");

/** NOTE --- start docker and the rabbitmq container for this to work */

//connect to amqp
amqp.connect("amqp://localhost", (err, conn) => {
    if(err) throw err;

    //listener
    conn.createChannel((err, channel) => {
        if(err) throw err;

        let queueName = "testQueue";
         
        //creates the queue if doesnt exist
        channel.assertQueue(queueName, {
            durable: false //if set true - when there is no subscriber, this queue will be deleted
        });

        channel.consume(queueName, (msg) => {
            console.log(`Received: ${msg.content.toString()}`);
            //channel.ack(msg); //--- delete the message after acknowledging it (option 1)
        },{
            noAck: true //or can also delete the message automatically here (option 2)
        });


    })

})