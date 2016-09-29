

var ViewModel = function() {
    var self = this;

    // Create User input and response values
    self.emailInput = ko.observable();
    self.usernameInput = ko.observable();
    self.createUserFeedback = ko.observable();

    // Create Game input and response values
    self.attemptsInput = ko.observable();
    self.maxInput = ko.observable();
    self.minInput = ko.observable();
    self.user_name = ko.obserable();
    self.createGameFeedback = ko.observable();

    self.errorResponse = function( errMsg ) {
        var outMessage = '';
        outMessage += 'Error!';
        outMessage += '<br><br>';
        outMessage += errMsg;

        return outMessage;
    };

    self.createUser = function() {
        var email = self.emailInput();
        var user_name = self.usernameInput();
        var feedback = '';

        gapi.client.guess_a_number.create_user({
            email: email,
            user_name: user_name
        }).execute(function (response) {
            if (response.error) {
                var errorMessage = response.error.message || '';
                feedback += self.errorResponse( errorMessage );
            } else {
                feedback += 'User created!';
                feedback += '<br>Name: ' + user_name;
                feedback += '<br>Email: ' + email;
                self.emailInput('');
            }
            self.usernameInput('');
            self.createUserFeedback( feedback );
        });
    };

    self.createNewGame = function() {
        // var attempts = self.
    };

};

ko.applyBindings( new ViewModel() );