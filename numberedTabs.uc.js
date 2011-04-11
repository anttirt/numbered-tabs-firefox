// ==UserScript==
// @name           Numbered Tabs
// @namespace      http://anttirt.net/
// @description    Adds numbers to tab labels (useful with eg. Pentadactyl)
// @include        main
// @compatibility  Firefox 4.0
// @author         anttirt
// @version        1.0b
// @homepage       https://github.com/anttirt/numbered-tabs-firefox
// ==/UserScript==

(function() {
    var stripPat = /^\d\d*  /;
    var container = gBrowser.tabContainer;

    function update(event) {
        var tab = event.target;
        if(typeof tab.tabIndex == "undefined") {
            updateAll();
        }
        else {
            tab.label = String(tab.tabIndex) + "  " + tab.label.replace(stripPat, "");
        }
    }

    function updateAll() {
        for(var i = 0; i < container.childNodes.length; ++i) {
            var tab = container.childNodes[i];
            tab.label = String(i + 1) + "  " + tab.label.replace(stripPat, "");
            tab.tabIndex = i + 1;
        }
    }

    container.addEventListener("TabAttrModified", update, false);
    container.addEventListener("TabOpen", updateAll, false);
    container.addEventListener("TabMove", updateAll, false);
    container.addEventListener("TabClose", updateAll, false);

    window.addEventListener("load", function() {
        gBrowser.addEventListener("load", function() { window.setTimeout(update, 500); }, true)
    }, true);
})();

