
var mongoose = require("mongoose");

var TestimonialSchema = mongoose.Schema({
    name: String,
    testimonial: String,
    createDate: Number
});

module.exports = mongoose.model("Testimonial", TestimonialSchema);