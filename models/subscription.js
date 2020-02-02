var mongoose = require("mongoose");

var SubscriptionSchema = mongoose.Schema({
    email: { type: String, unique: true, required: true },
    addedDate: Date
});


module.exports = mongoose.model("Subscription", SubscriptionSchema);