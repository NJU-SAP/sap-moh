import View from 'nju/view/View';


export default class SegmentControl extends View {
  metadata = {
    properties: {
      segments: { type: 'any', defaultValue: ['Left', 'Right'] } // Segments require string or array of strings.
    },

    events: {
      segmentSelected: {
        parameters: {
          segmentName: { type: 'string' }
        }
      }
    }
  }

  init() {
    super.init();
    this._$selectedSegment = null;
    this._initControl();
  }

  _initControl() {
    this.$element = $('<ul/>');
    this.addStyleClass('segment-control');
    this.$element.on('click', 'li', (e) => {
      this._selectSegment($(e.currentTarget).text());
    });
    this._initSegments();
  }

  _initSegments() {
    const segments = this.getSegments();
    this._renderSegments(segments);
  }

  setSegments(segments) {
    this.setProperty('segments', segments);
    this.$element.empty();
    this._$selectedSegment = null;
    this._renderSegments(segments);
  }

  _renderSegments(segments) {
    // Parameter normalization.
    if (typeof segments === 'string') {
      this._renderSingleSegment(segments);
      this._selectSegment(0);
    } else if (Array.isArray(segments)) {
      segments.forEach((segment, i) => {
        this._renderSingleSegment(segment);
        if (i === 0) {
          this._selectSegment(i);
        }
      });
    } else {
      throw new Error('Invalid type of segments.');
    }
  }

  _renderSingleSegment(segment) {
    // Check parameter.
    if (typeof segment !== 'string') {
      throw new Error('Invalid type of single segment.');
    }
    const $segment = $('<li/>');
    $segment.text(segment);
    this.$element.append($segment);
  }

  _selectSegment(segment) {
    let $segment = null;   // Jquery object of segment to be select.

    // Parameter normalization. Require number or string input.
    if (typeof segment === 'number') {
      $segment = this.$element.children('li').eq(segment);
    } else if (typeof segment === 'string') {
      const $segments = this.$element.children('li');

      $segments.each(() => {
        if ($(this).text() === segment) {
          $segment = $(this);
        }
      });
    } else {
      throw new Error('Invalid type of segment while selecting.');
    }

    if (!$segment) {
      throw new Error(`No segment index or name ${segment} found.`);
    }

    if (this._$selectedSegment) {
      if (this._$selectedSegment.text() === $segment.text()) {
        return;
      }
      this._$selectedSegment.removeClass('active');
    }
    this._$selectedSegment = $segment;
    this._$selectedSegment.addClass('active');
    this.fireSegmentSelected({
      segmentName: $segment.text()
    });
  }
}
