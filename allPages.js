function showMessage(data, OPTIONALendScript) {
    var closer = () => {setTimeout(() => {dialog.close();dialog.remove(); if(OPTIONALendScript) {OPTIONALendScript()}}, 350)}, dialog = document.createElement("dialog");dialog.innerHTML = '<img src="https://lepripri.github.io/lepripri/icons/Warning.png">' + data;dialog.className = "message", Opener = () => {if (document.querySelector('dialog.message')) {Opener();return null;}else{document.body.appendChild(dialog);dialog.showModal();dialog.addEventListener("click", closer);dialog.addEventListener("keydown", closer);document.addEventListener("keydown", closer);setTimeout(closer, 2000);return dialog;}}; return Opener();
}
var lppStyle = document.createElement('style');
lppStyle.textContent = `html, body {background-color: #fcb1e3; margin: 0px;min-height: 700px;width: 100%;height: 100%;width: -webkit-fill-available;height: -webkit-fill-available;} ::backdrop {background: none} dialog {background: #fcb1e3;border-color: #ff0000;border-style: solid;} dialog.message {display: flex;align-items: center;justify-content: center;flex-direction: column; padding-block-start: 0px;} dialog > img[src="https://lepripri.github.io/lepripri/icons/Warning.png"] {width: 1em; height: 1em; display: block} #fileName {height: 20px;border-radius: 30px;border-width: 2px;border-style: solid;border-color: #ff0000;margin: 4px;padding-inline: 9px;padding-block: 0px;}      button[minus], input[type="files"][minus]::file-selector-button:hover, {
        position: absolute;
        font-size: 12px;
        padding: 2px;
        margin: 0px;
        translate: 160px 0px;
      }
      button[minus]:hover, button[minus]:focus, input[type="files"][minus]::file-selector-button:hover, input[type="files"][minus]:focus{
        font-size: 15px;
        translate: 162px;
      }
      button, a, ::file-selector-button{
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
      button:hover, button:focus, a:hover, a:focus, ::file-selector-button:hover, input[type="files"]:focus{
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
      }
markdown {
    content {
        display: none;
    }
    display {
        code[notpre] {
            border: 1px solid #ccc;
            background: #f9f9f9;
            padding: 2px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
        pre {
            background: #f9f9f9;
            font-size: 0px;
            margin-block: 5px;
            div {
                display: flex;
                justify-content: space-between;
                font-size: 20px;
                border-block-end-style: solid;
                border-width: 1px;
                padding: 6px
            }
            code {
                padding-inline: 6px;
                margin-block: 6px;
                display: block;
                font-family: monospace;
                font-size: initial;
            }
        }
    }
}
::selection {
    background: linear-gradient(#000000, #ff0000, #00ff00, #0000ff, #ffff00, #ff00ff, #00ffff, #ffffff), #ffff00;
    color: #ff0000;
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
// --- SORTIR LES FONCTIONS DU INTERVAL POUR ÉVITER LES ERREURS ---
window.bigCodeShelter = []; // Variable globale pour stocker les codes de TOUS les blocs

window.pripriCopy = function(index) {
    const textToCopy = window.bigCodeShelter[index].raw;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(() => showSuccess(index));
    } else {
        fallbackCopy(textToCopy, index);
    }
};

function fallbackCopy(text, index) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    showSuccess(index);
    document.body.removeChild(textArea);
}

function showSuccess(index) {
    const btn = document.querySelectorAll('.copy')[index];
    if(btn) {
        btn.classList.add('copied');
        setTimeout(() => btn.classList.remove('copied'), 2000);
    }
}

// --- LE MOTEUR DE RENDU OPTIMISÉ ---
setInterval(() => {
    // On vide le shelter global au début de chaque cycle de rendu complet
    // Ou mieux : on le gère par élément pour éviter les conflits d'index
    let currentGlobalIndex = 0; 

    document.querySelectorAll("markdown").forEach((markdownElement) => {
        const contentEl = markdownElement.querySelector("content");
        if (!contentEl) return;

        var rawContent = contentEl.textContent;

        // VERIFICATION : Si le texte n'a pas changé, on ne touche à RIEN.
        // C'est ça qui permet de sélectionner le texte à la souris !
        if (markdownElement.dataset.lastRaw === rawContent) {
            // On incrémente quand même l'index global pour les boutons copy des blocs suivants
            const codeCount = (rawContent.match(/```/g) || []).length / 2;
            currentGlobalIndex += Math.floor(codeCount);
            return; 
        }
        
        // Si on arrive ici, c'est que le texte a changé
        markdownElement.dataset.lastRaw = rawContent;

        let localBigCodeShelter = [];
        
        // 1. Extraction Gros Blocs
        let step1 = rawContent.replace(/```(\w+)?\n?([\s\S]+?)```/g, (match, lang, code) => {
            let languageName = lang ? lang : "code";
            let cleanCode = code.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;");
            localBigCodeShelter.push({ lang: languageName, content: cleanCode, raw: code.trim() });
            // On utilise l'index global pour le bouton copy
            let id = currentGlobalIndex++;
            window.bigCodeShelter[id] = localBigCodeShelter[localBigCodeShelter.length - 1];
            return `%%BIG_CODE_${id}%%`;
        });

        // 2. Extraction Code Simple
        let smallCodeShelter = [];
        let step2 = step1.replace(/`([^`]+)`/g, (m, code) => {
            let clean = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            smallCodeShelter.push(clean);
            return `%%SMALL_CODE_${smallCodeShelter.length - 1}%%`;
        });

        // 3. Transformations
        let html = step2
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .replace(/^###### (.*$)/gim, '<h6>$1</h6>')
            .replace(/^##### (.*$)/gim, '<h5>$1</h5>')
            .replace(/^#### (.*$)/gim, '<h4>$1</h4>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*\*(.*)\*\*\*/gim, '<b style="font-style: italic;">$1</b>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/^\* (.*$)/gim, '<ul><li>$1</li></ul>')
            .replace(/<\/ul>\s*<ul>/g, '');

        // 4. Réinjection
        // Gros blocs avec l'index global correct
        html = html.replace(/%%BIG_CODE_(\d+)%%/g, (m, id) => {
            const item = window.bigCodeShelter[id];
            return `<pre><div class="code-header"><span class="code-lang">${item.lang}</span><button class="copy" onclick="pripriCopy(${id})" title="copier"></button></div><code>${item.content}</code></pre>`;
        });

        // Petits codes
        smallCodeShelter.forEach((code, i) => {
            html = html.replace(`%%SMALL_CODE_${i}%%`, `<code notpre>${code}</code>`);
        });

        // Affichage
        let display = markdownElement.querySelector("display");
        if (!display) {
            display = document.createElement('display');
            markdownElement.appendChild(display);
        }
        display.innerHTML = html;
    });
}, 100);
if (localStorage.recommandations !== undefined) {
    var recommandations = JSON.parse(localStorage.recommandations);
}else{
    var recommandations = {
        code: {
            isExtInstaled: false,
            other: []
        },
        converter: {
            isAppInstaled: false,
            isExtInstaled: false,
            format: ".mp3",
            other: [],
            YouTube: []
        },
        extension: {
            isExtInstaled: false,
            other: []
        },
        games: {
            isExtInstaled: false,
            logicGames: [],
            actionGames: [],
            other: []
        },
        product: {
            apps: [],
            popular: [],
            other: []
        },
        settings: {
            other: []
        }
    }
}
onbeforeunload = () => {
    localStorage.setItem("recommandations", JSON.stringify(recommandations));
}
function rederect (url) {
    var redirectionLink = document.body.appendChild(document.createElement('a'));
    redirectionLink.href = url;
    redirectionLink.click();
    redirectionLink.remove();
}
var lepripriAPI = {
    messages: {
        alert: showMessage,
        prompt,
        comfirm,
        wait: {
            start: (data, id) => console.log("en atente de " + data + "sous l'identifian " + id + "..."),
            end: (id) => console.log("l'attente sous l'identifiant " + id + "est terminé !")
        },
        info: console.info,
        warn: console.warn,
        error: (data) => console.error("Error: " + data)
    },
    video: {
        init: () => {
            // 1. Création de l'objet FontFace en JS
            var myFont = new FontFace('font_1', 'url(font1.ttf)');

            myFont.load().then(function(loadedFont) {
                // 2. Ajouter la police chargée au document
                document.fonts.add(loadedFont);
                console.log("✅ Police font_1 chargée avec succès !");
            }).catch(function(error) {
                console.error("❌ Échec du chargement de la police :", error);
            });

            // 3. Injection du reste du CSS
            document.head.innerHTML += `
            <style>priprivideo{display: block;unicode-bidi: isolate;background-color: #000000;}priprivideo>#fileNamePart{height: 20px;width: calc(100% - 50px);background-color: #000000;margin-block-start: -40px;translate: 0px 20px;padding-inline-start: 20px;padding-inline-end: 30px;}priprivideo>#fileNamePart[content]::before{content: attr(content);}priprivideo>#timeAndControls{height: 20px;width: 100%;background-color: #000000;display: flex;align-items: center;font-size: 11px;}priprivideo>#timeAndControls>pausebtn::before{content: "▶"}priprivideo>#timeAndControls>pausebtn[pause]::before{content: "⏸"}priprivideo>#timeAndControls>pausebtn{margin-inline-start: 5px;}priprivideo>#timeAndControls>pausebtn[pause]{margin-inline-start: 2px;}priprivideo>#timeAndControls *:not([time]){min-width: 20px;width: 20px;display: block;}priprivideo *{color: #ffffff;word-break: break-all;}priprivideo>#timeAndControls>leftbtn::before{content: "◀"}priprivideo>#timeAndControls>rightbtn::before{content: "▶"}priprivideo>#timeAndControls>input[type=range]::-webkit-slider-runnable-track {width: 100%; height: 5px;cursor: default;background: transparent;border: none;border-style: solid; border-width: 1px;border-color: #ffffff;}priprivideo>#timeAndControls>input[type=range]::-webkit-slider-thumb {appearance: none;-webkit-appearance: none;height: 5px;width: 0px;background: transparent;margin-top: 0px;box-shadow: -100vw 0 0 100vw #ffffff;}priprivideo>#timeAndControls>input[type=range] {-webkit-appearance: none;width: calc(100% - 188px);background: transparent;cursor: default;clip-path: inset(0px);height: 5px;}priprivideo>#timeAndControls>timea, priprivideo>#timeAndControls>timeb {display: flex;flex-direction: row;align-items: center;justify-content: center;min-width: 60px;width: 60px;max-width: 60px;}priprivideo>#timeAndControls>timea>*, priprivideo>#timeAndControls>timeb>*{margin: 1px;}#timeAndControls>timea>*, priprivideo>#timeAndControls>timeb>*{translate: 0px -0.7px;}priprivideo>#timeAndControls>timea>n0, priprivideo>#timeAndControls>timeb>n0{translate: 0px 0px;height: 4px;width: 3px;min-width: 3px;max-width: 3px;border-style: solid;border-width: 1px;}priprivideo>#timeAndControls>timea>n1::before, priprivideo>#timeAndControls>timeb>n1::before {content: "1";font-family: font_1}priprivideo>#timeAndControls>timea>n2::before, priprivideo>#timeAndControls>timeb>n2::before {content: "2";font-family: font_1}priprivideo>#timeAndControls>timea>n3::before, priprivideo>#timeAndControls>timeb>n3::before {content: "3";font-family: font_1}priprivideo>#timeAndControls>timea>n4::before, priprivideo>#timeAndControls>timeb>n4::before {content: "4";font-family: font_1}priprivideo>#timeAndControls>timea>n5::before, priprivideo>#timeAndControls>timeb>n5::before {content: "5";font-family: font_1}priprivideo>#timeAndControls>timea>n6::before, priprivideo>#timeAndControls>timeb>n6::before {content: "6";font-family: font_1}priprivideo>#timeAndControls>timea>n7::before, priprivideo>#timeAndControls>timeb>n7::before {content: "7";font-family: font_1}priprivideo>#timeAndControls>timea>n8::before, priprivideo>#timeAndControls>timeb>n8::before {content: "8";font-family: font_1}priprivideo>#timeAndControls>timea>n9::before, priprivideo>#timeAndControls>timeb>n9::before {content: "9";font-family: font_1}priprivideo>#timeAndControls>timea>ns::before, priprivideo>#timeAndControls>timeb>ns::before {content: ":";}priprivideo>#timeAndControls>timea>ns, priprivideo>#timeAndControls>timeb>ns {translate: 0px -0.6px;font-size: 7px;font-weight: 800;}</style>`;
            console.log("🎬 lepripri video is initialised.");
        },
        HTML: {
            basic: "<div id=\"fileNamePart\"></div><video style=\"width: 100%;height: 100%;\" src=\"about:blank\"></video><div id=\"timeAndControls\"><pausebtn></pausebtn><leftbtn></leftbtn><timea time=\"\"><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0></timea><input id=\"progress\" name=\"progress\" type=\"range\" value=\"0\" min=\"0\" max=\"100\" step=\"0.001\"><timeb time=\"\"><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0></timeb><rightbtn></rightbtn></div>",
            generateSpecial: (videoURL, OPTPARAM_videoFileName) => {var videoFileName = OPTPARAM_videoFileName; if (OPTPARAM_videoFileName == undefined) {videoFileName = "";} return "<div id=\"fileNamePart\">" + videoFileName +"</div><video style=\"width: 100%;height: 100%;\" src=\"" + videoURL + "\"></video><div id=\"timeAndControls\"><pausebtn></pausebtn><leftbtn></leftbtn><timea time=\"\"><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0></timea><input id=\"progress\" name=\"progress\" type=\"range\" value=\"0\" min=\"0\" max=\"100\" step=\"0.001\"><timeb time=\"\"><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0><ns time=\"\"></ns><n0 time=\"\"></n0><n0 time=\"\"></n0></timeb><rightbtn></rightbtn></div>"}
    },
        allVideo: [],
    create: (videoURL, OPTPARAM_videoFileName) => {
        var pripriVideoHTML = lepripriAPI.video.HTML.generateSpecial(videoURL, OPTPARAM_videoFileName),
        pripriVideoNode = document.createElement("priprivideo"),
         pripriVideoObject = new class pripriVideo {constructor() {}};
          pripriVideoNode.innerHTML = pripriVideoHTML;
           pripriVideoNode.setAttribute("tabindex", "0");
            const player = pripriVideoNode;
            const video = player.querySelector("video");
            const pauseBtn = player.querySelector("pausebtn");
            const progress = player.querySelector("#progress");
            const timeA = player.querySelector("timea");
            const timeB = player.querySelector("timeb");
            let pressTimer;
            let startTime;
            let holdActive = false;
            let didMove = false;
            // --- LOGIQUE DU TEMPS ---

            const formatTime = (seconds) => {
                const h = Math.floor(seconds / 3600);
                const m = Math.floor((seconds % 3600) / 60);
                const s = Math.floor(seconds % 60);
                return [
                    ...String(h).padStart(2, '0').split(''),
                    ...String(m).padStart(2, '0').split(''),
                    ...String(s).padStart(2, '0').split('')
                ];
            };

            const updateDigits = (container, seconds) => {
                const digits = formatTime(seconds);
                const digitElements = container.querySelectorAll('*:not(ns)[time]');

                digits.forEach((digit, index) => {
                    const oldEl = digitElements[index];
                    if (oldEl) {
                        const newTag = `n${digit}`;
                        if (oldEl.tagName.toLowerCase() !== newTag) {
                            const newEl = document.createElement(newTag);
                            newEl.setAttribute("time", "");
                            oldEl.parentNode.replaceChild(newEl, oldEl);
                        }
                    }
                });
            };

            // --- ÉVÉNEMENTS SOURIS/INTERFACE ---

            pauseBtn.onclick = () => {
                if (video.paused) {
                    video.play();
                    pauseBtn.setAttribute("pause", "");
                } else {
                    video.pause();
                    pauseBtn.removeAttribute("pause");
                }
            };

            video.ontimeupdate = () => {
                if (!video.duration) return; // Sécurité si la durée n'est pas encore chargée
                const percent = (video.currentTime / video.duration) * 100;
                progress.value = percent || 0;
                updateDigits(timeA, video.currentTime);
            };

            video.onloadedmetadata = () => {
                updateDigits(timeB, video.duration);
            };

            progress.oninput = () => {
                const time = (progress.value / 100) * video.duration;
                video.currentTime = time;
            };

            player.querySelector("leftbtn").onclick = () => video.currentTime -= 5;
            player.querySelector("rightbtn").onclick = () => video.currentTime += 5;

            // --- LOGIQUE CLAVIER (il y a un problème si il y plusieurs vidéos) ---

            const handleKeyDown = (e) => {
                if (e.ctrlKey && e.shiftKey && e.code === 'KeyI') {
                    e.preventDefault();
                    return;
                }

                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    pauseBtn.click();
                    return;
                }

                if (e.repeat) return;

                if ((e.code === 'ArrowLeft' || e.code === 'ArrowRight') && !holdActive) {
                    holdActive = true;
                    didMove = false;
                    startTime = Date.now();

                    pressTimer = setTimeout(() => {
                        didMove = true;
                        pressTimer = setInterval(() => {
                            const elapsed = (Date.now() - startTime) / 1000;
                            const step = elapsed * 3; 

                            if (e.code === 'ArrowLeft') {
                                video.currentTime -= step;
                            } else {
                                video.currentTime += step;
                            }
                        }, 50);
                    }, 200); 
                }
            };

            const handleKeyUp = (e) => {
                if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                    clearTimeout(pressTimer);
                    clearInterval(pressTimer);

                    if (!didMove) {
                        const frameTime = 1 / 24;
                        if (e.code === 'ArrowLeft') video.currentTime -= frameTime;
                        else video.currentTime += frameTime;
                    }

                    holdActive = false;
                    didMove = false;
                }
            };
            player.onkeydown = handleKeyDown;
            player.onkeyup = handleKeyUp;
            pripriVideoObject.node = pripriVideoNode;
            pripriVideoObject.videoNode = pripriVideoNode.querySelector('video');
            lepripriAPI.video.allVideo.push(pripriVideoObject);
            return pripriVideoNode; // le dévelopeur s'occupe de l'inserer
        }
    }
};
