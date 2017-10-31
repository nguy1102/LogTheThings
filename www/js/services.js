angular.module('starter.services', [])

    .service('dataBaseService', function ($cordovaSQLite) {

        var self = this;

        self.getAllHistory = function () {
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

        self.addEntry = function (newEntry) {
            db1.transaction(function (tx) {
                tx.executeSql('INSERT INTO things (date, smallAmount, bigAmount, eaten, timeStarted, timeEnded, ableToDrive, timeSleep, goodSleep) VALUES (?,?,?,?,?,?,?,?,?)',
                    [newEntry.date, newEntry.smallAmount, newEntry.bigAmount, newEntry.eaten, newEntry.timeStarted
                        , newEntry.timeEnded, newEntry.ableToDrive, newEntry.timeSleep, newEntry.goodSleep]);
            }, function (error) {
                console.log('Transaction ERROR: ' + error.message);
            }, function () {
                console.log('Populated database OK');
            });
        }

        self.editEntry = function (date,editedEntry){
            db1.transaction(function (tx) {
                tx.executeSql('UPDATE things (date, smallAmount, bigAmount, eaten, timeStarted, timeEnded, ableToDrive, timeSleep, goodSleep) VALUES (?,?,?,?,?,?,?,?,?)',
                    [newEntry.date, newEntry.smallAmount, newEntry.bigAmount, newEntry.eaten, newEntry.timeStarted
                        , newEntry.timeEnded, newEntry.ableToDrive, newEntry.timeSleep, newEntry.goodSleep]);
            }, function (error) {
                console.log('Transaction ERROR: ' + error.message);
            }, function () {
                console.log('Populated database OK');
            });
        }

    });
