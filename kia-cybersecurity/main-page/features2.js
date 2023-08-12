/* Home page custom title */
let title = document.querySelector("div[class='header-widget']");
title.childNodes[1].innerHTML = "\n<h1>\nCybersecurity <sup><em style='font-size:80%;font-family:Oxygen;'>Know It All</em></sup>\n</h1>\n";

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
