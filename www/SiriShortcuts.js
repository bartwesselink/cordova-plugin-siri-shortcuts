var exec = require('cordova/exec');

/**
 * Donate shortcut to Siri
 * @param {function() : void} success Function to call upon successful donation
 * @param {function(error) : void} error Function to call upon unsuccessful donation, for example if the user has an iOS version < 12.0
 * @param {object} options Options to specify for the donation
 * @param {string} options.persistentIdentifier Specify an identifier to uniquely identify the shortcut, in order to be able to remove it
 * @param {string} options.title Specify a title for the shortcut, which is visible to the user as the name of the shortcut
 * @param {string} options.suggestedInvocationPhrase Specify the phrase to give the user some inspiration on what the shortcut to call
 * @param {object} options.userInfo Provide a key-value object that contains information about the shortcut, this will be returned in the getActivatedShortcut method. It is not possible to use the persistentIdentifier key, it is used internally
 * @param {boolean} options.isEligibleForSearch This value defaults to true, set this value to make it searchable in Siri
 * @param {boolean} options.isEligibleForPrediction This value defaults to true, set this value to set whether the shortcut eligible for prediction
 * @return void
 */
exports.donate = function (success, error, options) {
    exec(success, error, 'SiriShortcuts', 'donate', [options.persistentIdentifier, options.title, options.suggestedInvocationPhrase, options.userInfo, options.isEligibleForSearch, options.isEligibleForPrediction]);
};

/**
 * Remove shortcuts based on identifiers
 * @param {function() : void} success Function to call upon successful removal
 * @param {function(error) : void} error  Function to call upon unsuccessful removal
 * @param {object} options Options to specify for the donation
 * @param {string|string[]} options.persistentIdentifiers Specify which shortcut(s) to delete by their persistent identifiers
 * @return void
 */
exports.remove = function (success, error, options) {
    if (typeof options.persistentIdentifiers === 'string') {
        options.persistentIdentifiers = [options.persistentIdentifiers];
    }

    exec(success, error, 'SiriShortcuts', 'remove', [options.persistentIdentifiers]);
};

/**
 * Remove all shortcuts from the application
 * @param {function() : void} success Function to call upon successful removal
 * @param {function(error) : void} error  Function to call upon unsuccessful removal
 * @return void
 */
exports.removeAll = function(success, error) {
    exec(success, error, 'SiriShortcuts', 'removeAll');
};

/**
 * Get the current clicked user activity, and clear if variable set to true
 * @param {function(data) : void} success Function to call upon succesful fetch
 * @param {function(error) : void} error  Function to call upon unsuccessful removal
 * @return void
 */
exports.getActivatedShortcut = function(success, error) {
    exec(success, error, 'SiriShortcuts', 'getActivatedShortcut');
};
