document.addEventListener("DOMContentLoaded", function(event) {
    var canvas = document.getElementById("t-l");
    var c2d = canvas.getContext('2d');
    var particles = [];

    const MAX_RENDER = 125;
    var rendered = 0;

    function drawImage() {
        canvas.height = png.height * 3;
        canvas.width = png.width * 3;
        c2d.drawImage(png, 0, 0);

        var data = c2d.getImageData(0, 0, png.width, png.height);
        c2d.clearRect(0, 0, canvas.width, canvas.height);
        for (var y = 0; y < data.width; y += 2) {
            for (var x = 0; x < data.height; x += 3) {
                var p = (x + y * data.width) * 4;
                if (data.data[p + 3] > 128) {
                    var particle = {
                        x0: x,
                        y0: y,
                        x1: png.width / 2,
                        y1: png.height / 2,
                        speed: Math.random() * 3
                    };

                    TweenMax.to(particle, particle.speed, {
                        x1: x,
                        y1: y,
                        delay: y / 300,
                        ease: Elastic.easeOut,
                    });

                    particles.push(particle);
                }
            }
        }
        requestAnimationFrame(render);
    };

    var render = function () {
        c2d.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < particles.length; i++) {
            c2d.fillStyle = "rgb(64, 139, 14)";
            c2d.fillRect(particles[i].x1 * 3, particles[i].y1 * 3, 5, 5);
        }
        rendered += 1;
        if(rendered < MAX_RENDER) {
            requestAnimationFrame(render);
        }
    };

    var png = new Image();
    png.onload = drawImage;
    png.src = "images/logos/title-logo.png";
});