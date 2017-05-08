import SuperApplication from 'bd/app/Application';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('moh-app');
  }
}
