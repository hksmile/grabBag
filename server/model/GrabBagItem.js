'use strict'

function GrabBagItem() {}

GrabBagItem.Create = function(title, description, frequency, level, _id)
{
    var item = new GrabBagItem();
    item.title = title;
    item.description = description;
    item.frequency = frequency;
    item.level = level;
    item.ID = _id;

    return item;
};

var _p = GrabBagItem.prototype;


_p.isRipe = function ()
{
    var ret = true;

    if (this.lastPickedDate != undefined)
    {


    var today = new Date();
    var daysBetweenPicks = Math.abs((today.valueOf() - this.lastPickedDate.valueOf()) / (24 * 60 * 60 * 1000));

    if (daysBetweenPicks < this.frequency)
        ret = false;
    }

    return ret;


};

_p.pickItem = function() {
    if (this.isRipe())
    {
        this.lastPickedDate = new Date();
        return true;
    }
    return false;
};




  module.exports = GrabBagItem;
