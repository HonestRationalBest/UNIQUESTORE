const express = require('express');
const config = require('config');
const mongoose = require('mongoose')
const path = require('path')
const app = express()

app.use(express.static('public'));
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api', require('./routes/users.routes'))
app.use('/api', require('./routes/add_to_cloudinary.routes'))
app.use('/api', require('./routes/collection.routes'))
app.use('/api', require('./routes/delete_account.routes'))

// const PORT =
//     config.get('port') ||
//     3001


if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'));

    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        var server = app.listen(process.env.PORT || 3001, function () {
            var port = server.address().port;
            console.log("Express is working on port " + port);
        });
        // app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (e) {
        console.log('Server Error', e.message);
    }
}

start()
