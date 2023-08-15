let typesMap = new Map();

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
    border-bottom-left-radius:10px;
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
    border-bottom-right-radius:10px;
    flex:1;
    max-width:100%;
    overflow-x:auto;
    padding-top:2.2px;
    padding-left:15px;
    text-align:left;
    white-space:break-spaces;
  }`;

function terminalTextToClipboard(element){
  if(element.innerText == "Copy"){
    setTimeout(() => {element.innerHTML = "Copy";}, 2000);
    let terminal = element.parentElement.nextElementSibling.contentDocument;
    let textToCopy = terminal.querySelector("pre").innerText;
    navigator.clipboard.writeText(textToCopy);
    element.innerHTML = "Copied!";
  }
}

function resizeIframe(iframe, terminalMaxHeight, titleFont){
  let terminal = iframe.contentDocument.querySelector("terminal[class='all-containers']");
  let container = terminal.querySelector("div[class='codes-container']");
  iframe.style.borderBottomLeftRadius = "10px";
  iframe.style.borderBottomRightRadius = "10px";
  iframe.style.width  = "100%";
  iframe.style.height = ((parseInt(container.scrollHeight) <= terminalMaxHeight) ? container.scrollHeight : terminalMaxHeight) + "px";
  container.style.width = iframe.style.width;
  iframe.previousElementSibling.style.fontFamily = titleFont;
}

function getTerminalContent(linesContent, codesContent, maxHeight=400, title="", type="terminal", titleFont="", trim="false"){
  let codes = trim == "true" ? codesContent.trim() : codesContent;
  let typeCapitalized = type.charAt(0).toUpperCase() + type.substring(1, type.length).toLowerCase();
  let source = `
    <div class="terminal-title">
      <div style="padding:3px;"><b>${typeCapitalized}${typesMap[type] ? ("-"+typesMap[type]):""}:</b>&nbsp;${title}</div>
        <div class="copy-button" onclick="terminalTextToClipboard(this);">Copy</div>
      </div>
      <iframe onload="resizeIframe(this, ${maxHeight}, '${titleFont}')" scrolling="yes" frameborder="0" srcdoc="
        <!DOCTYPE html>
        <html>
          <head></head>
          <body>
            <style type='text/css'>${innerCSS}</style>
            <terminal class='all-containers'>
              <code><div class='lines-container'>${linesContent}</div></code>
              <div class='codes-container'><pre>${codes}</pre></div>
            </terminal>
          </body>
        </html>
      "></iframe>`;
  return source;
}

function loadTerminals(){
  let terminals = document.querySelectorAll("terminal");
  for(let i=0; i < terminals.length; i++){
    let terminal       = terminals[i];
    let codes          = terminal.querySelector("div[class='terminal-content']").innerHTML;
    let title          = terminal.querySelector("div[class='terminal-title']").innerText;
    let linesContent   = "";
    let maxHeightAttr  = terminal.attributes.maxheight;
    let titleFontAttr  = terminal.attributes.titlefont;
    let trimAttr       = terminal.attributes.trim;
    let typeAttr       = terminal.attributes.type;
    for(let line = 1; line < codes.split("\n").length + 1; line++){
      linesContent += `${line}<br/>`;
    }
    if (typeAttr){
      if (!(typeAttr.value in typesMap)) {typesMap[typeAttr.value] = 0;}
      typesMap[typeAttr.value] += 1;
    } else if(
      !typesMap['terminal']) {typesMap['terminal'] = 1;
    } else {
      typesMap['terminal'] += 1
    }
    terminal.outerHTML = getTerminalContent(
      linesContent,
      codes,
      maxHeightAttr ? parseInt(maxHeightAttr.value) : 400,
      title ? title : "",
      typeAttr ? typeAttr.value : "terminal",
      titleFontAttr ? titleFontAttr.value : "",
      trimAttr ? trimAttr.value : ""
    );
  }
}
