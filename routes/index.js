/*
 * Module dependencies.
 * ------------------------------------------------
*/
    const express = require("express")
        , logger     = require("../utils/logger")
        , mailer  = require("../utils/nodemailer")

/*
* Module declarations
* ------------------------------------------------
*/
    const router  = express.Router()
        , Subscription = require("../models/subscription")
        , Service = require("../models/service")
        , Testimonials = require("../models/testimonial")
        , Contact = require("../models/contact")
        , News = require("../models/news")
    const underConstruction = false;
/*
* Main code
* ------------------------------------------------
*/
    /* Routes - Landing Page (get). */
    /* ---------------------------------------- */
    router.get("/", function(req, res) {
        Service.find({}).sort({order: 1}).exec(function(err, allServices) {
            if(err) {
                logger.error(err)
            } else {
                News.find({category: "Case"}).sort({createDate: -1}).exec(function(err, allCases) {
                    if(err) {
                        logger.error(err)
                    } else {
                        News.find({category: { $ne: "Case" }}).sort({createDate: -1}).limit(3).exec(function(err, allNews) {
                            if(err) {
                                logger.error(err)
                            } else {
                                res.render("landing", {services:allServices, cases:allCases, news:allNews});
                            }
                        });
                    }
                });
            }
        });
    });

    router.get("/about", function(req, res) {
        Testimonials.find({}).sort({createDate: -1}).exec(function(err, allTests) {
            if(err) {
                logger.error(err)
            } else {
                res.render("about", {testimonials:allTests});
            }
        });
    });

    router.get("/services/", function(req, res) {
        Service.find({}).sort({createDate: -1}).exec(function(err, allServices) {
            if(err) {
                logger.error(err)
            } else {
                res.render("service", {services:allServices});
            }
        });
    });

    router.get("/news/:newsTitle/", function(req, res) {
        let news  = "";
        news = req.params.newsTitle;
        news = news.replace("-"," ");
        News.findOne({title: news}).exec(function(err, selectedNews) {
            if(err) {
                logger.error(err)
            } else {
                res.render("news", {selectedNews:selectedNews});
            }
        });
    });

    router.post("/newsletter", function(req, res) {
        let data = {
            email: req.body.email,
            createDate: Date.now()
        };
        Subscription.create(data, function(err, newSub) {
            if(err) {
                logger.error(err)
            } else {
                res.redirect("/")
            }
        });
    });

    router.post("/contact-us", function(req, res) {
        let data = {
            name: req.body.name,
            email: req.body.email,
            telephone: req.body.phone,
            message: req.body.message,
            createDate: Date.now()
        };

        // Store in DB for reference
        Contact.create(data, function(err, newContact) {
            if(err) {
                logger.error(err)
            } else {
                logger.info("Email contact created")
            }
        });

        // Send mail
        let mailOptions = {
            from: data.name + ' <' + data.email + '>',
            to: "webcontact@nurturedlandscapes.co.uk",
            subject: "Contact Request",
            text: `${data.name} (email:${data.email}) (tel:${data.telephone}) says: ${data.message}`,
            html: `${data.name} (email:<a href="emailTo:${data.email}">${data.email}</a>) (tel:<a href="tel:${data.telephone}">${data.telephone}</a>) says: </br>${data.message}`
        };

        mailer.sendMail(mailOptions, function(error, info){
            if (error) {
                logger.error(error)
            } else {
                logger.info("Email Sent")
            }
        });

        res.redirect("/")
    });

    router.get("/terms", function(req, res) {
        res.render("terms");
    });

    router.get("/privacy", function(req, res) {
        res.render("privacy");
    });
// * --------------------------------------------

/*
 * Module export.
 * ------------------------------------------------
*/
    module.exports = router;