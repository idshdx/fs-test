const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

const ProviderSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"]},
});

ProviderSchema.plugin(uniqueValidator, {message: 'is already taken'});

module.exports = mongoose.model('Provider', ProviderSchema);
