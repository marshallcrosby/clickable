/*!
    * Clickable v0.0.3
    * Click on or anywhere inside a specified element, with a hyperlink, will fire that hyperlink.
    *
    * Copyright 2021-2024 Blend Interactive
    * https://blendinteractive.com
*/

Element.prototype.clickable = function () {
    const targetLinks = this.querySelectorAll('a');
    const posAttr = this.getAttribute('data-clickable-pos');
    const posIndex = (posAttr === 'first') ? 0 : (posAttr === 'last') ? targetLinks.length - 1 : posAttr;
    const pos = (posIndex !== null) ? posIndex : 0;
    const targetLink = targetLinks[pos];

    let click = {
        downTime: null,
        upTime: null,
        middle: null,
        aux: null,
        hyperlink: null,
        otherLinksClicked: null
    };

    this.addEventListener('mousedown', (e) => {
        click.downTime = + new Date();
        click.middle = (e.button === 2) ? true : false;
        click.aux = (e.button === 3) ? true : false;
        click.hyperlink = (e.target.tagName.toLowerCase() === 'a') ? true : false;
        click.otherLinksClicked = (!e.target === targetLink && e.target.matches('a') || e.target.closest('a')) ? true : false;
    });
    
    this.addEventListener('mouseup', () => {
        click.upTime = + new Date();
        
        if (
            (click.upTime - click.downTime) < 400 &&
            !click.aux &&
            !click.hyperlink &&
            !click.otherLinksClicked
        ) {
            targetLink.click();
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const singleClickEl = document.querySelectorAll('.clickable');
    singleClickEl.forEach(item => item.clickable());
});