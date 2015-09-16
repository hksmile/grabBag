(function() {


    angular.module('choreBag')
        .factory('grabBagDataService', ['$http', '$q', grabBagDataService]);


    function grabBagDataService($http, $q) {


        return {
            getAllBagItems: getAllBagItems,
            addBagItem: addBagItem,
            deleteBagItem: deleteBagItem,
            updateBagItem: updateBagItem,
            getBagItem: getBagItem,
            pickItem: pickItem
        };





        function getAllBagItems()
        {
            
            return $http({
                method: 'GET',
                url: 'api/grabBag'
            })
                .then(getAllBagItemsSuccess)
                .catch(getAllBagItemsError)
        }

        function getAllBagItemsSuccess(response){
            var itemArray = [];

            response.data.forEach( function(entry) {

                itemArray.push(JSON.stringify(entry));
            });

            console.log(itemArray);


            return response.data;
        }

        function getAllBagItemsError(response){
            return $q.reject('Error retrieving items');
        }

        function getBagItem(itemID)
        {
            console.log('getting item ' + itemID);
            return $http({
                    method: 'GET',
                    url: 'api/grabBag/' + itemID
                })
                .then(getBagItemSuccess)
                .catch(getBagItemError)
        }
        function getBagItemSuccess(response)
        {
            console.log('Success: ' + response.data);
            return response.data;

        }
        function getBagItemError(response){
            console.log('Error retrieving item');
            return $q.reject('Error retrieving item');
        }


        function pickItem()
        {
            return getBagItem(0);

        }


        function addBagItem(item)
        {
            return $http.post('api/grabBag', item)
                .then(addItemSuccess)
                .catch(addItemError);
        }

        function addItemSuccess(response) {
            return 'Item added: ';
        }

        function addItemError(response) {
            return $q.reject('Error adding item.  {HTTP status: ' + response.status + ')');
        }

        function deleteBagItem(itemID)
        {
            return $http({
                method: 'DELETE',
                url: 'api/grabBag/' + itemID
            })
                .then(deleteItemSuccess)
                .catch(deleteItemError);
        }

        function deleteItemSuccess(response)
        {
            return 'Item delete';
        }
        function deleteItemError(response){
            return $q.reject('Error deleting item. {HTTP status: ' + response.status + ')');
        }

        function updateBagItem(item)
        {
            return $http( {
                method: 'POST',
                url: 'api/grabBag/' + item._id,
                data: item
            })
                .then(updateItemSuccess)
                .catch(updateItemError)
        }
        function updateItemSuccess(response)
        {
            return 'Item updated';
        }
        function updateItemError(response)
        {
            return $q.reject('Error updating item.  {HTTP statys: " + response.status' + ')');
        }


    }


}());