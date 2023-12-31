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
