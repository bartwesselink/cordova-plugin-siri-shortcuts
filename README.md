# Heads up!
The plugin only works in XCode 10 Beta, and on the iOS 12 platform.

# cordova-plugin-siri-shortcuts

This plugin adds support for donating and removing Siri Shortcuts. The plugin adds the `cordova.plugins.SiriShortcuts` to the global space, but this is only available
after the device has been initialised.


## Installation

This requires Cordova 6.0+

    cordova plugin add cordova-plugin-siri-shortcuts

## Api Reference

<dl>
<dt><a href="#donate">donate(success, error, options)</a> ⇒</dt>
<dd><p>Donate shortcut to Siri</p>
</dd>
<dt><a href="#remove">remove(success, error, options)</a> ⇒</dt>
<dd><p>Remove shortcuts based on identifiers</p>
</dd>
<dt><a href="#removeAll">removeAll(success, error)</a> ⇒</dt>
<dd><p>Remove all shortcuts from the application</p>
</dd>
<dt><a href="#getActivatedShortcut">getActivatedShortcut(success, error)</a> ⇒</dt>
<dd><p>Get the current clicked user activity, and clear if variable set to true</p>
</dd>
</dl>

<a name="donate"></a>

## donate(success, error, options) ⇒
Donate shortcut to Siri

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Function to call upon successful donation |
| error | <code>function</code> | Function to call upon unsuccessful donation, for example if the user has an iOS version < 12.0 |
| options | <code>object</code> | Options to specify for the donation |
| options.persistentIdentifier | <code>string</code> | Specify an identifier to uniquely identify the shortcut, in order to be able to remove it |
| options.title | <code>string</code> | Specify a title for the shortcut, which is visible to the user as the name of the shortcut |
| options.suggestedInvocationPhrase | <code>string</code> | Specify the phrase to give the user some inspiration on what the shortcut to call |
| options.userInfo | <code>object</code> | Provide a key-value object that contains information about the shortcut, this will be returned in the getActivatedShortcut method. It is not possible to use the `persistentIdentifier` key, it is used internally |
| options.isEligibleForSearch | <code>boolean</code> | This value defaults to true, set this value to make it searchable in Siri |
| options.isEligibleForPrediction | <code>boolean</code> | This value defaults to true, set this value to set whether the shortcut eligible for prediction |

<a name="remove"></a>

## remove(success, error, options) ⇒
Remove shortcuts based on identifiers

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Function to call upon successful removal |
| error | <code>function</code> | Function to call upon unsuccessful removal |
| options | <code>object</code> | Options to specify for the donation |
| options.persistentIdentifiers | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Specify which shortcut(s) to delete by their persistent identifiers |

<a name="removeAll"></a>

## removeAll(success, error) ⇒
Remove all shortcuts from the application

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Function to call upon successful removal |
| error | <code>function</code> | Function to call upon unsuccessful removal |

<a name="getActivatedShortcut"></a>

## getActivatedShortcut(success, error) ⇒
Get the current clicked user activity, and clear if variable set to true

**Kind**: global function  
**Returns**: void  

| Param | Type | Description |
| --- | --- | --- |
| success | <code>function</code> | Function to call upon succesful fetch. Data returns either `null` when there is no activated shortcut, or a key-value object containing: ` { persistentIdentifier: string; title: string; userInfo: object; }` |
| error | <code>function</code> | Function to call upon unsuccessful removal |

