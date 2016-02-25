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
    assert(type(document) === 'htmldocument');
  });

  it('domparser', function () {
    assert(type(new DOMParser()) === 'domparser');
  });

  it('history', function () {
    assert(type(window.history) === 'history');
  });

  it('location', function () {
    assert(type(window.location) === 'location');
  });

  it('attr', function () {
    var div = document.createElement('div');
    div.setAttribute('id', 'foo');
    assert(type(div.getAttributeNode('id')) === 'attr');
  });

  describe('Events', function () {

    it('event', function () {
      assert(type(document.createEvent('Event')) === 'event');
    });

    itIf(typeof HashChangeEvent !== 'undefined')('hashchangeevent', function () {
      assert(type(new HashChangeEvent('')) === 'hashchangeevent');
    });

  });

  describe('Navigator', function () {

    it('navigator', function () {
      assert(type(window.navigator) === 'navigator');
    });

    itIf(typeof navigator !== 'undefined' && 'geolocation' in navigator)('geolocation', function () {
      assert(type(navigator.geolocation) === 'geolocation');
    });

    itIf(typeof navigator !== 'undefined' && 'connection' in navigator)('networkinformation', function () {
      assert(type(navigator.connection) === 'networkinformation');
    });

    itIf(typeof navigator !== 'undefined' && 'mediaDevices' in navigator)('mediadevices', function () {
      assert(type(navigator.mediaDevices) === 'mediadevices');
    });

    itIf(typeof navigator !== 'undefined' && 'mimeTypes' in navigator)('mimetypearray', function () {
      assert(type(navigator.mimeTypes) === 'mimetypearray');
    });

    itIf(typeof navigator !== 'undefined' && 'nfc' in navigator)('nfc', function () {
      assert(type(navigator.nfc) === 'nfc');
    });

    itIf(typeof navigator !== 'undefined' && 'permissions' in navigator)('permissions', function () {
      assert(type(navigator.permissions) === 'permissions');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator)('pluginarray', function () {
      assert(type(navigator.plugins) === 'pluginarray');
    });

    itIf(typeof navigator !== 'undefined' && 'plugins' in navigator && navigator.plugins.length)('plugin', function () {
      assert(type(navigator.plugins[0]) === 'plugin');
    });

    itIf(typeof navigator !== 'undefined' && 'presentation' in navigator)('presentation', function () {
      assert(type(navigator.presentation) === 'presentation');
    });

    itIf(typeof navigator !== 'undefined' && 'serviceworker' in navigator)('serviceworkercontainer', function () {
      assert(type(navigator.serviceworker) === 'serviceworkercontainer');
    });

    itIf(typeof navigator !== 'undefined' && 'services' in navigator)('serviceportcollection', function () {
      assert(type(navigator.services) === 'serviceportcollection');
    });

    itIf(typeof navigator !== 'undefined' && 'storage' in navigator)('storagemanager', function () {
      assert(type(navigator.storage) === 'storagemanager');
    });

    itIf(typeof navigator !== 'undefined' && 'storageQuota' in navigator)('storagequota', function () {
      assert(type(navigator.storageQuota) === 'storagequota');
    });

    itIf(typeof navigator !== 'undefined' && 'usb' in navigator)('usb', function () {
      assert(type(navigator.usb) === 'usb');
    });

  });

  describe('(HTMLElements)', function () {

    it('HTMLAreaElement', function () {
      assert(type(document.createElement('Area')) === 'htmlareaelement');
    });

    it('HTMLBRElement', function () {
      assert(type(document.createElement('BR')) === 'htmlbrelement');
    });

    it('HTMLBaseElement', function () {
      assert(type(document.createElement('Base')) === 'htmlbaseelement');
    });

    it('HTMLBodyElement', function () {
      assert(type(document.createElement('Body')) === 'htmlbodyelement');
    });

    it('HTMLButtonElement', function () {
      assert(type(document.createElement('Button')) === 'htmlbuttonelement');
    });

    it('HTMLCanvasElement', function () {
      assert(type(document.createElement('Canvas')) === 'htmlcanvaselement');
    });

    it('HTMLDListElement', function () {
      assert(type(document.createElement('DL')) === 'htmldlistelement');
    });

    // not yet supported in Safari
    itIf(typeof HTMLDataListElement === 'function')('HTMLDataListElement', function () {
      assert(type(document.createElement('DataList')) === 'htmldatalistelement');
    });

    it('HTMLDivElement', function () {
      assert(type(document.createElement('Div')) === 'htmldivelement');
    });

    it('HTMLFieldSetElement', function () {
      assert(type(document.createElement('FieldSet')) === 'htmlfieldsetelement');
    });

    it('HTMLFormElement', function () {
      assert(type(document.createElement('Form')) === 'htmlformelement');
    });

    it('HTMLFrameSetElement', function () {
      assert(type(document.createElement('FrameSet')) === 'htmlframesetelement');
    });

    it('HTMLHRElement', function () {
      assert(type(document.createElement('HR')) === 'htmlhrelement');
    });

    it('HTMLHeadElement', function () {
      assert(type(document.createElement('Head')) === 'htmlheadelement');
    });

    it('HTMLHeadingElement', function () {
      assert(type(document.createElement('H1')) === 'htmlheadingelement');
      assert(type(document.createElement('H2')) === 'htmlheadingelement');
      assert(type(document.createElement('H3')) === 'htmlheadingelement');
      assert(type(document.createElement('H4')) === 'htmlheadingelement');
      assert(type(document.createElement('H5')) === 'htmlheadingelement');
      assert(type(document.createElement('H6')) === 'htmlheadingelement');
    });

    it('HTMLHtmlElement', function () {
      assert(type(document.createElement('Html')) === 'htmlhtmlelement');
    });

    it('HTMLIFrameElement', function () {
      assert(type(document.createElement('IFrame')) === 'htmliframeelement');
    });

    it('HTMLImageElement', function () {
      assert(type(document.createElement('Img')) === 'htmlimageelement');
    });

    it('HTMLInputElement', function () {
      assert(type(document.createElement('Input')) === 'htmlinputelement');
    });

    it('HTMLLIElement', function () {
      assert(type(document.createElement('LI')) === 'htmllielement');
    });

    it('HTMLLabelElement', function () {
      assert(type(document.createElement('Label')) === 'htmllabelelement');
    });

    it('HTMLLegendElement', function () {
      assert(type(document.createElement('Legend')) === 'htmllegendelement');
    });

    it('HTMLLinkElement', function () {
      assert(type(document.createElement('Link')) === 'htmllinkelement');
    });

    it('HTMLMapElement', function () {
      assert(type(document.createElement('Map')) === 'htmlmapelement');
    });

    it('HTMLMetaElement', function () {
      assert(type(document.createElement('Meta')) === 'htmlmetaelement');
    });

    itIf(typeof HTMLMeterElement !== 'undefined')('HTMLMeterElement', function () {
      assert(type(document.createElement('Meter')) === 'htmlmeterelement');
    });

    it('HTMLModElement', function () {
      assert(type(document.createElement('Del')) === 'htmlmodelement');
    });

    it('HTMLOListElement', function () {
      assert(type(document.createElement('OL')) === 'htmlolistelement');
    });

    it('HTMLOptGroupElement', function () {
      assert(type(document.createElement('OptGroup')) === 'htmloptgroupelement');
    });

    it('HTMLOptionElement', function () {
      assert(type(document.createElement('Option')) === 'htmloptionelement');
    });

    itIf(typeof HTMLOutputElement !== 'undefined')('HTMLOutputElement', function () {
      assert(type(document.createElement('Output')) === 'htmloutputelement');
    });

    it('HTMLParagraphElement', function () {
      assert(type(document.createElement('P')) === 'htmlparagraphelement');
    });

    it('HTMLParamElement', function () {
      assert(type(document.createElement('Param')) === 'htmlparamelement');
    });

    it('HTMLPreElement', function () {
      assert(type(document.createElement('Pre')) === 'htmlpreelement');
    });

    itIf(typeof HTMLProgressElement !== 'undefined')('HTMLProgressElement', function () {
      assert(type(document.createElement('Progress')) === 'htmlprogresselement');
    });

    it('HTMLQuoteElement', function () {
      assert(type(document.createElement('BlockQuote')) === 'htmlquoteelement');
      assert(type(document.createElement('Q')) === 'htmlquoteelement');
    });

    it('HTMLScriptElement', function () {
      assert(type(document.createElement('Script')) === 'htmlscriptelement');
    });

    it('HTMLSelectElement', function () {
      assert(type(document.createElement('Select')) === 'htmlselectelement');
    });

    it('HTMLSpanElement', function () {
      assert(type(document.createElement('Span')) === 'htmlspanelement');
    });

    it('HTMLStyleElement', function () {
      assert(type(document.createElement('Style')) === 'htmlstyleelement');
    });

    it('HTMLTableCaptionElement', function () {
      assert(type(document.createElement('Caption')) === 'htmltablecaptionelement');
    });

    it('HTMLTableDataCellElement', function () {
      assert(type(document.createElement('TD')) === 'htmltabledatacellelement');
    });

    it('HTMLTableHeaderCellElement', function () {
      assert(type(document.createElement('TH')) === 'htmltableheadercellelement');
    });

    it('HTMLTableColElement', function () {
      assert(type(document.createElement('Col')) === 'htmltablecolelement');
      assert(type(document.createElement('ColGroup')) === 'htmltablecolelement');
    });

    it('HTMLTableElement', function () {
      assert(type(document.createElement('Table')) === 'htmltableelement');
    });

    it('HTMLTableRowElement', function () {
      assert(type(document.createElement('TR')) === 'htmltablerowelement');
    });

    it('HTMLTableSectionElement', function () {
      assert(type(document.createElement('THead')) === 'htmltablesectionelement');
      assert(type(document.createElement('TBody')) === 'htmltablesectionelement');
      assert(type(document.createElement('TFoot')) === 'htmltablesectionelement');
    });

    it('HTMLTextAreaElement', function () {
      assert(type(document.createElement('TextArea')) === 'htmltextareaelement');
    });

    it('HTMLTitleElement', function () {
      assert(type(document.createElement('Title')) === 'htmltitleelement');
    });

    it('HTMLUListElement', function () {
      assert(type(document.createElement('UL')) === 'htmlulistelement');
    });

    it('HTMLUnknownElement', function () {
      assert(type(document.createElement('foobarbaz')) === 'htmlunknownelement');
    });

  });

});
