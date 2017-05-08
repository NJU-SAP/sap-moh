import JSONModel from 'sap/ui/model/json/JSONModel';
import ManagedObject from 'sap/ui/base/ManagedObject';

export default class StateBus extends ManagedObject {
  metadata = {
    events: {
      ready: {}
    }
  };

  static _instance = null;

  constructor(...args) {
    super(...args);
    if (nju.state.StateBus._instance === null) {
      nju.state.StateBus._instance = this;
    } else {
      throw new Error('nju.state.StateBus can only be instantiated once.');
    }
    this.afterInit();
  }

  static getInstance() {
    if (nju.state.StateBus._instance === null) {
      throw new Error("nju.state.StateBus has not been instantiated. Please use 'new nju.state.StateBus(options)' to initialize it before getInstance().");
    }
    return nju.state.StateBus._instance;
  }

  init() {
    this._model = new JSONModel();
    sap.ui.getCore().setModel(this._model, 'state');
  }

  afterInit() {
    let initialState = null;
    const result = this.getInitialState();
    if (result instanceof Promise) {
      result.then((state) => {
        initialState = state;
        this._setInitialState(initialState);
      });
    } else {
      initialState = result;
      setTimeout(() => {
        this._setInitialState(initialState);
      }, 0);
    }
  }

  getInitialState() {
    return {};
  }

  getState(path) {
    return this._model.getProperty(_resolvePath(path));
  }

  setState(path, state) {
    this._model.setProperty(_resolvePath(path), state);
    return this;
  }

  bindState(path) {
    return this._model.bindProperty(_resolvePath(path));
  }


  _setInitialState(state) {
    this._model.setData(state, false);
    this.fireReady();
  }
}


function _resolvePath(path) {
  if (typeof (path) !== 'string') {
    throw new Error('Path must be a string.');
  }
  path = path.trim();
  if (path === '') {
    throw new Error('Path can not be an empty string.');
  }
  if (!path.startsWith('/')) {
    return `/${path}`;
  }

  return path;
}
