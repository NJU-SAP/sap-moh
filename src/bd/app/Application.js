import SuperApplication from 'nju/app/Application';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('bd-app');
  }
}
