window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.location.reload();        console.log('Page loaded from bfcache');
    }
});
window.onload = function() {

    const button = document.querySelector('.centered-content button');
    const textSpan = button.querySelector('span');
    button.disabled = true;
    button.style.cursor = 'default';

    setTimeout(function() {
        textSpan.style.opacity = '1';

        button.disabled = false;
        button.style.cursor = 'pointer';
    }, 1000);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var firstInteraction = true; // Flag to check the first interaction
    var loadingPage = document.getElementById('loading-page'); // Get the loading page element
    var letsgo = document.getElementById('letsgo')
    letsgo.addEventListener('click', function() {
        fadeOutLoadingPage(); // Call to fade out loading page

    })
    var painting = false;
    function startPosition(e) {
        painting = true;
        draw(e); // This avoids the need to move the mouse to start drawing
    }

    function finishedPosition() {
        painting = false;
        ctx.beginPath(); // Begins a new path for a new stroke

        if (firstInteraction) {
            fadeInLetsGo(); // Call to fade out loading page
            firstInteraction = false; // Set to false after first interaction
        }

    }

    function fadeInLetsGo() {
        letsgo.style.transition = 'opacity 0.5s ease-out';
        letsgo.style.opacity = '1';
    }
    function fadeOutLoadingPage() {
        loadingPage.style.transition = 'opacity 0.5s ease-out';
        loadingPage.style.opacity = '0';
        setTimeout(() => {
            loadingPage.style.display = 'none';
        }, 500); // Corresponds to the transition time
        window.location.href = "main.html";

    }

    function draw(e) {
        if (!painting) return;

        e.preventDefault();  // Prevent default behavior like scrolling.
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        ctx.lineWidth = 8;
        ctx.lineCap = 'round';

        ctx.strokeStyle = '#C7C8CC'; // Set the current color from the array

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);

    // Optional: Handle touch events for mobile devices
    canvas.addEventListener('touchstart', function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener('touchend', function(e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);

    canvas.addEventListener('touchmove', function(e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);

    // Prevent scrolling when touching the canvas
    document.body.addEventListener("touchstart", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchend", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);
    document.body.addEventListener("touchmove", function (e) {
        if (e.target == canvas) {
            e.preventDefault();
        }
    }, false);

    updateText("draw something...");
};


function updateText(text){

    let delay = 500;

    let h1 = document.getElementById("wavy");

    h1.innerHTML = text
        .split("")
        .map(letter => {
            return `<span>` + letter + `</span>`;
        })
        .join("");

    Array.from(h1.children).forEach((span, index) => {
        setTimeout(() => {
            span.classList.add("wavy");
        }, index * 40 + delay);
    });

}
