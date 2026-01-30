document.addEventListener("DOMContentLoaded", () => {
  if (!window.Pripri) {
    console.error("Uncaught Error: failled to load Firebase in allPages.js file");
    return;
  }

  console.log("Auth dispo :", Pripri.auth);
});
var header = {
    node: document.createElement('header'),
    emplacement: document.body.childNodes.item(0),
    nodeID: 'header',
    innerHTML: '<style>#header {display: flex; * {margin: 3px;} #lppProduct {width: 112px;background-color: #fcb1e3;border-color: #FF0000;border-style: solid;border-width: 3px;padding-inline: 7px;padding-block: 5px;font-family: arial;font-size: 20px;font-weight: bold;cursor: pointer;outline: none !important;text-decoration: none;color: #000000;} #lppProduct:hover, #lppProduct:focus {font-size: 22px;translate: -4px 0px;}} logo[lepripri=""]::before {content: "";width: 30px; height: 30px; background-size: 30px; background-repeat: no-repeat;background-image: url("https://lepripri.github.io/azertyuiop/icons/page-512.png");} lepripri[text]::before {content: "le pripri"} lepripri[text] {font-size: 30px;font-family: sans-serif;font-weight: 700;}</style><logo lepripri=""></logo><lepripri text=""></lepripri><hr><button id="login">se connecter</button><hr><button id="instalExt">instaler l\'extension</button><hr>',
    selectNode: document.createElement('select'),
    selectNodeID: 'lppProduct',
    selectInnerHTML: '<option>&lt;/&gt; code</option><option>✏️ draw</option><option>🎮 games</option>',
    selectText: 'le pripri'
}
header.node.innerHTML = header.innerHTML;
header.node.id = header.nodeID;
header.selectNode.innerHTML = '<option disabled="">' + header.selectText +'</option>' + header.selectInnerHTML;
header.selectNode.id = header.selectNodeID;
header.selectNode.value = header.selectText;
header.node.appendChild(header.selectNode);
document.body.insertBefore(header.node, header.emplacement);
