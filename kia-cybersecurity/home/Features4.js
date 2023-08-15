/* Home page custom title */
let title = document.querySelector("div[class='header-widget']");
title.childNodes[1].innerHTML = "\n<h1>\nCybersecurity <sup><em style='font-size:80%;font-family:Oxygen;'>Know It All</em></sup>\n</h1>\n";

let pageContainers  = document.querySelectorAll("div[class='post-outer-container']");
let postContainers1 = document.querySelectorAll("div[class='widget FeaturedPost']");
let postContainers2 = document.querySelectorAll("article[class='post-outer-container']");
let maxContainerLength = Math.max(pageContainers.length, postContainers1.length, postContainers2.length);
let style = "background-color: rgb(1, 18, 16); border: 2px solid #26b4a1; border-radius: 10px; opacity: 0.92; box-shadow: 0px 0px 10px 2px #26b4a1;";

for(var i=0; i < maxContainerLength; i++){
  if (pageContainers[i]){ 
    pageContainers[i].style = style;
    pageContainers[i].className += " box-shadow-animation";
  }
  if (postContainers1[i]){ 
    postContainers1[i].style = style;
    postContainers1[i].className += " box-shadow-animation";
  }
  if (postContainers2[i]){
    if (location.pathname == '/'){
      postContainers2[i].style = style;
      postContainers2[i].className += " box-shadow-animation";
    }
  }
}


/* Customize panel menu */
let panelMenu = document.getElementsByTagName("aside")[0];
panelMenu.style = "background-color:#041515;opacity:92%;font-family:Oxygen;";

let arrowBar = document.querySelector("div[class='navigation']");
arrowBar.style="background:transparent;";

let profileContainer = document.querySelector("div[class='sidebar_top_wrapper']");
profileContainer.style = "background:transparent;";

document.getElementsByClassName('profile-link visit-profile pill-button')[0].style = 'color:cyan; font-family:Oxygen;';

/* panel menu bottom */
document.getElementById("sidebar_bottom").style = "background:transparent;";
document.querySelector("a[class='report_abuse']").style="color:cyan;selection-color:red;";

let customElements = document.querySelectorAll("div[class='widget HTML']");
customElements.forEach(item => {item.style.border = "0px";});


/* Load custom terminals */
let typesMap = new Map();

let innerCSSCode = `
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
    float:right;
    max-width:100%;
    overflow-x:auto;
    padding:15px;
    text-align:left;
    white-space:break-spaces;
    word-break:keep-all;
  }
  .iframe-feature {
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  }`;

function resizeIframe(iframe, terminalMaxHeight, titleFont){
  let terminal = iframe.contentDocument.querySelector("terminal[class='all-containers']");
  let container = terminal.querySelector("code[class='codes-container']");
  iframe.style.width  = "100%";
  iframe.style.height = ((parseInt(container.scrollHeight) <= terminalMaxHeight) ? container.scrollHeight : terminalMaxHeight) + "px";
  container.style.width = iframe.style.width;
  iframe.previousElementSibling.style.fontFamily = titleFont;
}

function terminalTextToClipboard(element){
  if(element.innerText == "Copy"){
    setTimeout(() => {element.innerHTML = "Copy";}, 2000);
    let terminal = element.parentElement.nextElementSibling.contentDocument;
    let textToCopy = terminal.querySelector("code[class='codes-container']").innerText;
    navigator.clipboard.writeText(textToCopy);
    element.innerHTML = "Copied!";
  }
}

function getTerminalContent(linesContent, codesContent, maxHeight=400, title="", type="terminal", titleFont="", trim="false"){
  let codes = trim == "true" ? codesContent.trim() : codesContent;
  let typeCapitalized = type.charAt(0).toUpperCase() + type.substring(1, type.length).toLowerCase();
  let source = `
    <div class="terminal-title">
      <div style="padding:3px;"><b>${typeCapitalized}${typesMap[type] ? ("-"+typesMap[type]):""}:</b>&nbsp;${title}</div>
      <div class="copy-button" onclick="terminalTextToClipboard(this);">Copy</div>
    </div>
    <iframe class="iframe-feature" onload="resizeIframe(this, ${maxHeight}, ${titleFont})" scrolling="yes" frameborder="0" srcdoc="
    <!DOCTYPE html>
      <html>
        <head></head>
          <body>
            <style type='text/css'>${innerCSSCode}</style>
            <terminal class='all-containers'>
              <code><div class='lines-container'>${linesContent}</div></code>
              <code class='codes-container'>${codes.replaceAll(' ', '&nbsp;').replace('-', '&#8209;')}</code>
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
    console.log(title, codes, terminal);
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
    } else if(!typesMap['terminal']) {
      typesMap['terminal'] = 1;
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
