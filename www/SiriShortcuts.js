var exec = require('cordova/exec');

/**
 * Donate shortcut to Siri
 * @param {object} options Options to specify for the donation
 * @param {string} options.persistentIdentifier Specify an identifier to uniquely identify the shortcut, in order to be able to remove it
 * @param {string} options.title Specify a title for the shortcut, which is visible to the user as the name of the shortcut
 * @param {string} options.suggestedInvocationPhrase Specify the phrase to give the user some inspiration on what the shortcut to call
 * @param {object} options.userInfo Provide a key-value object that contains information about the shortcut, this will be returned in the getActivatedShortcut method. It is not possible to use the persistentIdentifier key, it is used internally
 * @param {boolean} options.isEligibleForSearch This value defaults to true, set this value to make it searchable in Siri
 * @param {boolean} options.isEligibleForPrediction This value defaults to true, set this value to set whether the shortcut eligible for prediction
 * @param {function() : void} success Function to call upon successful donation
 * @param {function(error) : void} error Function to call upon unsuccessful donation, for example if the user has an iOS version < 12.0
 * @return void
 */
exports.donate = function (options, success, error) {
    exec(success, error, 'SiriShortcuts', 'donate', [options.persistentIdentifier, options.title, options.suggestedInvocationPhrase, options.userInfo, options.isEligibleForSearch, options.isEligibleForPrediction]);
};

/**
 * Present shortcut to the user, will popup a view controller asking the user to add it to Siri
 * @param {object} options Options to specify for the shortcut
 * @param {string} options.persistentIdentifier Specify an identifier to uniquely identify the shortcut, in order to be able to remove it
 * @param {string} options.title Specify a title for the shortcut, which is visible to the user as the name of the shortcut
 * @param {string} options.suggestedInvocationPhrase Specify the phrase to give the user some inspiration on what the shortcut to call
 * @param {object} options.userInfo Provide a key-value object that contains information about the shortcut, this will be returned in the getActivatedShortcut method. It is not possible to use the persistentIdentifier key, it is used internally
 * @param {function() : void} success Function to call upon successful donation
 * @param {function(error) : void} error Function to call upon unsuccessful donation, for example if the user has an iOS version < 12.0
 * @return void
 */
exports.present = function (options, success, error) {
    exec(success, error, 'SiriShortcuts', 'present', [options.persistentIdentifier, options.title, options.suggestedInvocationPhrase, options.userInfo, options.isEligibleForSearch, options.isEligibleForPrediction]);
};

/**
 * Remove shortcuts based on identifiers
 * @param {string|string[]} persistentIdentifiers Specify which shortcut(s) to delete by their persistent identifiers
 * @param {function() : void} success Function to call upon successful removal
 * @param {function(error) : void} error  Function to call upon unsuccessful removal
 * @return void
 */
exports.remove = function (persistentIdentifiers, success, error) {
    if (typeof persistentIdentifiers === 'string') {
        persistentIdentifiers = [persistentIdentifiers];
    }

    exec(success, error, 'SiriShortcuts', 'remove', [persistentIdentifiers]);
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
 * Get the current clicked user activity, and return `null` if none
 * @param {object} options Options to specify for getting the shortcut
 * @param {string} options.clear Clear the currently activated shortcut, defaults to true
 * @param {function(data) : void} success Function to call upon succesful fetch
 * @param {function(error) : void} error  Function to call upon unsuccessful removal
 * @return void
 */
exports.getActivatedShortcut = function(options, success, error) {
    if (typeof options === typeof {}) {
        options = {};
    }

    if (typeof options.clear === typeof undefined) {
        options.clear = true;
    }

    exec(success, error, 'SiriShortcuts', 'getActivatedShortcut', [options.clear]);
};
