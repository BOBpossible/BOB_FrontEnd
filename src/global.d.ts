declare namespace ReactNavigation {
  interface RootParamList {
    Login: undefined;
    OwnerLogin: undefined;
    MainNavigator: undefined;
    MissionNavigator: undefined;
    Register: undefined;
    RegisterCategory: {registerData: RegisterInterface};
    KakaoLogin: undefined;
    NaverLogin: undefined;
    HomeMissionDetails: {missionId: number};
    Mission: undefined;
    Notifications: {userId: number};
    HowToLong: undefined;
    AuthNavigator: undefined;
    Main: undefined;
    MyPoint: {point: number | undefined};
    MyReview: undefined;
    MyNotificationsSetting: undefined;
    MyInquiry: undefined;
    MyChangePointDone: undefined;
    EventPage: {scroll: number};
  }
}
