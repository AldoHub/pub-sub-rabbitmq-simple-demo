const amqp = require("amqplib/callback_api");

/** NOTE --- start docker and the rabbitmq container for this to work */


//connect to amqp
amqp.connect("amqp://localhost", (err, conn) => {
    if(err) throw err;

    //listener
    conn.createChannel((err, channel) => {
        if(err) throw err;

        let queueName = "testQueue";
        let message = "This is a test message";
        
        //creates the queue if doesnt exist
        channel.assertQueue(queueName, {
            durable: false //if set true - when there is no subscriber, this queue will be deleted
        });

        channel.sendToQueue(queueName, Buffer.from(message));
        console.log(`Message: ${message}`)
        
        //close the connection after 1 sec
        setTimeout(() => {
            conn.close();
        }, 1000);

    })

})