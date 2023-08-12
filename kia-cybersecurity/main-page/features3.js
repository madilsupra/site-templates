/* Home page custom title */
let title = document.querySelector("div[class='header-widget']");
title.childNodes[1].innerHTML = "\n<h1>\nCybersecurity <sup><em style='font-size:80%;font-family:Oxygen;'>Know It All</em></sup>\n</h1>\n";

let pageContainers  = document.querySelectorAll("div[class='post-outer-container']");
let postContainers1 = document.querySelectorAll("div[class='widget FeaturedPost']");
let postContainers2 = document.querySelectorAll("article[class='post-outer-container']");
let maxContainerLength = Math.max(pageContainers.length, postContainers1.length, postContainers2.length);
let style = "background-color: rgb(1, 26, 22); border: 2px solid rgb(0, 102, 102); border-radius: 10px; opacity: 0.92; box-shadow: rgb(0, 102, 102) 0px 0px 10px 2px;";

for(var i=0; i < maxContainerLength; i++){
  if (pageContainers[i]){ 
    pageContainers[i].className += " box-shadow-animation";
    psgeContainers[i].style = style;
  }
  if (postContainers1[i]){ postContainers1[i].className += " box-shadow-animation";}
  if (postContainers2[i]){
    if (location.pathname == '/'){
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
for(var i=0; i < customElements.length; i++){
    customElements[i].style="border:0px dotted;";
}
