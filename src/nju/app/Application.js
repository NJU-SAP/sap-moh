import View from 'nju/view/View';


export default class Application extends View {
  static _instance = null;

  constructor(...args) {
    super(...args);

    nju.app.Application._instance = this;
  }

  static getInstance() {
    return nju.app.Application._instance;
  }

  run() {

  }
}
