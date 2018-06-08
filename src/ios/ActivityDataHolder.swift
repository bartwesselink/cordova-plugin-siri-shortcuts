class ActivityDataHolder {
    private static var userInfo: [AnyHashable: Any]?
    
    public static func getUserInfo() -> [AnyHashable: Any]? {
        return self.userInfo;
    }
    
    public static func setUserInfo(_ userInfo: [AnyHashable: Any]?) -> Void {
        self.userInfo = userInfo
    }
}
