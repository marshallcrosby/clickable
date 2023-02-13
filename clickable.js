/*!
    * Clickable v0.0.1
    * Click on or anywhere inside a specified element, with a hyperlink, will fire that hyperlink.
    *
    * Copyright 2021-2023 Blend Interactive
    * https://blendinteractive.com
*/

Element.prototype.clickable = function () {
    const $this = this;
    const targetLink = $this.querySelectorAll('a')[0];
    
    let click = {
        down: null,
        up: null,
        middle: null,
        aux: null,
        hyperlink: null
    }

    $this.addEventListener('mousedown', function (e) {
        click.down = + new Date();
        click.middle = (e.which === 2) ? true : false;
        click.aux = (e.which === 3) ? true : false;
        click.hyperlink = (e.target.tagName.toLowerCase() === 'a') ? true : false;
    });

    $this.addEventListener('mouseup', function () {
        click.up = + new Date();

        if (
            (click.up - click.down) < 300 &&
            !click.aux &&
            !click.hyperlink
        ) {
            targetLink.click();
        }
    });
}

window.addEventListener('DOMContentLoaded', function () {
    const singleClickEl = document.querySelectorAll('.clickable');
    singleClickEl.forEach(item => item.clickable());
});