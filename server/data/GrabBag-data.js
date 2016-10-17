
    var mongoose = require("mongoose");
    var Promise = require("bluebird");

    var grabBagSchema = mongoose.Schema({
        title: {type: String, unique: true},
        description: {type: String},
        frequency: {type: Number, min: 1},
        level: {type: Number},
        lastPickedDate: {type: Date}
    });


    var dbConnection = mongoose.connection;
    var GrabBagModel = mongoose.model('grabbag', grabBagSchema, 'grabbags');



   function findAllGrabBagItems()
    {

        return GrabBagModel.find({}).lean().exec();

    }

    function createGrabBagItem(title, desc, freq, level)
    {
        var newItem = new GrabBagModel(
            {
                title: title,
                description: desc,
                frequency: freq,
                level: level
            }
        );

        return newItem.save();

    }

    function deleteGrabBagItem(itemID)
    {
        //return GrabBagModel.find({title: title}).remove();
        return GrabBagModel.findById(itemID).remove();
    }

    function updateGrabBagItem(itemID, title, desc, freq, level)
    {
        return GrabBagModel.findByIdAndUpdate(itemID, {$set: {title:title, description:desc, frequency: freq, level:level}});
    }

    function findGrabBagItem(itemID)
    {
        console.log('find item in model ' + itemID);
        return GrabBagModel.findById(itemID);
    }



  exports.findAllGrabBagItems = findAllGrabBagItems;
    exports.findGrabBagItem = findGrabBagItem;
    exports.createGrabBagItem = createGrabBagItem;
    exports.deleteGrabBagItem = deleteGrabBagItem;
    exports.updateGrabBagItem = updateGrabBagItem;








