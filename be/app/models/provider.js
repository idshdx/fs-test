const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator'),
    autoIncrement = require('mongoose-auto-increment');

const ProviderSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: [true, "can't be blank"], index: true},
});

ProviderSchema.plugin(uniqueValidator, {message: 'is already taken'});

ProviderSchema.plugin(autoIncrement.plugin, { model: 'Provider', field: 'id', startAt: 1 });

module.exports = mongoose.model('Provider', ProviderSchema);
