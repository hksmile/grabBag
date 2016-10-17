var express = require('express');
var router = express.Router();

var grabBagData = require('../data/GrabBag-data.js');
var GrabBag = require('../model/GrabBag.js');
var GrabBagItem = require('../model/GrabBagItem.js');

router.route('/')
    .get(function(req, res) {

        var data = grabBagData.findAllGrabBagItems()
            .then(function(docs) {
                data = JSON.stringify(docs);
                res.send(data);
            });

    })
    .post(function(req, res) {
        grabBagData.createGrabBagItem(req.body.title, req.body.description, req.body.frequency, req.body.level)
            .then(function(err, product, numberAffected)
            {
                if (err)
                {
                    res.send(err);

                }
                else
                {
                    res.send(numberAffected + ' items saved.');
                }

            });
    });


router.route('/:itemID')
    .post(function(req, res) {
        grabBagData.updateGrabBagItem(req.body._id, req.body.title, req.body.description, req.body.frequency, req.body.level)
            .then(function(err, item) {
                if (err)
                {
                    res.send(err);
                }
                else
                {
                    res.send('Title: ' + req.params.bagItem.title + ' updated.');
                }
            })
    })
    .delete(function(req, res) {
        grabBagData.deleteGrabBagItem(req.params.itemID)
            .then(function(err, doc,results )
            {
                if (err)
                {
                    res.send(err);
                }
                else
                {
                    res.send('Title: ' + req.params.itemID + ' removed');
                }
            });
    })
    .get(function(req, res){
        console.log('Into REST Service: ' + req.params.itemID);

        var itemID = req.params.itemID;

        if(!itemID || itemID == 0)
        {
            console.log('grabbing chore');
            var items =  grabBagData.findAllGrabBagItems()
                .then(function(docs)
                {
                    var bag = GrabBag.Create(docs);
                    itemID = bag.grab().ID;

                    var data = grabBagData.findGrabBagItem(itemID)
                        .then(function (err, doc)
                        {
                            if (err)
                            {
                                console.log(err);
                                res.send(JSON.stringify(err));
                            }
                            else
                            {

                                data = JSON.stringify(doc);
                                console.log(data);
                                res.send(data);
                            }
                        })

                });
        }
        else
        {

            var data = grabBagData.findGrabBagItem(itemID)
                .then(function (err, doc)
                {
                    if (err)
                    {
                        console.log(err);
                        res.send(JSON.stringify(err));
                    }
                    else
                    {

                        data = JSON.stringify(doc);
                        console.log(data);
                        res.send(data);
                    }
                })
        }

    });



module.exports = router;