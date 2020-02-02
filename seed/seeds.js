const mongoose   = require("mongoose");
const passport   = require("passport");
const User       = require("../models/user");
const Service = require("../models/service");
const Testimonial = require("../models/testimonial");
const Setting    = require("../models/setting");
const logger     = require("../utils/logger");
const News       = require("../models/news");

let output = {
    seedUsers: () => {
            // Generate default data.
        let users = [
            {
                username: "Techmeleon",
                password: "TECH@tm101",
                admin: true
            }
        ]

        // Remove all users and add default users.
        User.remove({}, err => {
            if(err){
                console.log(err);
            } else {
                users.forEach(function(seed) {
                    let newUser = new User({username: seed.username, admin: seed.admin});
                    User.register(newUser, seed.password, function(err, user) {
                        logger.info("New user: " + user.username)
                    });
                });
            };
        });
    },
    seedSettings: (env) => {
        let settings = {
                env: "development",
                underConstruction: false
        }

        // Remove settings before running
        Setting.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                Setting.create(settings, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("settings applied")
                    }
                });
            };
        });
    },
    seedTestimonials: () => {
        // Generate default data.
        let testimonials = [
            {
                name: "A Voica",
                testimonial: "My husband was too lazy to do our lawn so I got lawnamental to do it. It's 100 times better than I thought possible",
                // createDate: Date.now()
            },
            {
                name: "D Williams",
                testimonial: "After years of trying to get an 'ornamental lawn', Lawnamental gave us the best lawn I've seen in years",
                // createDate: Date.now()
            },
            {
                name: "M Neville",
                testimonial: "Lawnamental know what they are doing. I told them what I want and after their plan was complete, so was my garden",
                // createDate: Date.now()
            }
        ]

        // Remove all testimonials before starting
        Testimonial.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                Testimonial.create(testimonials, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("testimonials added")
                    }
                });
            };
        });
    },
    seedServices: () => {
        // Generate default data.
        let services = [
            {
                serviceName: "Aeration",
                shortDescription: "Lawns like to breathe. Without aeration the ground becomes too firm and water no longer drains into the soil",
                serviceText: "Lawns like to breathe. Rain, traffic, animals… they all cause issues with aeration. The holes in your lawn will get clogged, the ground becomes too firm and water no longer drains into the soil. Our aeration solutions will combat these problems. We can identify when it is needed and using the correct method get your lawn breathing as it should.",
                landingPageImagePath: "/resources/img/services/aeration-main.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/aeration-main.jpg",
                secondFeaturePath: "/resources/img/services/aeration-2.jpg",
                nurtured: false
            },
            {
                serviceName: "Scarifying",
                shortDescription: "One of the most important parts to keeping a healthy lawn. We will remove unwanted moss, dead weeds etc. This gives your lawn the best opportunity to breath and grow. Having moss and other unwanted material on your lawn prevents even growth, causes bogginess and will generally leave your lawn looking worn and tired looking.",
                serviceText: "One of the most important parts to keeping a healthy lawn. We will remove unwanted moss, dead weeds etc. This gives your lawn the best opportunity to breath and grow. Having moss and other unwanted material on your lawn prevents even growth, causes bogginess and will generally leave your lawn looking worn and tired looking.",
                landingPageImagePath: "/resources/img/services/scarifier.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/scarifier.jpg",
                secondFeaturePath: "/resources/img/image-placeholder.png",
                nurtured: false
            },
            {
                serviceName: "Moss Treatment",
                shortDescription: "While scarification can be a great way to remove moss from lawns we also have a range of treatments. We can chemically treat areas where moss is reoccurring. Along with aeration and scarification we can ensure to get your lawn looking its best. Removing moss from your lawn is an important step towards the Ornamental look you are looking for.",
                serviceText: "While scarification can be a great way to remove moss from lawns we also have a range of treatments. We can chemically treat areas where moss is reoccurring. Along with aeration and scarification we can ensure to get your lawn looking its best. Removing moss from your lawn is an important step towards the Ornamental look you are looking for.",
                landingPageImagePath: "/resources/img/services/moss.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/moss.jpg",
                secondFeaturePath: "/resources/img/image-placeholder.png",
                nurtured: false
            },
            {
                serviceName: "Fertilization",
                shortDescription: "Lawns require regular fertilisation to stay in the best condition Lawnamental are trained professionally. Using our experience and knowledge our treatments will provide longevity, Weed and Moss control and a healthier better-looking lawn. Our fertilisation programs will rotate depending on the time of year, what has already been used and the environment. This ensures we are always getting the best results from the treatments we provide.",
                serviceText: "Lawns require regular fertilisation to stay in the best condition Lawnamental are trained professionally. Using our experience and knowledge our treatments will provide longevity, Weed and Moss control and a healthier better-looking lawn. Our fertilisation programs will rotate depending on the time of year, what has already been used and the environment. This ensures we are always getting the best results from the treatments we provide.",
                landingPageImagePath: "/resources/img/services/fertilizer.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/fertilizer.jpg",
                secondFeaturePath: "/resources/img/image-placeholder.png",
                nurtured: false
            },
            {
                serviceName: "Turfing",
                shortDescription: "If you’re looking to get a lawn established quickly. This is the best solution for you. We will uniquely evaluate what is required for each individual customer. We will prep the area for the turf prior to laying your lawn. This could involve soil fertilization, a sand and soil mix, and cultivation/tilling. We can lay hardwearing, ornamental and a variety of different turfs depending on your requirements.",
                serviceText: "If you’re looking to get a lawn established quickly. This is the best solution for you. We will uniquely evaluate what is required for each individual customer. We will prep the area for the turf prior to laying your lawn. This could involve soil fertilization, a sand and soil mix, and cultivation/tilling. We can lay hardwearing, ornamental and a variety of different turfs depending on your requirements.",
                landingPageImagePath: "/resources/img/services/turf.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/turf.jpg",
                secondFeaturePath: "/resources/img/image-placeholder.png",
                nurtured: false
            },
            {
                serviceName: "Mowing",
                shortDescription: "Mowing your lawn at regular intervals is important. We can provide a weekly/fortnightly service. Keeping on top of the length of your grass helps with aeration, fertilisation and moss. A lawn cut once a month is much more likely to develop problems. So, keep it cut regularly for that ornamental look. We can schedule our services around you.",
                serviceText: "Mowing your lawn at regular intervals is important. We can provide a weekly/fortnightly service. Keeping on top of the length of your grass helps with aeration, fertilisation and moss. A lawn cut once a month is much more likely to develop problems. So, keep it cut regularly for that ornamental look. We can schedule our services around you.",
                landingPageImagePath: "/resources/img/services/mowing.jpg",
                featureType: "image",
                featurePath: "/resources/img/services/mowing.jpg",
                secondFeaturePath: "/resources/img/image-placeholder.png",
                nurtured: false
            }
            // ,
            // {
            //     serviceName: "Japanese Knotweed",
            //     shortDescription: "Awaiting Description.",
            //     serviceText: "Awaiting Description.",
            //     landingPageImagePath: "/resources/img/image-placeholder.png",
            //     featureType: "image",
            //     featurePath: "/resources/img/image-placeholder.png",
            //     secondFeaturePath: "/resources/img/image-placeholder.png",
            //     nurtured: true
            // },
            // {
            //     serviceName: "Landscaping",
            //     shortDescription: "Awaiting Description.",
            //     serviceText: "Awaiting Description.",
            //     landingPageImagePath: "/resources/img/image-placeholder.png",
            //     featureType: "image",
            //     featurePath: "/resources/img/image-placeholder.png",
            //     secondFeaturePath: "/resources/img/image-placeholder.png",
            //     nurtured: true
            // }
        ]

        // Remove all testimonials before starting
        Service.remove({}, err => {
            if(err){
                logger.error(err)
            } else {
                // console.log(services)
                Service.create(services, err => {
                    if(err) {
                        logger.error(err)
                    } else {
                        logger.info("services added")
                    }
                });
            };
        });
    },
    seedCases: () => {
        User.findOne({}, function(err, techUser) {
            let newsItem = [
                {
                    title: "Afan Valley Camp",
                    category: "Case",
                    poster: techUser._id,
                    mainImageUrl: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000022.jpg",
                    summaryText: "Plug Aeration, Scarification, Top dressing, feed and weed.",
                    contentList: [
                        {
                            content: "Plug Aeration, Scarification, Top dressing, feed and weed.",
                            type: "text",
                            order: 0
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000009.jpg",
                            type: "image",
                            order: 1
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000010.jpg",
                            type: "image",
                            order: 2
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000023.jpg",
                            type: "image",
                            order: 3
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000024.jpg",
                            type: "image",
                            order: 4
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000025.jpg",
                            type: "image",
                            order: 5
                        },
                        {
                            content: "/resources/img/cases/Afan Valley Campsite/2018-05-02-PHOTO-00000026.jpg",
                            type: "image",
                            order: 6
                        },
                    ]
                },
                {
                    title: "Saint Brides Major",
                    category: "Case",
                    poster: techUser._id,
                    mainImageUrl: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000020.jpg",
                    summaryText: "Scarification + Feed and weed treatment",
                    contentList: [
                        {
                            content: "Scarification + Feed and weed treatment",
                            type: "text",
                            order: 0
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000014.jpg",
                            type: "image",
                            order: 1
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000015.jpg",
                            type: "image",
                            order: 2
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000017.jpg",
                            type: "image",
                            order: 3
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000018.jpg",
                            type: "image",
                            order: 4
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000019.jpg",
                            type: "image",
                            order: 5
                        },
                        {
                            content: "/resources/img/cases/Saint Brides Major/2018-05-02-PHOTO-00000021.jpg",
                            type: "image",
                            order: 6
                        },
                    ]
                },
                {
                    title: "Weed and feed in Penclawdd",
                    category: "Case",
                    poster: techUser._id,
                    mainImageUrl: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000012.jpg",
                    summaryText: "Weed and feed.",
                    contentList: [
                        {
                            content: "Weed and feed.",
                            type: "text",
                            order: 0
                        },
                        {
                            content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000011.jpg",
                            type: "image",
                            order: 1
                        },
                        {
                            content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000013.jpg",
                            type: "image",
                            order: 2
                        },
                        {
                            content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000016.jpg",
                            type: "image",
                            order: 3
                        },
                        {
                            content: "/resources/img/cases/Weed and feed in Penclawdd/2018-05-02-PHOTO-00000027.jpg",
                            type: "image",
                            order: 4
                        }
                    ]
                },
                {
                    title: "Skewen May 2018",
                    category: "Case",
                    poster: techUser._id,
                    mainImageUrl: "/resources/img/cases/Skewen May 2018/before2.jpg",
                    summaryText: "Scarify, top dress and fertiliser over seeding",
                    contentList: [
                        {
                            content: "Scarify, top dress and fertiliser over seeding",
                            type: "text",
                            order: 0
                        },
                        {
                            content: "/resources/img/cases/Skewen May 2018/before1.jpg",
                            type: "image",
                            order: 1
                        },
                        {
                            content: "/resources/img/cases/Skewen May 2018/before3.jpg",
                            type: "image",
                            order: 2
                        },
                        {
                            content: "/resources/img/cases/Skewen May 2018/before4.jpg",
                            type: "image",
                            order: 3
                        },
                        {
                            content: "/resources/img/cases/Skewen May 2018/before5.jpg",
                            type: "image",
                            order: 4
                        }
                    ]
                },
            ]

            // Remove all testimonials before starting
            News.remove({}, err => {
                if(err){
                    logger.error(err)
                } else {
                    // console.log(services)
                    News.create(newsItem, err => {
                        if(err) {
                            logger.error(err)
                        } else {
                            logger.info("News added")
                        }
                    });
                };
            });
        });
    }
}

module.exports = output;