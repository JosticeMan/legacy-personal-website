document.addEventListener("DOMContentLoaded", function(event) {
    var span = document.getElementById("footer-note");
    var d = new Date();
    span.innerHTML = "justinyau.me &copy " + d.getFullYear() + " Justin Yau";

    var start = document.getElementById("fillstart");
    var stop = document.getElementById("fillstop");

    function fillScroll() {
        var max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var amount = Math.round((winScroll / max) * 100.0);
        start.setAttribute("offset", amount + "%");
        stop.setAttribute("offset", amount + "%");
    }

    window.addEventListener("scroll", function() {
        window.requestAnimationFrame(fillScroll);
    });
    window.addEventListener("resize", function() {
        window.requestAnimationFrame(fillScroll);
    });

});
