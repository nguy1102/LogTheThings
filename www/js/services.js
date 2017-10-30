angular.module('starter.services', [])

.service('dataBaseService', function ($cordovaSQLite) {

  var self = this;

  self.getHistory = function() {
    var query = "SELECT * FROM things";
    // return promise!
    return $cordovaSQLite.execute(db1, query).then(function (res) {
        if (res.rows.length > 0) {               
            var data = res.rows;
            // Return final data
            return data; //Result - Undefined..
        }
        console.log("No results found");
        // return false if nothing found
        return false;
    });
};
});
