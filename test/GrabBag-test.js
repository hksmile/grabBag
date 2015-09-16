'use strict';

//jshint expr: true  what is a jshint?

var GrabBagItem = require("../server/model/GrabBagItem.js");
var GrabBag = require("../server/model/GrabBag.js");

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();  //why do I need to call this?

chai.use(require('chai-datetime'));



describe('GrabBagItem', function() {

    var itemTitle = "Sweep Kitchen";
    var itemDescription = "Sweep around the kitchen island and table";
    var itemFrequency = 1;
    var itemLevel = 3;

   it('should save the info on the GrabBagItem when created', function() {
       var item = GrabBagItem.Create(itemTitle, itemDescription, itemFrequency, itemLevel);

       should.exist(item.title);
       item.title.should.equal(itemTitle);

       should.exist(item.description);
       item.description.should.equal(itemDescription);

       should.exist(item.frequency);
       item.frequency.should.equal(itemFrequency);

       should.exist(item.level);
       item.level.should.equal(itemLevel);
   });


    it('should save grab date when picked', function() {
        var item = GrabBagItem.Create(itemTitle, itemDescription, itemFrequency, itemLevel);

        item.pickItem();

        should.exist(item.lastPickedDate);
        item.lastPickedDate.should.equalDate(new Date());


    });

    it('should not allow item to be picked if not ready to pick', function() {
        var item = GrabBagItem.Create(itemTitle, itemDescription, 7, itemLevel);

        expect(item.pickItem()).to.be.true;
        expect(item.pickItem()).to.be.false;


    });

    it('should allow item to be picked if ready to pick', function() {
        var item = GrabBagItem.Create(itemTitle, itemDescription, 0, itemLevel);

        expect(item.pickItem()).to.be.true;
        expect(item.pickItem()).to.be.true;


    });


});

describe('GrabBag', function() {

    var items, titles;

    beforeEach('set items', function() {


    //var item1 = GrabBagItem.Create('sweep kitchen', 'sweep kitchen bar and table', 1, 3);
    //var item2 = GrabBagItem.Create('toy basket', 'put toy basket toys where they belong', 7, 1);
    //var item3 = GrabBagItem.Create('clean out car', 'throw away car trash and put car junk where it goes', 7, 3);
    //var item4 = GrabBagItem.Create('unload dishwasher', 'unload and put dishes away', 1, 5);
    //var item5 = GrabBagItem.Create('free pass', 'Congrats!  You got away', 4, 1);
    //items = [item1, item2, item3, item4, item5];

        items = [
            {
                title: 'sweep kitchen',
                desc: 'sweep kitchen bar and table',
                frequency: 1,
                level: 3

            },
            {
                title: 'toy basket',
                desc: 'put toy basket toys where they belong',
                frequency: 7,
                level: 1

            },
            {
                title: 'clean out car',
                desc: 'throw away car trash and put car junk where it goes',
                frequency: 7,
                level: 3

            },
            {
                title: 'unload dishwasher',
                desc: 'unload and put dishes away',
                frequency: 1,
                level: 5
            },
            {
                title: 'free pass',
                desc: 'Congrats!  You got away',
                frequency: 4,
                level: 1
            }

        ];

    titles = ['sweep kitchen', 'toy basket', 'clean out car', 'unload dishwasher', 'free pass'];
    });


    it('should hold a list of GrabBagItems when created', function() {
        var bag = GrabBag.Create(items);

        should.exist(bag.items);
        expect(bag.length()).to.equal(5);

    });


    it('should grab an item from the array', function() {
       var bag = GrabBag.Create(items);
      var item = bag.grab();

        should.exist(item);
       expect(titles).to.include(item.title);


    });

    it('should grab every item from the array over time', function() {
        var bag = GrabBag.Create(items);
       for(it of bag.items)
        {
            it.frequency = 0;
        };

        var grabbedItems = [];
         for (var i = 0; i < 20; i++)
            {
                var item = bag.grab();
                grabbedItems[item.title] = item.title;
            }


        expect(grabbedItems).to.contain.all.keys(titles);
    });

    it('should throw an exception if no item can be returned', function() {

        var bag = GrabBag.Create(items);
        for (it of bag.items)
        {
            it.frequency = 7;

        };

        for (var i=0; i<5; i++)
        {

            var item = bag.grab();

        }

        expect(function() {
            var it = bag.grab();
            console.log(it);

        }).to.throw();
    });
});

