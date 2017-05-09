import DateFormat from 'sap/ui/core/format/DateFormat';
import ManagedObject from 'sap/ui/base/ManagedObject';


export default class ServiceClient extends ManagedObject {
  getBaseUrl() {
    return '/api/';
  }

  fetch(path, data) {
    if (data) {
      for (const key in data) {
        const value = data[key];
        if (value instanceof Date) {
          data[key] = value.toISOString();
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
