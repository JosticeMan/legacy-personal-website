document.addEventListener("DOMContentLoaded", function(event) {
    var span = document.getElementById("footer-note");
    var d = new Date();
    span.innerHTML = "justinyau.me &copy " + d.getFullYear() + " Justin Yau";
});