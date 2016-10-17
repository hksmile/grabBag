(function() {


    angular.module('choreBag')
        .factory('grabBagDataService', ['$http', '$q', '$cacheFactory',grabBagDataService]);



    function grabBagDataService($http, $q, $cacheFactory) {

        var dataCache = $cacheFactory.get('choreCache');

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
            if (!dataCache)
            {
                dataCache = $cacheFactory('choreCache');
            }

            var choreListFromCache = undefined; //dataCache.get('choreList');
             if (choreListFromCache)
             {
                 var deferred = $q.defer();
                 console.log('returned from cache');
                 deferred.resolve(choreListFromCache);
                 return deferred.promise;
             }

            else
             {
                 return $http({
                     method: 'GET',
                     url: 'api/grabBag'
                 })
                     .then(getAllBagItemsSuccess)
                     .catch(getAllBagItemsError)
             }

        }

        function getAllBagItemsSuccess(response){
            /*var itemArray = [];

            response.data.forEach( function(entry) {

                itemArray.push(JSON.stringify(entry));
            });

            console.log(itemArray);*/


            console.log('putting in cache');
            dataCache.put('choreList', response.data);
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
            deleteChoreListFromCache();
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
            deleteChoreListFromCache();
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
            deleteChoreListFromCache();
            return 'Item updated';
        }
        function updateItemError(response)
        {
            return $q.reject('Error updating item.  {HTTP status: ' + response.status + ')');
        }

        function deleteChoreListFromCache()
        {
            if (dataCache)
            {
                console.log('cache deleted');
                dataCache.remove('choreList');
            }
        }


    }


}());