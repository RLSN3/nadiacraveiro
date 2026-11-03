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
    .privacy-banner{position:fixed;z-index:99999;left:20px;right:20px;bottom:20px;max-width:760px;margin:auto;padding:22px 24px;background:#fffdf8;color:#34372b;border:1px solid rgba(75,82,53,.18);border-radius:16px;box-shadow:0 14px 50px rgba(24,28,18,.2);font:14px/1.55 inherit}
    .privacy-banner[hidden]{display:none}
    .privacy-banner h2{margin:0 0 7px;font:600 18px/1.25 inherit;color:#34372b}
    .privacy-banner p{margin:0 0 15px;color:#55584c}
    .privacy-banner a{color:#4b5235;text-decoration:underline;text-underline-offset:3px}
    .privacy-actions{display:flex;gap:9px;flex-wrap:wrap}
    .privacy-actions button{min-height:42px;padding:10px 16px;border-radius:999px;border:1px solid #4b5235;background:transparent;color:#34372b;font:600 13px inherit;cursor:pointer}
    .privacy-actions .privacy-accept{background:#4b5235;color:#fff}
    .privacy-actions button:focus-visible,.privacy-banner a:focus-visible{outline:3px solid #a8ad83;outline-offset:3px}
    @media(max-width:600px){.privacy-banner{left:12px;right:12px;bottom:12px;padding:18px;border-radius:14px}.privacy-actions{display:grid;grid-template-columns:1fr}.privacy-actions button{width:100%}}
  `;
  document.head.appendChild(style);

  var banner = document.createElement("section");
  banner.className = "privacy-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-modal", "false");
  banner.setAttribute("aria-labelledby", "privacy-title");
  banner.setAttribute("aria-describedby", "privacy-description");
  banner.hidden = !!saved;
  banner.innerHTML =
    '<h2 id="privacy-title">Sua privacidade importa</h2>' +
    '<p id="privacy-description">Este site pode utilizar recursos de armazenamento local e cookies necessários ao funcionamento. Você pode aceitar ou rejeitar recursos opcionais. Consulte nossa <a href="/politica-de-privacidade.html">Política de Privacidade</a>.</p>' +
    '<div class="privacy-actions">' +
      '<button type="button" class="privacy-accept">Aceitar todos</button>' +
      '<button type="button" class="privacy-reject">Rejeitar opcionais</button>' +
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