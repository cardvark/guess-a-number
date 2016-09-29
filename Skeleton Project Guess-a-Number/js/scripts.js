

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
    self.existingUserInput = ko.observable();
    self.createGameFeedback = ko.observable();

    // Game Move input and response values
    self.gameKeyInput = ko.observable();
    self.guessInput = ko.observable();
    self.makeMoveFeedback = ko.observable();

    self.errorResponse = function( error ) {
        var outMessage = '';
        outMessage += 'Error!';
        outMessage += '<br><br>';
        outMessage += error.message || '';

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
                // var errorMessage = response.error.message || '';
                feedback += self.errorResponse( response.error );
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
        var attempts = self.attemptsInput();
        var max = self.maxInput();
        var min = self.minInput();
        var name = self.existingUserInput();
        var feedback = '';

        gapi.client.guess_a_number.new_game({
            attempts: attempts,
            max: max,
            min: min,
            user_name: name
        }).execute(function (response) {
            if (response.error) {
                feedback += self.errorResponse( response.error );
            } else {
                self.attemptsInput('');
                self.maxInput('');
                self.minInput('');
                self.existingUserInput('');
                self.createGameFeedback('');

                feedback += 'New game created!';
                feedback += '<br>Game ID:';
                feedback += '<br>' + response.urlsafe_key;
                feedback += '<br><br>Use this ID to submit game moves.';
                feedback += '<br>Good luck!';
            }
            self.createGameFeedback( feedback );
        });
    };

    self.makeMove = function() {
        var game_key = self.gameKeyInput();
        var guess = self.guessInput();
        var feedback = '';

        gapi.client.guess_a_number.make_move({
            urlsafe_game_key: game_key,
            guess: guess
        }).execute(function (response) {
            if (response.error) {
                feedback += self.errorResponse( response.error );
            } else {
                // self.gameKeyInput('');
                self.guessInput('');

                feedback += 'Your guess: ' + guess;
                feedback += '<br>Response: ' + response.message;
                feedback += '<br><br>Attempts remaining: ' + response.attempts_remaining;
                feedback += '<br><br>';
                // feedback += response.game_over ? 'Game Over!' : '';
            }
            self.makeMoveFeedback( feedback );
        });
    };

};

ko.applyBindings( new ViewModel() );