/* CodesSphere Info - global country/language switcher */
(function () {
  "use strict";
  window.googleTranslateElementInit = function () {
    if (window.google && google.translate) {
      new google.translate.TranslateElement({
        pageLanguage: "en",
        includedLanguages: "en,fr,de,it,tr",
        autoDisplay: false
      }, "google_translate_element");
    }
  };

  function setTranslateLanguage(lang) {
    var cookieValue = lang === "en" ? "/en/en" : "/en/" + lang;
    document.cookie = "googtrans=" + cookieValue + "; path=/; max-age=31536000";
    document.cookie = "googtrans=" + cookieValue + "; domain=" + location.hostname + "; path=/; max-age=31536000";
    if (lang === "en") {
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "googtrans=; domain=" + location.hostname + "; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    var combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = lang;
      combo.dispatchEvent(new Event("change"));
      return;
    }
    location.reload();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var switchers = document.querySelectorAll(".global-switcher");
    switchers.forEach(function (switcher) {
      var toggle = switcher.querySelector(".global-switcher-toggle");
      if (toggle) {
        toggle.addEventListener("click", function (e) {
          e.stopPropagation();
          var open = switcher.classList.toggle("open");
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
      }
      switcher.querySelectorAll("[data-lang]").forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          setTranslateLanguage(this.getAttribute("data-lang"));
          switcher.classList.remove("open");
        });
      });
    });
    document.addEventListener("click", function () {
      document.querySelectorAll(".global-switcher.open").forEach(function (s) { s.classList.remove("open"); });
    });
  });
})();
