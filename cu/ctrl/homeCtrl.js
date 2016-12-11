angular.module('atApp').controller('homeCtrl', ['$scope', '$rootScope', '$interval', '$http', '$log',
function($scope, $rootScope, $interval, $http, $log) {
        $scope.totalItems = 1;
        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;
        $scope.maxSize = 10;
        $scope.file = {};
        $scope.file.data = null;
        $scope.posts = [{}];
        var count = 0;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };

        $scope.$watch('myVar', function() {
            //console.log("Xml Data: " + $scope.file.data);
        });


        $scope.fetchData = function () {
            var x2js = new X2JS();
            try {
                console.log("data read from xml is: " + $scope.file.toString());
                var xmdData = x2js.xml_str2json($scope.file.data);
                //add downvote property and vote counts to localStorage
                // console.log("xmdData.posts.row size" + xmdData.posts.row.length);
                
                console.log("data parsing test: " + xmdData.posts.row);
                $scope.posts = xmdData.posts.row;
                $scope.totalItems = $scope.posts.length;

                for(i = 0; i < $scope.totalItems; i++) {   
                    var down = localStorage.getItem("downs" + $scope.posts[i]._Id);
                    var up = localStorage.getItem("ups" + $scope.posts[i]._Id);

                    if (down != "" || down != undefined || down != NaN || down != null)
                        $scope.posts[i].DislikeCount = down;
                    else
                        $scope.posts[i].DislikeCount = 0;

                    if (up != "" || up != undefined || up != NaN || up != null)
                        $scope.posts[i]._FavoriteCount = up;
                    else {
                        if ($scope.posts[i]._FavoriteCount == "" || $scope.posts[i]._FavoriteCount == undefined || $scope.posts[i]._FavoriteCount == NaN)
                            $scope.posts[i]._FavoriteCount = 0;
                    }
 
                        localStorage.setItem("downs" + $scope.posts[i]._Id, 0);

                        localStorage.setItem("ups" + $scope.posts[i]._Id, $scope.posts[i]._FavoriteCount);
                    
                }
                // console.log("inside fetchData, and data is: " + $scope.totalItems + " long"); 
            } catch (error) {
                console.log(error);
            }       
        };
        

        $scope.readLocalFile = function () {
            try {
                $http.get('src/Posts.xml').success(function(data) {
                    $scope.file.data = data;
                    $scope.fetchData();
                })
                .error(function() {
                    console.log('could not find the file');
                });

            } catch (error) {
                console.log("error during the local file read: " + error);
            }
        }


        $scope.vote = function (up, index, id) {
            // console.log("vote called, index :" + index + ", Id: " + id);
            index = ($scope.currentPage - 1) * 10 + index;   
            var val = 0;
            if (up == 1) {
                val = parseInt($scope.posts[index]._FavoriteCount) + 1;
                localStorage.setItem("ups" + id, val);
                $scope.posts[index]._FavoriteCount = value;
            }
            else {
                val = parseInt($scope.posts[index].DislikeCount) + 1;
                localStorage.setItem("downs" + id, val);
                $scope.posts[index].DislikeCount = value;
            }         
        };

        $scope.readLocalFile();
}])
.filter('pagination', function()
{
    return function(scope,input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    };
});