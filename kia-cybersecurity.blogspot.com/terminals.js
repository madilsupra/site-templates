let innerCSS = `
    body {
        margin:0;
        padding:0;
        max-width:100%;
    }
    terminal {
        display:flex;
    }
    .all-containers > * {
        display:flex;
        display:inline-block;
    }
    .lines-container {
        background-color:#006c4a;
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
        color:white;
        display:flex;
        flex:1;
        padding-left:5px;
        padding-right:5px;
        padding-top:15px;
        padding-bottom:15px;
        text-align:right;
        white-space:break-spaces;
    }
    .codes-container {
        color: white;
        background-color:#012922;
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
        overflow-x:auto;
        max-width:96%;
        padding:15px;
        text-align:left;
        white-space:break-spaces;
        word-break:keep-all;
    }
`;

function resizeIframe(iframe){
    let terminalMaxHeight = 500;
    let terminal = iframe.contentDocument.querySelector("terminal[class='all-containers']");
    let container = iframe.contentWindow.document.body.querySelector("code[class='codes-container']");

    iframe.style.width  = "100%";
    iframe.style.borderRadius = "5px";
    container.style.width = iframe.style.width;
    if (parseInt(container.scrollHeight) <= terminalMaxHeight){
        iframe.style.height = container.scrollHeight + 'px';
    } else {
        iframe.style.maxHeight = `${terminalMaxHeight}px`;
    }
}

function getTerminalContent(linesContent, codesContent){
    source = `<iframe onload="resizeIframe(this)" scrolling="yes" frameborder="0" srcdoc="
      <!DOCTYPE html>
      <html>
        <head></head>
          <body>
            <style type='text/css'>${innerCSS}</style>
            <terminal class='all-containers'>
              <code><div class='lines-container'>${linesContent}</div></code>
              <code class='codes-container'>${codesContent.replaceAll(' ', '&nbsp;').replace('-', '&#8209;')}</code>
            </terminal>
          </body>
      </html>
    "></iframe>`;
    return source;
}

function loadTerminals(){
    let terminals = document.querySelectorAll("terminal");
    for(var i=0; i < terminals.length; i++){
        var terminal = terminals[i];
        var linesContent = "";
        for(var line=1; line<terminal.innerHTML.split("\n").length+1; line++){
            linesContent+=`${line}<br/>`;
        }
        terminal.outerHTML = getTerminalContent(linesContent, terminal.innerHTML);
    }
}
