module.exports = {
    ipServer: "insert-your-ip-server here or 'localhost' if you are running the server on your local machine",
    port: "insert-your-port here or 5000 if you are running the server on your local machine",
}

/* For example, if you are running the server on your local machine, the config object would look like this :

const config = {
    ipServer: "localhost",
    port: "5001",
}

But if you are running the server on a remote machine, you would replace the values with the IP address and
the port of the remote machine.  For example :

const config = {
    ipServer: "123.456.78.90",
    port: "1234",
}

*/