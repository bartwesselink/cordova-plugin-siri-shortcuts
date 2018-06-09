import Intents
import IntentsUI

class ShortcutPresentedDelegate: NSObject, INUIAddVoiceShortcutViewControllerDelegate {
    let command: CDVInvokedUrlCommand
    let shortcuts: SiriShortcuts

    init(command: CDVInvokedUrlCommand, shortcuts: SiriShortcuts) {
        self.command = command
        self.shortcuts = shortcuts
    }

    @available(iOS 12.0, *)
    func addVoiceShortcutViewController(_ controller: INUIAddVoiceShortcutViewController,
                                        didFinishWith voiceShortcut: INVoiceShortcut?,
                                        error: Error?) {
        if let error = error as NSError? {
            self.shortcuts.sendStatusError(self.command, error: "Internal error occured.")

            return
        }

        self.shortcuts.sendStatusOk(self.command)

        controller.dismiss(animated: true)
    }

    @available(iOS 12.0, *)
    func addVoiceShortcutViewControllerDidCancel(_ controller: INUIAddVoiceShortcutViewController) {
        self.shortcuts.sendStatusError(self.command, error: "Siri shortcut dismissed.")

        controller.dismiss(animated: true)
    }
}
