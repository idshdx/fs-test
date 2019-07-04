const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const ProviderSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
});

ProviderSchema.plugin(uniqueValidator, {message: 'is already taken'});

mongoose.set('useCreateIndex', true);

module.exports = mongoose.model('Provider', ProviderSchema);
