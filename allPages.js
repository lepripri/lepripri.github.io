function showMessage(data, OPTIONALendScript) {
    var closer = () => {setTimeout(() => {dialog.close();dialog.remove(); if(OPTIONALendScript) {OPTIONALendScript()}}, 350)}, dialog = document.createElement("dialog");dialog.innerHTML = '<img src="https://lepripri.github.io/lepripri/icons/Warning.png">' + data;dialog.className = "message", Opener = () => {if (document.querySelector('dialog.message')) {Opener();return null;}else{document.body.appendChild(dialog);dialog.showModal();dialog.addEventListener("click", closer);dialog.addEventListener("keydown", closer);document.addEventListener("keydown", closer);setTimeout(closer, 2000);return dialog;}}; return Opener();
}
var lppStyle = document.createElement('style');
lppStyle.textContent = `html, body {background-color: #fcb1e3; margin: 0px;min-height: 700px;width: 100%;height: 100%;width: -webkit-fill-available;height: -webkit-fill-available;} ::backdrop {background: none} dialog {background: #fcb1e3;border-color: #ff0000;border-style: solid;} dialog.message {display: flex;align-items: center;justify-content: center;flex-direction: column; padding-block-start: 0px;} dialog > img[src="https://lepripri.github.io/lepripri/icons/Warning.png"] {width: 1em; height: 1em; display: block} #fileName {height: 20px;border-radius: 30px;border-width: 2px;border-style: solid;border-color: #ff0000;margin: 4px;padding-inline: 9px;padding-block: 0px;}      button[minus] {
        position: absolute;
        font-size: 12px;
        padding: 2px;
        margin: 0px;
        translate: 160px 0px;
      }
      button[minus]:hover, button[minus]:focus{
        font-size: 15px;
        translate: 162px;
      }      button, a{
        background-color: #fcb1e3;
        border-color: #FF0000;
        border-style: solid;
        border-width: 3px;
        padding-inline: 7px;
        padding-block: 5px;
        font-family: arial;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        outline: none !important;
        text-decoration: none;
        color: #000000;
      }
      button:hover, button:focus, a:hover, a:focus{
        font-size: 22px;
        translate: -8px 0px;
        margin-inline-end: -30px
      }
      button[not-button] {
        border-style: none;
        background: none;
        font-family: revert;
        cursor: revert;
        font-size: revert;
        translate: revert;
      }`;
doucument.head.appendChild(lppStyle)
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
document.querySelectorAll('script').forEach(s => s.remove());
