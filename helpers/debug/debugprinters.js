const colors = require('colors');
colors.setTheme({
    error:['black','bgRed'],
    success:['black','bgGreen'],
    requests:['black','bgWhite']
})

const printers={
    errorPrint: (message) => {
        console.log(colors.error(message));
    },

    successPrint: (message) => {
        console.log(colors.success(message));

    },

    requestPrint:(message) =>{
        console.log(colors.requests(message));

    }
}

module.exports = printers;