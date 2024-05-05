function openModal(imgSrc, altText) {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImg");

    modal.style.display = "flex";
    modalImg.src = imgSrc;
    modalImg.alt = altText;
}

function closeModal(event) {
    if (event.target === event.currentTarget) {
        document.getElementById("myModal").style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    const collageImages = document.querySelectorAll('.image-collage img');
    collageImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
    });
});
