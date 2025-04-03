// ==UserScript==
// @name         BilibiliDynamicAssist - 哔哩哔哩动态页点击动态文字不跳转详情页
// @namespace    https://github.com/chaofunchengfeng/BilibiliDynamicAssist
// @homepage     https://github.com/chaofunchengfeng/BilibiliDynamicAssist
// @homepageURL  https://github.com/chaofunchengfeng/BilibiliDynamicAssist
// @website      https://github.com/chaofunchengfeng/BilibiliDynamicAssist
// @source       https://github.com/chaofunchengfeng/BilibiliDynamicAssist
// @version      1.0
// @description  b站动态页点击动态文字不跳转详情页
// @author       chaofunchengfeng
// @match        https://t.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-idle
// @license      MIT
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    //
    function addObserver() {
        const targetNode = document.getElementsByTagName("main")[0];
        new MutationObserver(() => {
            delayExecute()
        }).observe(targetNode, {childList: true, subtree: true});
    }

    //
    let timeoutId;

    function delayExecute() {
        // console.log(timeoutId);
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(setStopPropagationClickEvent, 100);
    }

    //
    function setStopPropagationClickEvent() {
        let elements = document.getElementsByClassName('bili-rich-text');
        // console.log(elements);
        for (let element of elements) {
            element.onclick = textClickEvent;
        }
    }

    //
    function textClickEvent(e) {
        e.stopPropagation();
    }

    //
    let pollCount = 0;
    let intervalID = setInterval(() => {
        try {
            pollCount++;
            if (pollCount > 50) {
                clearInterval(intervalID);
                return;
            }

            //
            let elements = document.getElementsByTagName("main");
            if (elements && elements.length) {
                clearInterval(intervalID);
                addObserver();
            }

        } catch (e) {
            console.error(e);
            clearInterval(intervalID);
        }
    }, 100);

})();
