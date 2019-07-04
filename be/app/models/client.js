const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
    email: {type: String, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    phone: {type: Number, unique: true,
        // This should have worked in an ideal world.
        // validate: {
        //     validator: function(v) {
        //         return /d{10}/.test(v.toString());
        //     },
        //     message: '{VALUE} is not a valid 10 digit number!'
        // }
        min: [1000000000, '{VALUE} is not a valid 10 digit number!'],
        max: [9999999999, '{VALUE} is not a valid 10 digit number!'],
        index: true
        },
    providers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Provider' }],
});

ClientSchema.plugin(uniqueValidator, {message: 'is already taken'});

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('Client', ClientSchema);
