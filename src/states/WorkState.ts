class WorkState extends BaseState {
  start(_: WorkState): void {}
  finish(): void {}

  constructor(appStateHandler: AppStateHandler) {
    super(25 * 60, appStateHandler);
  }
}
