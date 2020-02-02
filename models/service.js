
var mongoose = require("mongoose");

var ServiceSchema = mongoose.Schema({
    serviceName: String,
    shortDescription: String,
    serviceText: String,
    secondaryServiceText: String,
    landingPageImagePath: String,
    featureType: {
        type: String,
        enum: ["image", "video"]
    },
    featurePath: String,
    secondFeaturePath: String,
    nurtured: Boolean
});

module.exports = mongoose.model("Service", ServiceSchema);