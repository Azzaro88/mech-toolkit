/* =====================================================================
   MECH Toolkit — site add-ons (cookie consent + ads + support footer)
   ---------------------------------------------------------------------
   Loaded by every page via:  <script src="site-addons.js" defer></script>

   👉 EDIT ONLY THIS CONFIG BLOCK — it controls all 16 pages at once.
   ===================================================================== */
(function () {
  "use strict";

  var CFG = {
    // ---- Google AdSense -------------------------------------------------
    // Leave adsenseClient = "" to show a dashed PLACEHOLDER box (no tracking).
    // Once approved, paste your Publisher ID + ad-unit Slot ID here and ads
    // will load on every page automatically (after the visitor clicks Accept).
    adsenseClient: "",          // e.g. "ca-pub-1234567890123456"
    adsenseSlot:   "",          // e.g. "1234567890"

    // ---- Buy me a coffee ----------------------------------------------
    coffeeUrl: "https://www.buymeacoffee.com/YOURNAME",   // <-- your page

    // ---- Affiliate links (shown in the support footer) ----------------
    // Add/remove freely. Leave the array empty [] to hide this row.
    affiliate: [
      { label: "🔧 Recommended engineering tools", url: "https://www.amazon.com/?tag=YOURTAG-20" }
      // { label: "📘 HVAC handbook", url: "https://amzn.to/yourlink" },
    ],

    privacyUrl: "privacy.html"
  };

  /* ---------------------------------------------------------------- */
  var KEY = "mechConsent";                 // "accepted" | "declined" | null
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  /* ---- styles ---------------------------------------------------- */
  var css =
  ".mech-addon{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;box-sizing:border-box;}" +
  ".mech-adwrap{width:100%;max-width:1240px;margin:14px auto 6px;padding:0 18px;}" +
  ".mech-adph{border:2px dashed #9db8d6;border-radius:12px;background:#eaf2fb;color:#5a6b7b;" +
    "text-align:center;padding:22px 14px;font-size:12.5px;letter-spacing:.3px;}" +
  ".mech-adph b{color:#1d4e89;}" +
  ".mech-foot{width:100%;margin:6px auto 14px;max-width:1240px;padding:6px 18px 14px;border-bottom:1px solid #d4dae2;" +
    "display:flex;flex-wrap:wrap;align-items:center;gap:14px;font-size:12.5px;color:#5a6b7b;}" +
  ".mech-foot .coffee{display:inline-flex;align-items:center;gap:7px;text-decoration:none;background:#FFDD00;" +
    "color:#222;font-weight:800;border-radius:9px;padding:9px 15px;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,.12);}" +
  ".mech-foot .coffee:hover{filter:brightness(.96);}" +
  ".mech-foot a.lnk{color:#1d4e89;text-decoration:none;font-weight:600;}" +
  ".mech-foot a.lnk:hover{text-decoration:underline;}" +
  ".mech-foot .aff{display:flex;flex-wrap:wrap;gap:6px 16px;}" +
  ".mech-foot .sep{flex:1 1 auto;}" +
  ".mech-foot .disc{flex-basis:100%;font-size:11px;color:#8a96a3;margin-top:2px;}" +
  ".mech-cc{position:fixed;left:50%;transform:translateX(-50%);bottom:16px;z-index:9999;width:calc(100% - 32px);" +
    "max-width:760px;background:#12304e;color:#eaf2fb;border:1px solid #1d4e89;border-radius:14px;" +
    "box-shadow:0 12px 36px rgba(0,0,0,.32);padding:16px 18px;display:flex;flex-wrap:wrap;align-items:center;gap:12px;}" +
  ".mech-cc p{margin:0;flex:1 1 320px;font-size:13px;line-height:1.5;}" +
  ".mech-cc a{color:#9fd1f2;}" +
  ".mech-cc .btns{display:flex;gap:9px;margin-left:auto;}" +
  ".mech-cc button{cursor:pointer;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:700;}" +
  ".mech-cc .acc{background:#1d4e89;color:#fff;}" +
  ".mech-cc .acc:hover{background:#2a63a8;}" +
  ".mech-cc .dec{background:transparent;color:#cfe0f3;border:1px solid #3c5f86;}" +
  ".mech-cc .dec:hover{background:rgba(255,255,255,.08);}" +
  "@media print{.mech-addon{display:none!important;}}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  /* ---- ad slot --------------------------------------------------- */
  function buildAd() {
    var wrap = document.createElement("div");
    wrap.className = "mech-addon mech-adwrap";
    if (CFG.adsenseClient) {
      var ins = document.createElement("ins");
      ins.className = "adsbygoogle";
      ins.style.display = "block";
      ins.setAttribute("data-ad-client", CFG.adsenseClient);
      if (CFG.adsenseSlot) ins.setAttribute("data-ad-slot", CFG.adsenseSlot);
      ins.setAttribute("data-ad-format", "auto");
      ins.setAttribute("data-full-width-responsive", "true");
      wrap.appendChild(ins);
    } else {
      wrap.innerHTML = '<div class="mech-adph"><b>Ad space</b> — set <code>adsenseClient</code> in ' +
        '<b>site-addons.js</b> to show Google AdSense here.</div>';
    }
    document.body.insertBefore(wrap, document.body.firstChild);
  }

  function loadAds() {
    if (!CFG.adsenseClient) return;                 // placeholder mode → nothing to load
    if (window.__mechAdsLoaded) return;
    window.__mechAdsLoaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(CFG.adsenseClient);
    s.crossOrigin = "anonymous";
    s.onload = function () {
      document.querySelectorAll("ins.adsbygoogle").forEach(function () {
        try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
      });
    };
    document.head.appendChild(s);
  }

  /* ---- support footer ------------------------------------------- */
  function buildFooter() {
    var f = document.createElement("div");
    f.className = "mech-addon mech-foot";
    var aff = CFG.affiliate.map(function (a) {
      return '<a class="lnk" href="' + a.url + '" target="_blank" rel="nofollow noopener sponsored">' + a.label + "</a>";
    }).join("");
    f.innerHTML =
      '<a class="coffee" href="' + CFG.coffeeUrl + '" target="_blank" rel="noopener">☕ Buy me a coffee</a>' +
      (aff ? '<div class="aff">' + aff + "</div>" : "") +
      '<span class="sep"></span>' +
      '<a class="lnk" href="' + CFG.privacyUrl + '">Privacy Policy</a>' +
      '<a class="lnk" href="#" id="mechCookieSettings">Cookie settings</a>' +
      (aff ? '<div class="disc">Some links are affiliate links — we may earn a commission at no extra cost to you.</div>' : "");
    document.body.insertBefore(f, document.body.firstChild);
    var cs = document.getElementById("mechCookieSettings");
    if (cs) cs.addEventListener("click", function (e) {
      e.preventDefault();
      try { localStorage.removeItem(KEY); } catch (x) {}
      location.reload();
    });
  }

  /* ---- cookie consent banner ------------------------------------ */
  function showBanner() {
    var b = document.createElement("div");
    b.className = "mech-addon mech-cc";
    b.innerHTML =
      "<p>We use cookies to personalise content &amp; ads and to analyse traffic. " +
      'By clicking <b>Accept</b> you agree to advertising cookies. See our ' +
      '<a href="' + CFG.privacyUrl + '">Privacy Policy</a>.</p>' +
      '<div class="btns"><button class="dec" id="mechDecline">Decline</button>' +
      '<button class="acc" id="mechAccept">Accept</button></div>';
    document.body.appendChild(b);
    document.getElementById("mechAccept").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "accepted"); } catch (x) {}
      b.remove(); loadAds();
    });
    document.getElementById("mechDecline").addEventListener("click", function () {
      try { localStorage.setItem(KEY, "declined"); } catch (x) {}
      b.remove();
    });
  }

  /* ---- init ------------------------------------------------------ */
  buildFooter();      // prepended first
  buildAd();          // prepended second → ends up above the footer (top of page)
  if (choice === "accepted") loadAds();
  else if (choice !== "declined") showBanner();
})();
