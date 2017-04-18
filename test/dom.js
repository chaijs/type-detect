'use strict';

var assert = require('simple-assert');
var type = require('..');
function describeIf(condition) {
  return condition ? describe : describe.skip;
}
function itIf(condition) {
  return condition ? it : it.skip;
}
describeIf(typeof window !== 'undefined' && typeof window.document !== 'undefined')('DOM Specific', function () {

  it('window', function () {
    assert(type(window) === 'global');
  });

  it('document', function () {
    assert(type(document) === 'Document');
  });

  it('domparser', function () {
    assert(type(new DOMParser()) === 'DOMParser');
  });

  it('history', function () {
    assert(type(window.history) === 'History');
  });

  it('location', function () {
    assert(type(window.location) === 'Location');
  });

  it('attr', function () {
    var div = document.createElement('div');
    div.setAttribute('id', 'foo');
    assert(type(div.getAttributeNode('id')) === 'Attr');
  });

  describe('Events', function () {

    it('event', function () {
      assert(type(document.createEvent('Event')) === 'Event');
    });

    itIf(typeof HashChangeEvent !== 'undefined')('HashChangeEvent', function () {
      assert(type(new HashChangeEvent('')) === 'HashChangeEvent');
    });

  });

  describe('Navigator', function () {

    it('navigator', function () {
      assert(type(window.navigator) === 'Navigator');
    });

    itIf(typeof navigator !== 'undefined' && 'geolocation' in navigator)('geolocation', function () {
      assert(type(navigator.geolocation) === 'Geolocation');
    });

    itIf(typeof navigator !== 'undefined' && 'connection' in navigator)('networkinformation', function () {
      assert(type(navigator.connection) === 'NetworkInformation');
    });

    itIf(typeof navigator !== 'undefined' && 'mediaDevices' in navigator)('mediadevices', function () {
      assert(type(navigator.mediaDevices) === 'MediaDevices');
    });

    itIf(typeof navigator !== 'undefined' && 'mimeTypes' in navigator)('mimetypearray', function () {
      assert(type(navigator.mimeTypes) === 'MimeTypeArray');
    });

    itIf(typeof navigator !== 'undefined' && 'nfc' in navigator)('nfc', function () {
      assert(type(navigator.nfc) === 'NFC');
    });

    itIf(typeof navigator !== 'undefined' && 'permissions' in navigator)('permissions', function () {
      assert(type(navigator.permissions) === 'Permissions');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator)('pluginarray', function () {
      assert(type(navigator.plugins) === 'PluginArray');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator && navigator.plugins.length)('plugin', function () {
      assert(type(navigator.plugins[0]) === 'Plugin');
    });

    itIf(typeof navigator !== 'undefined' && 'presentation' in navigator)('presentation', function () {
      assert(type(navigator.presentation) === 'Presentation');
    });

    itIf(typeof navigator !== 'undefined' && 'serviceworker' in navigator)('serviceworkercontainer', function () {
      assert(type(navigator.serviceworker) === 'ServiceWorkerContainer');
    });

    itIf(typeof navigator !== 'undefined' && 'services' in navigator)('serviceportcollection', function () {
      assert(type(navigator.services) === 'ServicePortCollection');
    });

    itIf(typeof navigator !== 'undefined' && 'storage' in navigator)('storagemanager', function () {
      assert(type(navigator.storage) === 'StorageManager');
    });

    itIf(typeof navigator !== 'undefined' && 'storageQuota' in navigator)('storagequota', function () {
      assert(type(navigator.storageQuota) === 'StorageQuota');
    });

    itIf(typeof navigator !== 'undefined' && 'usb' in navigator)('usb', function () {
      assert(type(navigator.usb) === 'USB');
    });

  });

  describe('(HTMLElements)', function () {

    it('HTMLAreaElement', function () {
      assert(type(document.createElement('Area')) === 'HTMLAreaElement');
    });

    it('HTMLBRElement', function () {
      assert(type(document.createElement('BR')) === 'HTMLBRElement');
    });

    it('HTMLBaseElement', function () {
      assert(type(document.createElement('Base')) === 'HTMLBaseElement');
    });

    it('HTMLBodyElement', function () {
      assert(type(document.createElement('Body')) === 'HTMLBodyElement');
    });

    it('HTMLButtonElement', function () {
      assert(type(document.createElement('Button')) === 'HTMLButtonElement');
    });

    it('HTMLCanvasElement', function () {
      assert(type(document.createElement('Canvas')) === 'HTMLCanvasElement');
    });

    it('HTMLDListElement', function () {
      assert(type(document.createElement('DL')) === 'HTMLDListElement');
    });

    // not yet supported in Safari
    itIf(typeof HTMLDataListElement === 'function')('HTMLDataListElement', function () {
      assert(type(document.createElement('DataList')) === 'HTMLDataListElement');
    });

    it('HTMLDivElement', function () {
      assert(type(document.createElement('Div')) === 'HTMLDivElement');
    });

    it('HTMLFieldSetElement', function () {
      assert(type(document.createElement('FieldSet')) === 'HTMLFieldSetElement');
    });

    it('HTMLFormElement', function () {
      assert(type(document.createElement('Form')) === 'HTMLFormElement');
    });

    it('HTMLFrameSetElement', function () {
      assert(type(document.createElement('FrameSet')) === 'HTMLFrameSetElement');
    });

    it('HTMLHRElement', function () {
      assert(type(document.createElement('HR')) === 'HTMLHRElement');
    });

    it('HTMLHeadElement', function () {
      assert(type(document.createElement('Head')) === 'HTMLHeadElement');
    });

    it('HTMLHeadingElement', function () {
      assert(type(document.createElement('H1')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H2')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H3')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H4')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H5')) === 'HTMLHeadingElement');
      assert(type(document.createElement('H6')) === 'HTMLHeadingElement');
    });

    it('HTMLHtmlElement', function () {
      assert(type(document.createElement('Html')) === 'HTMLHtmlElement');
    });

    it('HTMLIFrameElement', function () {
      assert(type(document.createElement('IFrame')) === 'HTMLIFrameElement');
    });

    it('HTMLImageElement', function () {
      assert(type(document.createElement('Img')) === 'HTMLImageElement');
    });

    it('HTMLInputElement', function () {
      assert(type(document.createElement('Input')) === 'HTMLInputElement');
    });

    it('HTMLLIElement', function () {
      assert(type(document.createElement('LI')) === 'HTMLLIElement');
    });

    it('HTMLLabelElement', function () {
      assert(type(document.createElement('Label')) === 'HTMLLabelElement');
    });

    it('HTMLLegendElement', function () {
      assert(type(document.createElement('Legend')) === 'HTMLLegendElement');
    });

    it('HTMLLinkElement', function () {
      assert(type(document.createElement('Link')) === 'HTMLLinkElement');
    });

    it('HTMLMapElement', function () {
      assert(type(document.createElement('Map')) === 'HTMLMapElement');
    });

    it('HTMLMetaElement', function () {
      assert(type(document.createElement('Meta')) === 'HTMLMetaElement');
    });

    itIf(typeof HTMLMeterElement !== 'undefined')('HTMLMeterElement', function () {
      assert(type(document.createElement('Meter')) === 'HTMLMeterElement');
    });

    it('HTMLModElement', function () {
      assert(type(document.createElement('Del')) === 'HTMLModElement');
    });

    it('HTMLOListElement', function () {
      assert(type(document.createElement('OL')) === 'HTMLOListElement');
    });

    it('HTMLOptGroupElement', function () {
      assert(type(document.createElement('OptGroup')) === 'HTMLOptGroupElement');
    });

    it('HTMLOptionElement', function () {
      assert(type(document.createElement('Option')) === 'HTMLOptionElement');
    });

    itIf(typeof HTMLOutputElement !== 'undefined')('HTMLOutputElement', function () {
      assert(type(document.createElement('Output')) === 'HTMLOutputElement');
    });

    it('HTMLParagraphElement', function () {
      assert(type(document.createElement('P')) === 'HTMLParagraphElement');
    });

    it('HTMLParamElement', function () {
      assert(type(document.createElement('Param')) === 'HTMLParamElement');
    });

    it('HTMLPreElement', function () {
      assert(type(document.createElement('Pre')) === 'HTMLPreElement');
    });

    itIf(typeof HTMLProgressElement !== 'undefined')('HTMLProgressElement', function () {
      assert(type(document.createElement('Progress')) === 'HTMLProgressElement');
    });

    it('HTMLQuoteElement', function () {
      assert(type(document.createElement('BlockQuote')) === 'HTMLQuoteElement');
      assert(type(document.createElement('Q')) === 'HTMLQuoteElement');
    });

    it('HTMLScriptElement', function () {
      assert(type(document.createElement('Script')) === 'HTMLScriptElement');
    });

    it('HTMLSelectElement', function () {
      assert(type(document.createElement('Select')) === 'HTMLSelectElement');
    });

    it('HTMLSpanElement', function () {
      assert(type(document.createElement('Span')) === 'HTMLSpanElement');
    });

    it('HTMLStyleElement', function () {
      assert(type(document.createElement('Style')) === 'HTMLStyleElement');
    });

    it('HTMLTableCaptionElement', function () {
      assert(type(document.createElement('Caption')) === 'HTMLTableCaptionElement');
    });

    it('HTMLTableDataCellElement', function () {
      assert(type(document.createElement('TD')) === 'HTMLTableDataCellElement');
    });

    it('HTMLTableHeaderCellElement', function () {
      assert(type(document.createElement('TH')) === 'HTMLTableHeaderCellElement');
    });

    it('HTMLTableColElement', function () {
      assert(type(document.createElement('Col')) === 'HTMLTableColElement');
      assert(type(document.createElement('ColGroup')) === 'HTMLTableColElement');
    });

    it('HTMLTableElement', function () {
      assert(type(document.createElement('Table')) === 'HTMLTableElement');
    });

    it('HTMLTableRowElement', function () {
      assert(type(document.createElement('TR')) === 'HTMLTableRowElement');
    });

    it('HTMLTableSectionElement', function () {
      assert(type(document.createElement('THead')) === 'HTMLTableSectionElement');
      assert(type(document.createElement('TBody')) === 'HTMLTableSectionElement');
      assert(type(document.createElement('TFoot')) === 'HTMLTableSectionElement');
    });

    it('HTMLTextAreaElement', function () {
      assert(type(document.createElement('TextArea')) === 'HTMLTextAreaElement');
    });

    it('HTMLTitleElement', function () {
      assert(type(document.createElement('Title')) === 'HTMLTitleElement');
    });

    it('HTMLUListElement', function () {
      assert(type(document.createElement('UL')) === 'HTMLUListElement');
    });

    it('HTMLUnknownElement', function () {
      assert(type(document.createElement('foobarbaz')) === 'HTMLUnknownElement');
    });

  });

});
