import CheckboxView from 'bd/view/CheckboxView';

export default class CongestionCheckboxView extends CheckboxView {
  metadata = {
    properties: {
      leftValue: { type: 'string' },
      rightValue: { type: 'string' }
    }
  }

  init() {
    super.init();
  }
}
