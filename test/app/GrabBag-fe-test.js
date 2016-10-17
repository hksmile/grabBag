beforeEach(function()
{
    module('choreBag');

});


var testChore = {ID: 777, title: 'new test chore', description: 'new chore from karma', frequency: 6, level: 1}
var testItems = [
    {
        id: 1,
        title: 'sweep kitchen',
        desc: 'sweep kitchen bar and table',
        frequency: 1,
        level: 3

    },
    {
        id: 2,
        title: 'toy basket',
        desc: 'put toy basket toys where they belong',
        frequency: 7,
        level: 1

    },
    {
        id: 3,
        title: 'clean out car',
        desc: 'throw away car trash and put car junk where it goes',
        frequency: 7,
        level: 3

    },
    {
        id: 4,
        title: 'unload dishwasher',
        desc: 'unload and put dishes away',
        frequency: 1,
        level: 5
    },
    {
        id: 5,
        title: 'free pass',
        desc: 'Congrats!  You got away',
        frequency: 4,
        level: 1
    }

];


describe('adding chores', function() {


    it ("should call /api/grabBag with chore data", inject(function($httpBackend, grabBagDataService) {

        $httpBackend.whenPOST('api/grabBag', function(data)
        {

            addChoreData = JSON.parse(data);
            expect(addChoreData).to.not.be.empty;
            return true;
        }).respond(200);


        grabBagDataService.addBagItem(testChore);


        $httpBackend.flush();


    }));

});

describe('editing chore', function() {


    it ('should call /api/grabBag with chore data', inject(function($httpBackend, grabBagDataService) {
        var url = new RegExp('api/grabBag/*');

        $httpBackend.whenPOST(url, function(data)
        {
            console.log('post intercepted');
            var updateChoreData = JSON.parse(data);
            expect(updateChoreData).to.not.be.empty;
            return true;
        }).respond(200);


        grabBagDataService.updateBagItem(testChore);
        $httpBackend.flush();
    }));



});

describe('deleting chore', function() {
    it('should call /api/grabBag with chore id', inject(function($httpBackend, grabBagDataService) {
        var url = new RegExp('api/grabBag/*');

        $httpBackend.whenDELETE(function(url)
        {

            var requestParam = url.replace('/api/grabBag', " ").split("/");
            console.log('delete intercepted ' + requestParam[2]);
            assert.equal(requestParam[2], 123);
            return true;

        }).respond(200);

        grabBagDataService.deleteBagItem(123);
        $httpBackend.flush();

    }));
});

describe('get all chores', function() {

    it('should call /api/grabBag', inject(function($httpBackend, grabBagDataService){
        var url = 'api/grabBag';


        $httpBackend.whenGET(function(url)
        {
            console.log('intercepting GET');
            return true;

        }).respond(200, testItems);

        grabBagDataService.getAllBagItems();
        $httpBackend.flush();
    }))
});


describe('retrieve a chore', function() {
    it('should call /api/grabBag with chore id', inject(function($httpBackend, grabBagDataService) {
        var url = new RegExp('api/grabBag/*');
        var foundItem;

        $httpBackend.whenGET(function(url)
        {

            var requestParam = url.replace('/api/grabBag', " ").split("/");
            idRequestParam = requestParam[2];
            console.log('get intercepted ' + idRequestParam);
            assert.equal(idRequestParam, 5);
            foundItem = testItems.find(function(element, index, array)
            {

                if (element.id == idRequestParam)
                {
                    console.log('found element');
                    return true;
                }

            });

            assert.equal(foundItem.id, 5);
            return true;

        }).respond(200, JSON.stringify(foundItem));

        grabBagDataService.getBagItem(5);
        $httpBackend.flush();

    }));
});


describe('pick a chore', function() {
    it('should call /api/grabBag with chore id of 0', inject(function($httpBackend, grabBagDataService) {
        var url = new RegExp('api/grabBag/*');
        var foundItem;

        $httpBackend.whenGET(function(url)
        {

            var requestParam = url.replace('/api/grabBag', " ").split("/");
            idRequestParam = requestParam[2];
            console.log('get intercepted ' + idRequestParam);
            assert.equal(idRequestParam, 0);
            foundItem = testItems[0];

            return true;

        }).respond(200, JSON.stringify(foundItem));

        grabBagDataService.pickItem();
        $httpBackend.flush();

    }));
});
