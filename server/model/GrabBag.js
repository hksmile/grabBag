'use strict'


function GrabBag() {}

var GrabBagItem = require('./GrabBagItem.js');

GrabBag.Create = function(jsonItems)
{
    var bag = new GrabBag();
    bag.items = [];

    //interesting.. can't loop thru json with jsonItems.forEach()  or with for(var entry in jsonItems)
    for (var i=0; i < jsonItems.length; i++) {
        var entry = jsonItems[i];
        var item = GrabBagItem.Create(entry.title, entry.description, entry.frequency, entry.level, entry._id);
        console.log('Create GrabBagItem from Create Grab Bag: ' + entry._id);
        bag.items.push(item);
    };
   console.log('Number of items in bag: ' + bag.items.length);

    return bag;
};



var _p = GrabBag.prototype;

_p.grab = function() {


    if (!this.items || this.items.length == 0)
    {
        throw('no items in bag');
    }

    var exhaustedList = false;

    var checkedItems = [];

    while (!exhaustedList)
    {
        var rand = Math.floor(Math.random() * this.items.length);

        if(checkedItems.indexOf(rand)== -1)
        {
            checkedItems.push(rand);
        }

        if (this.items[rand].pickItem())
        {
            console.log('Chosen Item: ' + rand + ' ' + this.items[rand].title + this.items[rand].ID);
            return this.items[rand];
        }

        if (checkedItems.length == this.items.length)
        {

            exhaustedList = true;
        }

    }

    throw ("no item found");

};
_p.length = function()
{
    if (this.items)
    return this.items.length;
    else return 0;
};


    module.exports = GrabBag;
