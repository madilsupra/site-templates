let typesMap = new Map();
let innerCSS = `${'\x0D\x0A  body {\x0D\x0A    margin:0;\x0D\x0A    padding:0;\x0D\x0A    max-width:100%;\x0D\x0A  }\x0D\x0A  terminal {\x0D\x0A    display:flex;\x0D\x0A  }\x0D\x0A  .all-containers > * {\x0D\x0A    display:flex;\x0D\x0A    display:inline-block;\x0D\x0A  }\x0D\x0A  .lines-container {\x0D\x0A    background-color:#006c4a;\x0D\x0A    border-bottom-left-radius:10px;\x0D\x0A    color:white;\x0D\x0A    display:flex;\x0D\x0A    flex:1;\x0D\x0A    padding-left:5px;\x0D\x0A    padding-right:5px;\x0D\x0A    padding-top:15px;\x0D\x0A    padding-bottom:15px;\x0D\x0A    text-align:right;\x0D\x0A    white-space:break-spaces;\x0D\x0A  }\x0D\x0A  .codes-container {\x0D\x0A    color: white;\x0D\x0A    background-color:#012922;\x0D\x0A    border-bottom-right-radius:10px;\x0D\x0A    flex:1;\x0D\x0A    max-width:100%;\x0D\x0A    overflow-x:auto;\x0D\x0A    padding-top:2.2px;\x0D\x0A    padding-left:15px;\x0D\x0A    text-align:left;\x0D\x0A    white-space:break-spaces;\x0D\x0A  }'}`;

function terminalTextToClipboard(_0xc924x4) {
  if (_0xc924x4['innerText'] == 'Copy') {
    setTimeout(() => {
      _0xc924x4['innerHTML'] = 'Copy'
    }, 2000);
    let _0xc924x5 = _0xc924x4['parentElement']['nextElementSibling']['contentDocument'];
    let _0xc924x6 = _0xc924x5['querySelector']('pre')['innerText'];
    navigator['clipboard']['writeText'](_0xc924x6);
    _0xc924x4['innerHTML'] = 'Copied!'
  }
}

function resizeIframe(_0xc924x8, _0xc924x9, _0xc924xa) {
  let _0xc924x5 = _0xc924x8['contentDocument']['querySelector']('terminal[class=\'all-containers\']');
  let _0xc924xb = _0xc924x5['querySelector']('div[class=\'codes-container\']');
  _0xc924x8['style']['borderBottomLeftRadius'] = '10px';
  _0xc924x8['style']['borderBottomRightRadius'] = '10px';
  _0xc924x8['style']['width'] = '100%';
  _0xc924x8['style']['height'] = ((parseInt(_0xc924xb['scrollHeight']) <= _0xc924x9) ? _0xc924xb['scrollHeight'] : _0xc924x9) + 'px';
  _0xc924xb['style']['width'] = _0xc924x8['style']['width'];
  _0xc924x8['previousElementSibling']['style']['fontFamily'] = _0xc924xa
}

function getTerminalContent(_0xc924xd, _0xc924xe, _0xc924xf = 400, _0xc924x10 = '', _0xc924x11 = 'terminal', _0xc924xa = '', _0xc924x12 = 'false') {
  let _0xc924x13 = _0xc924x12 == 'true' ? _0xc924xe['trim']() : _0xc924xe;
  let _0xc924x14 = _0xc924x11['charAt'](0)['toUpperCase']() + _0xc924x11['substring'](1, _0xc924x11['length'])['toLowerCase']();
  let _0xc924x15 = `${'\x0D\x0A    <div class="terminal-title">\x0D\x0A      <div style="padding:3px;"><b>'}${_0xc924x14}${''}${typesMap[_0xc924x11]?('-'+ typesMap[_0xc924x11]):''}${':</b>&nbsp;'}${_0xc924x10}${'</div>\x0D\x0A        <div class="copy-button" onclick="terminalTextToClipboard(this);">Copy</div>\x0D\x0A      </div>\x0D\x0A      <iframe onload="resizeIframe(this, '}${_0xc924xf}${', \''}${_0xc924xa}${'\')" scrolling="yes" frameborder="0" srcdoc="\x0D\x0A        <!DOCTYPE html>\x0D\x0A        <html>\x0D\x0A          <head></head>\x0D\x0A          <body>\x0D\x0A            <style type=\'text/css\'>'}${innerCSS}${'</style>\x0D\x0A            <terminal class=\'all-containers\'>\x0D\x0A              <code><div class=\'lines-container\'>'}${_0xc924xd}${'</div></code>\x0D\x0A              <div class=\'codes-container\'><pre>'}${_0xc924x13}${'</pre></div>\x0D\x0A            </terminal>\x0D\x0A          </body>\x0D\x0A        </html>\x0D\x0A      "></iframe>'}`;
  return _0xc924x15
}

function loadTerminals() {
  let _0xc924x17 = document['querySelectorAll']('terminal');
  if (location['hostname'] == 'kia-cybersecurity.blogspot.com') {
    for (let _0xc924x18 = 0; _0xc924x18 < _0xc924x17['length']; _0xc924x18++) {
      let _0xc924x5 = _0xc924x17[_0xc924x18];
      let _0xc924x13 = _0xc924x5['querySelector']('div[class=\'terminal-content\']')['innerHTML'];
      let _0xc924x10 = _0xc924x5['querySelector']('div[class=\'terminal-title\']')['innerText'];
      let _0xc924xd = '';
      let _0xc924x19 = _0xc924x5['attributes']['maxheight'];
      let _0xc924x1a = _0xc924x5['attributes']['titlefont'];
      let _0xc924x1b = _0xc924x5['attributes']['trim'];
      let _0xc924x1c = _0xc924x5['attributes']['type'];
      for (let _0xc924x1d = 1; _0xc924x1d < _0xc924x13['split']('\x0A')['length'] + 1; _0xc924x1d++) {
        _0xc924xd += `${''}${_0xc924x1d}${'<br/>'}`
      };
      if (_0xc924x1c) {
        if (!(_0xc924x1c['value'] in typesMap)) {
          typesMap[_0xc924x1c['value']] = 0
        };
        typesMap[_0xc924x1c['value']] += 1
      } else {
        if (!typesMap['terminal']) {
          typesMap['terminal'] = 1
        } else {
          typesMap['terminal'] += 1
        }
      };
      _0xc924x5['outerHTML'] = getTerminalContent(_0xc924xd, _0xc924x13, _0xc924x19 ? parseInt(_0xc924x19['value']) : 400, _0xc924x10 ? _0xc924x10 : '', _0xc924x1c ? _0xc924x1c['value'] : 'terminal', _0xc924x1a ? _0xc924x1a['value'] : '', _0xc924x1b ? _0xc924x1b['value'] : '')
    }
  }
}
