(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "gsap"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const gsap_1 = require("gsap");
    console.log(gsap_1.gsap);
    function getPosCssText(info) {
        return `
    position: absolute;
    left: ${info.x}px;
    top: ${info.y}px;
    width: ${info.w}px;
    height: ${info.h}px
    `;
    }
    function getEl(shape, info) {
        var _a;
        const el = document.createElement('div');
        el.classList.add(shape);
        el.style.cssText = getPosCssText(info);
        (_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.appendChild(el);
        return el;
    }
    window.onload = function () {
        const e = getEl('circle', { x: 100, y: 100, w: 100, h: 100 });
        console.log(e);
        gsap_1.gsap.to(e, {
            x: 200,
            duration: 1,
        });
    };
});
