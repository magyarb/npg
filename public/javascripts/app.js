angular.module('nodeTodo', [])

    .controller('mainController', function($scope, $http) {

        $scope.formData = {};
        $scope.todoData = {};

        // Get all todos
        $http.get('/api/v1/todos')
            .success(function(data) {
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
        // Delete a todo
        $scope.deleteTodo = function(todoID) {
            $http.delete('/api/v1/todos/' + todoID)
                .success(function(data) {
                    $scope.todoData = data;
                    console.log("deleted");
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        };
        // Create a new todo
        $scope.createTodo = function(todoID) {
            $http.post('/api/v1/todos', $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.todoData = data;
                    console.log(data);
                })
                .error(function(error) {
                    console.log('Error: ' + error);
                });
        };
        // fb login
        $scope.fbLogin = function() {
            console.log('55Welcome!  Fetching your information.... ');
            /*FB.api('/me', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                    'Thanks for logging in, ' + response.name + '!';
            });
            FB.api('/me', { locale: 'en_US', fields: 'name, email' },
                function(response) {
                    console.log(response.email);
                }
            );*/
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    // the user is logged in and has authenticated your
                    // app, and response.authResponse supplies
                    // the user's ID, a valid access token, a signed
                    // request, and the time the access token
                    // and signed request each expire
                    var uid = response.authResponse.userID;
                    var accessToken = response.authResponse.accessToken;
                    document.getElementById('status').innerHTML =
                        JSON.stringify(response);
                } else if (response.status === 'not_authorized') {
                    // the user is logged in to Facebook,
                    // but has not authenticated your app
                } else {
                    // the user isn't logged in to Facebook.
                }
            });
        };
    });