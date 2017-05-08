import SuperApplication from 'nju/app/Application';

import DataClockView from '../view/DataClockView';

export default class Application extends SuperApplication {
  init() {
    super.init();
    this.addStyleClass('bd-app');

    this._initLayers();
    this._initDataClockView();
    this._initMainMenu();
    this._initOverlay();
    this._initBrand();
  }

  _initLayers() {
    this.$layers = [];
    this.addLayer('base');
    this.addLayer('control');
    this.addLayer('tile');
    this.addLayer('mainMenu');
    this.addLayer('floatingPanel');
    this.addLayer('popup');
  }

  _initDataClockView() {
    const dataClockView = new DataClockView('dataClockView');
    dataClockView.addStyleClass('top-1 left-7');
    this.addSubview(dataClockView, 'control');
  }

  _initMainMenu() {
    // const mainMenu = new MainMenu('mainMenu');
    // this.addSubview(mainMenu, 'mainMenu');
  }

  _initOverlay() {
    this.$overlay = $('<div id=bd-overlay />');
    this.$loading = $('<div class="loading"> <div class="gel center-gel"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c1 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c2 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c3 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c4 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c5 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c6 r1"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c7 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c8 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c9 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c10 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c11 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c12 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c13 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c14 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c15 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c16 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c17 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c18 r2"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c19 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c20 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c21 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c22 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c23 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c24 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c25 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c26 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c28 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c29 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c30 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c31 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c32 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c33 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c34 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c35 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c36 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> <div class="gel c37 r3"> <div class="hex-brick h1"></div> <div class="hex-brick h2"></div> <div class="hex-brick h3"></div> </div> </div>');
    this.$overlay.on('click', () => {
      this.closePopupScene();
    });
  }

  _initBrand() {
    this.$brand = $("<div id=bd-brand class='top-1 left-1' />");
    this.getLayer('control').append(this.$brand);
  }

  addLayer(id) {
    const $layer = $("<div class='bd-layer'></div>");
    $layer.attr('id', `bd-${id}-layer`);
    this.$layers[id] = $layer;
    this.$layers.push($layer);
    this.$element.append($layer);
    return $layer;
  }

  getLayer(id) {
    const $layer = this.$layers[id];
    return $layer || null;
  }

  addSubview(view, layerId) {
    if (typeof (layerId) === 'string') {
      const $layer = this.getLayer(layerId);
      const layerIndex = this.$layers.indexOf($layer);
      view.$element.css('z-index', layerIndex * 100);
      super.addSubview(view, $layer);
    } else {
      super.addSubview(view, layerId);
    }
  }

  showOverlay(callback, opacity = 1) {
    this.$element.append(this.$overlay);
    this.$overlay.css({
      opacity: 0
    }).transit({
      opacity
    }, 200, () => {
      if (typeof (callback) === 'function') {
        callback();
      }
    });
  }

  hideOverlay(callback) {
    this.$overlay.transit({
      opacity: 0
    }, 100, () => {
      this.$overlay.detach();
      if (typeof (callback) === 'function') {
        callback();
      }
    });
  }

  showLoading(callback) {
    this.$overlay.append(this.$loading);
    this.showOverlay(callback);
  }

  hideLoading(callback) {
    this.$overlay.transit({
      opacity: 0,
      scale: 3
    }, 1200, () => {
      this.$overlay.detach();
      this.$overlay.css({
        scale: 1
      });
      this.$loading.detach();
      if (typeof (callback) === 'function') {
        callback();
      }
    });
  }

  popupScene(scene) {
    if (this.animating) {
      return;
    }
    this.animating = true;

    this.showOverlay(() => {
      this.addSubview(scene, 'popup');
      scene.$element.css({
        opacity: 0,
        scale: 0.5
      }).transit({
        opacity: 1,
        scale: 1
      }, 300, () => {
        scene.activate();
        this.animating = false;
      });
    });
    this.activePopup = scene;
  }

  closePopupScene(options) {
    let hideOverlay = null;
    if (options) {
      if (options.hideOverlay !== null && options.hideOverlay !== undefined) {
        hideOverlay = options.hideOverlay;
      }
    }
    if (hideOverlay === null) {
      hideOverlay = true;
    }

    if (this.activePopup) {
      if (this.animating) {
        return;
      }
      this.animating = true;
      this.activePopup.$element.transit({
        opacity: 0,
        scale: 0.6
      }, () => {
        this.activePopup.deactivate();
        this.activePopup.$element.detach();
        this.removeSubview(this.activePopup);
        if (hideOverlay) {
          this.hideOverlay(() => {
            this.activePopup = null;
            this.animating = false;
          });
        } else {
          this.activePopup = null;
          this.animating = false;
        }
      });
    }
  }

  popupDialog(dialog, params, options) {
    if (this.dialogAnimating) {
      return;
    }

    let opacity = options ? options.opacity : 1;
    if (!opacity) {
      opacity = 1;
    }

    this.dialogAnimating = true;

    this.showOverlay(() => {
      this.addSubview(dialog, 'popup');

      // Place dialong in the center of the screen.
      const dataClockHeight = this.getSubview('dataClockView').$element.height();
      const mainMenuHeight = this.getSubview('mainMenu').$element.height();
      dialog.$element.css({
        left: `${(window.innerWidth - dialog.$element.width()) / 2}px`,
        top: `${((window.innerHeight - dataClockHeight - mainMenuHeight - dialog.$element.height()) / 2) + dataClockHeight}px`
      });

      dialog.$element.css({
        opacity: 0,
        scale: 0.5
      }).transit({
        opacity: 1,
        scale: 1
      }, 300, () => {
        dialog.activate(params);
        this.dialogAnimating = false;
      });
    }, opacity);
    this.activeDialogPopup = dialog;
    this.$overlay.on('click', () => {
      this.closePopupDialog();
    });
  }

  closePopupDialog() {
    if (this.activeDialogPopup) {
      if (this.dialogAnimating) {
        return;
      }
      this.dialogAnimating = true;
      this.activeDialogPopup.$element.transit({
        opacity: 0,
        scale: 0.6
      }, () => {
        this.activeDialogPopup.deactivate();
        this.activeDialogPopup.$element.detach();
        this.removeSubview(this.activeDialogPopup);
        this.hideOverlay(() => {
          this.activeDialogPopup = null;
          this.dialogAnimating = false;
          this.getSubview('mapView').resetLayers();
        });
      });
    }
  }
}
