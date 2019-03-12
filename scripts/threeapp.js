/*
    Copyright (c) 2019 by Justin Yau (https://codepen.io/josticeman/pen/XGaNBm)
Fork of an original work by Louis Hoebregts (https://codepen.io/Mamboleoo/pen/wKqwPN)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
document.addEventListener("DOMContentLoaded", function(event) {
    var particles = [];
    var renderer, scene, cmra, windowWidth, windowHeight;
    windowWidth = window.innerWidth,
        windowHeight = window.innerHeight;
    var resizeCanvasWidth = .65 * windowWidth;
    var resizeCanvasHeight = (.15 * windowHeight) + (.3 * windowWidth);
    var pixelColor = 0x35740b;

    var centerVector = new THREE.Vector3(0, 0, 0);
    var speed = 10;
    var isMouseDown = false;
    ;

    function getImageData() {
        var canvas    = document.createElement("canvas");
        var ctx       = canvas.getContext("2d")

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0);
        var data = ctx.getImageData(0, 0, image.width, image.height);
        return data;
    }

    var drawTheMap = function() {

        var geometry = new THREE.Geometry();
        var material = new THREE.PointsMaterial({
            size: 3,
            color: pixelColor,
            sizeAttenuation: false
        });

        for (var y = 0, y2 = imagedata.height; y < y2; y += 2) {
            for (var x = 0, x2 = imagedata.width; x < x2; x += 2) {
                if (imagedata.data[(x * 4 + y * 4 * imagedata.width)] < 100) {

                    var vertex = new THREE.Vector3();
                    vertex.x = x - imagedata.width / 2;
                    vertex.y = -y + imagedata.height / 2;
                    vertex.z = -Math.random()*500;

                    vertex.speed = Math.random() / speed + 0.015;

                    geometry.vertices.push(vertex);
                }
            }
        }
        particles = new THREE.Points(geometry, material);

        scene.add(particles);

        requestAnimationFrame(render);
    };

    var init = function(image, canvid) {
        renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById(canvid),
            antialias: true,
            alpha: true
        });
        renderer.setSize(resizeCanvasWidth, resizeCanvasHeight);

        scene = new THREE.Scene();

        cmra = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2, windowHeight / 2, windowHeight / - 2, 1, 1000 );
        cmra.position.set(7, 0, 4);
        cmra.lookAt(centerVector);
        scene.add(cmra);
        cmra.zoom = 2;
        cmra.updateProjectionMatrix();

        imagedata = getImageData(image);
        drawTheMap();

        window.addEventListener('mousemove', mouseMoveEvent, false);
        window.addEventListener('mousedown', mouseDownEvent, false);
        window.addEventListener('mouseup', mouseLiftEvent, false);
        window.addEventListener('resize', resizeEvent, false);
    }

    var resizeEvent = function(){
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        resizeCanvasWidth = .65 * windowWidth;
        resizeCanvasHeight = (.15 * windowHeight) + (.3 * windowWidth);
        renderer.setSize(resizeCanvasWidth, resizeCanvasHeight);
        cmra.left    = windowWidth / - 2;
        cmra.right   = windowWidth / 2;
        cmra.top     = windowHeight / 2;
        cmra.bottom  = windowHeight / - 2;
        cmra.updateProjectionMatrix();
    };

    var mouseLiftEvent = function(){
        isMouseDown = false;
    }
    var mouseDownEvent = function(e){
        isMouseDown = true;
        lastMousePos = {x:e.clientX, y:e.clientY};
    };
    var mouseMoveEvent = function(e){
        if(isMouseDown){
            cmra.position.x += (e.clientX-lastMousePos.x)/100;
            cmra.position.y -= (e.clientY-lastMousePos.y)/100;
            cmra.lookAt(centerVector);
            lastMousePos = {x:e.clientX, y:e.clientY};
        }
    };

    var render = function(a) {

        requestAnimationFrame(render);


        particles.geometry.verticesNeedUpdate = true;
        if(!isMouseDown){
            cmra.position.x += (0-cmra.position.x)*0.05;
            cmra.position.y += (0-cmra.position.y)*0.05;
            cmra.lookAt(centerVector);
        }

        renderer.render(scene, cmra);
    };

    var image = document.createElement("img");
    image.onload = function () {
        init(image, "me");
    }
    image.src = "../images/gray-me-bg.png";

});