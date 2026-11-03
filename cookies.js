/* Preferências de privacidade — Nádia Craveiro
   A escolha é armazenada localmente. Nenhum rastreador opcional é ativado por este arquivo.
*/
(function () {
  "use strict";
  var KEY = "nadia_privacy_consent_v1";
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) {}

  var style = document.createElement("style");
  style.textContent = `
    .privacy-banner{position:fixed;z-index:99999;right:18px;bottom:18px;width:min(340px,calc(100% - 36px));margin:0;padding:11px 13px;background:#fffdf8;color:#45483c;border:1px solid rgba(75,82,53,.14);border-radius:10px;box-shadow:0 4px 18px rgba(24,28,18,.10);font:11px/1.4 Arial,sans-serif}
    .privacy-banner[hidden]{display:none}
    .privacy-banner p{margin:0 0 8px;color:#55584c;font-size:11px;line-height:1.4}
    .privacy-banner a{color:#4b5235;text-decoration:underline;text-underline-offset:2px}
    .privacy-actions{display:flex;align-items:center;gap:12px}
    .privacy-actions button{min-height:27px;padding:4px 9px;border-radius:6px;border:1px solid rgba(75,82,53,.35);background:transparent;color:#45483c;font:600 10px Arial,sans-serif;cursor:pointer}
    .privacy-actions .privacy-accept{background:#4b5235;border-color:#4b5235;color:#fff}
    .privacy-actions button:focus-visible,.privacy-banner a:focus-visible{outline:2px solid #a8ad83;outline-offset:2px}
    @media(max-width:600px){.privacy-banner{right:10px;bottom:10px;width:calc(100% - 20px);padding:10px 11px;border-radius:9px}.privacy-banner p{font-size:10px;margin-bottom:7px}.privacy-actions{gap:8px}.privacy-actions button{min-height:26px;padding:4px 8px;font-size:10px}}
  `;;
  document.head.appendChild(style);

  var banner = document.createElement("section");
  banner.className = "privacy-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "false");
  banner.setAttribute("aria-labelledby", "privacy-title");
  banner.setAttribute("aria-describedby", "privacy-description");
  banner.hidden = !!saved;
  banner.innerHTML =
    '<p id="privacy-description">Este site utiliza cookies necessários e, com sua permissão, recursos opcionais. <a href="/politica-de-privacidade.html">Saiba mais</a>.</p>' +
    '<div class="privacy-actions">' +
      '<button type="button" class="privacy-accept">Aceitar</button>' +
      '<button type="button" class="privacy-reject">Recusar opcionais</button>' +
    '</div>';
  document.body.appendChild(banner);

  function save(analytics) {
    var choice = { necessary: true, analytics: !!analytics, savedAt: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(choice)); } catch (e) {}
    banner.hidden = true;
    document.dispatchEvent(new CustomEvent("nadia:privacy-choice", { detail: choice }));
  }
  banner.querySelector(".privacy-accept").addEventListener("click", function () { save(true); });
  banner.querySelector(".privacy-reject").addEventListener("click", function () { save(false); });

  var footer = document.querySelector("footer");
  if (footer) {
    var controls = document.createElement("p");
    controls.className = "privacy-footer-link";
    controls.style.cssText = "margin:12px 0 0;font-size:12px";
    controls.innerHTML = '<a href="/politica-de-privacidade.html">Política de Privacidade</a> <span aria-hidden="true">·</span> <button type="button" style="border:0;background:none;padding:0;color:inherit;text-decoration:underline;cursor:pointer;font:inherit">Preferências de cookies</button>';
    controls.querySelector("button").addEventListener("click", function () { banner.hidden = false; });
    footer.appendChild(controls);
  }
})();