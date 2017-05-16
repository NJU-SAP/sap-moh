import Application from 'nju/app/Application';
import View from 'nju/view/View';


export default class Dialog extends View {
  metadata = {
    properties: {
      title: {
        type: 'string'
      }
    }
  }


  init() {
    super.init();

    this.addStyleClass('bd-dialog');

    this.dragContext = { mouseX: 0, mouseY: 0, left: 0, top: 0 };
    this._originPosition = null;                                  // Dialog's original position, including top, left.
    this._moving = null;                                          // True represents that dialog is moving.

    // Press Esc to close popup.
    this.$element.on('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closePopup();
      }
    });

    this._initiOctagon();
    this._initContainer();
  }

  _initiOctagon() {
    this.$octagon = $('<div class=octagon><aside class=top><span/></aside><aside class=bottom><span/></aside><aside class=left><span/></aside><aside class=right><span/></aside>' +
      '<aside class=left-top><span/></aside><aside class=right-top><span/></aside><aside class=left-bottom><span/></aside><aside class=right-bottom><span/></aside><main/></div>');
    this.$element.append(this.$octagon);
  }

  _initContainer() {
    this.$container = $('<div class=container></div>');
    this._initHeader();
    this._initMain();
    this.$element.append(this.$container);
  }

  _initHeader() {
    this.$title = $("<header><span class='title h2'/></header>");
    this.$container.append(this.$title);

    this.$title.on('mousedown', (e) => {
      _dialog_onmovestart('mouse', e);
    });
    this.$title.on('touchstart', (e) => {
      _dialog_onmovestart('touch', e);
    });

    function _dialog_onmovestart(interactionMode, e) {
      // Prevent answers to click action.
      if (this._moving) {
        return;
      }
      this._moving = true;

      e.preventDefault();
      this.$title.css('cursor', 'move');
      this.$dialog = $(e.currentTarget).parent().parent();
      this.dragContext.mouseX = interactionMode === 'touch' ? e.touches[0].clientX : e.screenX;
      this.dragContext.mouseY = interactionMode === 'touch' ? e.touches[0].clientY : e.screenY;
      this.dragContext.left = this.$dialog.position().left;
      this.dragContext.top = this.$dialog.position().top;

      const scale = 1.04;
      // Pick up dialog.
      this.$dialog.transition({
        scale,
        opacity: 0.68
      }, 100);

      $(document.body).on(`${interactionMode}move`, (event) => {
        _dialog_onmoving(interactionMode, event);
      });

      $(document.body).on(interactionMode === 'touch' ? 'touchend' : 'mouseup', (event) => {
        _dialog_onmoveend(event);
      });
    }

    function _dialog_onmoving(interactionMode, e) {
      const clientX = interactionMode === 'touch' ? e.touches[0].clientX : e.screenX;
      const clientY = interactionMode === 'touch' ? e.touches[0].clientY : e.screenY;
      const mouseOffsetX = clientX - this.dragContext.mouseX;
      const mouseOffsetY = clientY - this.dragContext.mouseY;

      let newTop = this.dragContext.top + mouseOffsetY;
      const bodyHeight = $(document.body).height();
      const titleHeight = this.$title.height();

      // Prevent dialog from dragging out of body-top-margin.
      if ((newTop) <= 0) {
        newTop = 0;
      }

      if ((newTop + titleHeight) > bodyHeight) {
        newTop = bodyHeight - titleHeight;
      }

      this.$dialog.css({
        top: newTop,
        left: this.dragContext.left + mouseOffsetX
      });
    }

    function _dialog_onmoveend(e) {
      $(document.body).off('mousemove');
      $(document.body).off('touchmove');
      this.$title.css('cursor', 'default');
      $(document.body).off('mouseup');
      $(document.body).off('touchend');
      this.$dialog.transition({
        scale: 1,
        opacity: 1
      }, () => {
        this._moving = false;
      });
    }
  }

  _initMain() {
    this.$main = $('<main/>');
    this.$container.append(this.$main);
  }

  setTitle(title) {
    this.setProperty('title', title);
    this.$title.text(title);
  }

  activate(params) {
    // Set popup on focus.
    this.$element.attr('tabindex', 0);
    this.$element.focus();

    // Get original position of dialog.
    if (!this._originPosition) {
      this._originPosition = {};
      this._originPosition.left = this.$element.position().left;
      this._originPosition.top = this.$element.position().top;
    }
  }

  deactivate() {
    // Reset position of dialog to origin.
    this.$element.css({
      left: this._originPosition.left,
      top: this._originPosition.top
    });
  }

  // popup dialog
  popup(params, options) {
    if (Application.getInstance() && typeof Application.getInstance().popupDialog === 'function') {
      Application.getInstance().popupDialog(this, params, options);
    }
  }

  // if popup is self, close it
  closePopup(cb) {
    if (Application.getInstance() && Application.getInstance().activeDialogPopup === this) {
      Application.getInstance().closePopupDialog();
    }
  }

  putAside() {
    this.$element.addClass('aside');
    Application.getInstance().$overlay.fadeOut();
    setTimeout(() => {
      this.$element.one('mouseup', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.resume();
      });
    }, 1000);
  }

  resume() {
    this.$element.removeClass('aside');
    Application.getInstance().$overlay.fadeIn();
  }
}
