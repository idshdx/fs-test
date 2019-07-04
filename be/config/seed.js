const seeder = require('mongoose-seed'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config')[env];

// Connect to MongoDB via Mongoose
seeder.connect(config.db, function() {

    // Load Mongoose models
    seeder.loadModels([
        './app/models/client.js',
        './app/models/provider.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['Client', 'Provider'], function() {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function() {
            seeder.disconnect();
        });

    });
});

const data = [
    {
        'model': 'Client',
        'documents': [
            {
                'name': 'Client 1',
                'email': 'client@client.ro',
                'phone': 1234567899,
            },
            {
                'name': 'Funny client',
                'email': 'client@fun.com',
                'phone': 1234512345
            },
            {
                'name': 'Not so funny client',
                'email': 'client@nofun.com',
                'phone': 1234512346
            },
            {
                'name': 'Client test',
                'email': 'client@test.com',
                'phone': 1234512341
            },
            {
                'name': 'Andrei Botez',
                'email': 'idzer0lis@gmail.com',
                'phone': 7446634333
            },
        ],
    },
    {
        'model': 'Provider',
        'documents': [
            {
                'name': 'Provider 1',
            },
            {
                'name': 'Provider 2',
            },
            {
                'name': 'Provider New',
            }
        ]
    }
];
