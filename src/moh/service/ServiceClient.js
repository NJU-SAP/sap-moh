import DateFormat from 'sap/ui/core/format/DateFormat';
import ManagedObject from 'sap/ui/base/ManagedObject';


export default class ServiceClient extends ManagedObject {
  init() {
    this._dateFormat = DateFormat.getDateTimeInstance({ pattern: 'HH:mms' });
  }

  getBaseUrl() {
    return '/api';
  }

  fetch(path, data) {
    if (data) {
      for (const key in data) {
        const value = data[key];
        if (value instanceof Date) {
          data[key] = this._dateFormat.format(value, true);
        }
      }
    }
    const promise = $.ajax({
      url: this.resolveUrl(path),
      data
    });
    return promise;
  }

  resolveUrl(url) {
    return this.getBaseUrl() + (url.startsWith('/') ? url.substr(1) : url);
  }
}
