(function()
{


    angular.module('choreBag')
        .controller("GrabBagController", ['grabBagDataService', '$q', '$routeParams', GrabBagController]);

    function GrabBagController(grabBagDataService, $q, $routeParams)
    {
        var vm = this;

        grabBagDataService.getAllBagItems()
            .then(getBagItemsSuccess);




        function getBagItemsSuccess(items)
        {
            vm.bagItems = items;
        }

        vm.chorePicked = {};
        vm.pickChore = pickChore;

        function pickChore()
        {
            console.log("Pick Chore called");
            grabBagDataService.pickItem()
                .then(pickChoreSuccess)
                .catch(pickChoreError);

        }

        function pickChoreSuccess(chore)
        {
            vm.chorePicked = chore;
            console.log(chore);
        }

        function pickChoreError(errorMsg)
        {
            console.log(errorMsg);
        }


        vm.newChore = {}
        vm.addChore = addChore;

        function addChore()
        {
            console.log('saving chore in controller: ' + vm.newChore.title);

            grabBagDataService.addBagItem(vm.newChore)
                .then(addBagItemSuccess)
            .catch(addBagItemError);
        }

        function addBagItemSuccess(response)
        {
            console.log(response);
        }

        function addBagItemError(errorMsg)
        {
            console.log(errorMsg);
        }

        vm.deleteChore = deleteChore;
        function deleteChore(itemID)
        {
            console.log('deleting chore... ' + itemID);
            grabBagDataService.deleteBagItem(itemID)
                .then(deleteBagItemSuccess)
                .catch(deleteBagItemError);
        }
        function deleteBagItemSuccess(response)
        {
            console.log(response);
        }

        function deleteBagItemError(errorMsg)
        {
            console.log(errorMsg);
        }



    }

}());


