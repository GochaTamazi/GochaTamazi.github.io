function makeIcon() {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 32;

    let ctx = canvas.getContext('2d');
    ctx.lineWidth = 0;

    let drawCircle = (x, y, rad, col) => {
        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle = col;
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }

    let r = 6;
    drawCircle(8, 8, r, `#82e08a`);
    drawCircle(8, 24, r, `#e65d42`);
    drawCircle(24, 8, r, `#81b2fe`);
    drawCircle(24, 24, r, `#8e5dab`);

    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = canvas.toDataURL("image/x-icon");
    document.getElementsByTagName('head')[0].appendChild(link);
}

makeIcon();
