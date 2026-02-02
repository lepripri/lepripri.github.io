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
document.head.appendChild(lppStyle)
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
document.querySelectorAll("markdown").forEach((markdownElement) => {
var rawContent = markdownElement.querySelector("content").textContent;
// 1. EXTRACTION (On ajoute juste une petite sécurité sur le contenu)
let bigCodeShelter = [];
let step1 = rawContent.replace(/```(\w+)?\n?([\s\S]+?)```/g, (match, lang, code) => {
    let languageName = lang ? lang : "code";
    let cleanCode = code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // On garde aussi une version "brute" pour la copie (sans les &lt;)
    bigCodeShelter.push({ lang: languageName, content: cleanCode, raw: code.trim() });
    return `%%BIG_CODE_${bigCodeShelter.length - 1}%%`;
});

// 2. EXTRACTION DU CODE SIMPLE (`) - AVANT LE GRAS/ITALIQUE
let smallCodeShelter = [];
let step2 = step1.replace(/`([^`]+)`/g, (m, code) => {
    // On neutralise le HTML à l'intérieur pour éviter que <u> ne s'active
    let clean = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    smallCodeShelter.push(clean);
    return `%%SMALL_CODE_${smallCodeShelter.length - 1}%%`;
});

// 3. TRANSFORMATIONS DU TEXTE (Maintenant, c'est sûr !)
let html = step2
    .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
    .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
    .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*\*(.*)\*\*\*/gim, '<b style="font-style: italic;">$1</b>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>');

// 4. RÉINJECTION AVEC LE BOUTON
bigCodeShelter.forEach((item, i) => {
    // On utilise un attribut data-index pour savoir quel code copier
    const block = `
    <pre>
        <div class="code-header">
            <span class="code-lang">${item.lang}</span>
            <button class="copy" onclick="pripriCopy(${i})" title="copier"></button>
        </div>
        <code>${item.content}</code>
    </pre>`;
    html = html.replace(`%%BIG_CODE_${i}%%`, block);
});

// 5. LA FONCTION DE COPIE (À mettre à la fin de ton script)
window.pripriCopy = function(index) {
    const textToCopy = bigCodeShelter[index].raw;

    // Tentative avec l'API moderne
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            showSuccess(index);
        }).catch(err => {
            console.error("Erreur clipboard API", err);
            fallbackCopy(textToCopy, index);
        });
    } else {
        // Si l'API moderne n'existe pas, on utilise la vieille méthode
        fallbackCopy(textToCopy, index);
    }
};

// Vieille méthode qui marche même sans HTTPS
function fallbackCopy(text, index) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showSuccess(index);
    } catch (err) {
        showMessage("Impossible de copier automatiquement.");
    }
    document.body.removeChild(textArea);
}

// Fonction pour l'animation visuelle
function showSuccess(index) {
    const btn = document.querySelectorAll('.copy')[index];
    btn.classList.add('copied'); // On ajoute une classe CSS plutôt que de changer le texte
    setTimeout(() => btn.classList.remove('copied'), 2000);
}
// 4b. RÉINJECTION DES PETITS CODES (Les tickets `...`)
smallCodeShelter.forEach((code, i) => {
    html = html.replace(`%%SMALL_CODE_${i}%%`, `<code notpre>${code}</code>`);
});
if (!markdownElement.querySelector("display")) {
    markdownElement.appendChild(document.createElement('display')).innerHTML = html;
}else{
    markdownElement.querySelector("display").innerHTML = html;
}
});
