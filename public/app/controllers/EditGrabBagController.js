(function()
{


    angular.module('choreBag')
        .controller("EditGrabBagController", ['grabBagDataService', '$q', '$routeParams', EditGrabBagController]);

    function EditGrabBagController(grabBagDataService, $q, $routeParams)
    {
        var vm = this;


     console.log($routeParams);
        console.log($routeParams.choreID);
        grabBagDataService.getBagItem($routeParams.choreID)
            .then(getItemSuccess)
            .catch(getItemError);

        function getItemSuccess(chore)
        {
            console.log('Found Chore: ' + chore);
            vm.currentChore = chore;
        }
        function getItemError(reason)
        {
            console.log(reason);
        }

        vm.updateChore = updateChore;
        function updateChore()
        {
            console.log('updating chore in the controller: ' + vm.currentChore.title);
            grabBagDataService.updateBagItem(vm.currentChore)
                .then(updateBagItemSuccess)
                .catch(updateBagItemError);
        }
        function updateBagItemSuccess()
        {
            console.log(response);
        }
        function updateBagItemError(errorMsg)
        {
            console.log(errorMsg);
        }


    }

}());
