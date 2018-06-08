import Intents

@objc(SiriShortcuts) class SiriShortcuts : CDVPlugin {
    var activity: NSUserActivity?

    public static func getActivityName() -> String? {
        guard let identifier = Bundle.main.bundleIdentifier else { return nil }

        // corresponds to the NSUserActivityTypes
        let activityName = identifier + ".shortcut"

        return activityName
    }

    func donate(_ command: CDVInvokedUrlCommand) {
        self.commandDelegate!.run(inBackground: {
            if #available(iOS 12.0, *) {
                // corresponds to the NSUserActivityTypes
                guard let activityName = SiriShortcuts.getActivityName() else { return }

                // extract all features
                guard let persistentIdentifier = command.arguments[0] as? String else { return }
                guard let title = command.arguments[1] as? String else { return }
                let suggestedInvocationPhrase = command.arguments[2] as? String
                var userInfo = command.arguments[3] as? [String: Any] ?? [:]
                let isEligibleForSearch = command.arguments[4] as? Bool ?? true
                let isEligibleForPrediction = command.arguments[5] as? Bool ?? true

                userInfo["persistentIdentifier"] = persistentIdentifier

                // create shortcut
                self.activity = NSUserActivity(activityType: activityName)
                self.activity?.title = title
                self.activity?.suggestedInvocationPhrase = suggestedInvocationPhrase
                self.activity?.persistentIdentifier = NSUserActivityPersistentIdentifier(persistentIdentifier)
                self.activity?.isEligibleForSearch = isEligibleForSearch
                self.activity?.isEligibleForPrediction = isEligibleForPrediction

                ActivityDataHolder.setUserInfo(userInfo)

                self.activity?.needsSave = true

                // donate shortcut
                self.viewController?.userActivity = self.activity

                // tell Cordova we're all OK
                self.sendStatusOk(command)

                return
            }

            // shortcut not donated
            self.sendStatusError(command)
        })
    }

    func remove(_ command: CDVInvokedUrlCommand) {
        self.commandDelegate!.run(inBackground: {
            if #available(iOS 12.0, *) {
                // convert all string values to objects, such that they can be removed
                guard let stringIdentifiers = command.arguments[0] as? [String] else { return }
                var persistentIdentifiers: [NSUserActivityPersistentIdentifier] = []

                for stringIdentifier in stringIdentifiers {
                    persistentIdentifiers.append(NSUserActivityPersistentIdentifier(rawValue: stringIdentifier))
                }

                NSUserActivity.deleteSavedUserActivities(withPersistentIdentifiers: persistentIdentifiers, completionHandler: {
                    self.sendStatusOk(command)
                })
            } else {
                self.sendStatusError(command)
            }
        })
    }

    func removeAll(_ command: CDVInvokedUrlCommand) {
        self.commandDelegate!.run(inBackground: {
            if #available(iOS 12.0, *) {
                NSUserActivity.deleteAllSavedUserActivities(completionHandler: {
                    self.sendStatusOk(command)
                })
            } else {
                self.sendStatusError(command)
            }
        })
    }

    func getActivatedShortcut(_ command: CDVInvokedUrlCommand) {
        let appDelegate = UIApplication.shared.delegate as! AppDelegate

        self.commandDelegate!.run(inBackground: {
            if #available(iOS 12.0, *) {
                var pluginResult = CDVPluginResult(
                    status: CDVCommandStatus_OK
                )

                if let userActivity = appDelegate.userActivity {
                    let title = userActivity.title
                    var userInfo = userActivity.userInfo ?? [:]
                    let persistentIdentifier = userInfo["persistentIdentifier"]

                    userInfo.removeValue(forKey: "persistentIdentifier")

                    let returnData = [
                        "title": title,
                        "persistentIdentifier": persistentIdentifier,
                        "userInfo": userInfo,
                    ]

                    pluginResult = CDVPluginResult(
                        status: CDVCommandStatus_OK,
                        messageAs: returnData as [AnyHashable: Any]
                    )
                }

                self.send(pluginResult: pluginResult!, command: command)
            } else {
                self.sendStatusError(command)
            }
        })
    }

    private func sendStatusOk(_ command: CDVInvokedUrlCommand) {
        self.send(status: CDVCommandStatus_OK, command: command)
    }

    private func sendStatusError(_ command: CDVInvokedUrlCommand) {
        self.send(status: CDVCommandStatus_ERROR, command: command)
    }

    private func send(status: CDVCommandStatus, command: CDVInvokedUrlCommand) {
        let pluginResult = CDVPluginResult(
            status: status
        )

        self.send(pluginResult: pluginResult!, command: command)
    }

    private func send(pluginResult: CDVPluginResult, command: CDVInvokedUrlCommand) {
        self.commandDelegate!.send(
            pluginResult,
            callbackId: command.callbackId
        )
    }
}
