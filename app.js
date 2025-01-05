const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItems");
const sliderItems = document.querySelectorAll(".sliderItem");

let currentIndex = 0;
const totalSlides = sliderItems.length; 
let interval; 

function goToSlide(index) {
    currentIndex = index;
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides; 
    goToSlide(currentIndex);
}

menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        clearInterval(interval); 
        goToSlide(index); 
        startAutoSlide(); 
    });
});


function startAutoSlide() {
    interval = setInterval(nextSlide, 3000); 
}

// Start automatic sliding initially
startAutoSlide();

function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resetPlaceholder() {

    var recipient = document.getElementById("fInput").value;

    if(isValidEmail(recipient)){
        alert("You have successfully subscribed to our monthly newsletter.")
    }

    else{
        alert("Please enter a valid email id")
    }
    
    document.getElementById("fInput").value = "";
}

// Full-page search and highlight
document.getElementById('searchIcon').addEventListener('click', function () {
    const searchBar = document.getElementById('searchBar');
    const searchQuery = searchBar.value.trim();

    // Clear previous highlights
    clearHighlights();

    if (searchQuery === '') {
        alert('Please enter a search term.');
        return;
    }

    // Search and highlight matches
    const bodyContent = document.body.innerHTML;
    const regex = new RegExp(`(${searchQuery})`, 'gi');

    if (regex.test(bodyContent)) {
        highlightMatches(document.body, searchQuery);
    } else {
        alert('No matches found.');
    }
});

function highlightMatches(element, searchQuery) {
    // Skip certain elements like <script>, <style>, etc.
    if (element.nodeName === 'SCRIPT' || element.nodeName === 'STYLE') return;

    if (element.nodeType === Node.TEXT_NODE) {
        const text = element.nodeValue;
        const regex = new RegExp(`(${searchQuery})`, 'gi');
        const matches = text.match(regex);

        if (matches) {
            const highlightWrapper = document.createElement('span');
            highlightWrapper.innerHTML = text.replace(regex, '<mark>$1</mark>');
            element.replaceWith(highlightWrapper);
        }
    } else {
        // Recursively search and highlight child nodes
        element.childNodes.forEach((child) => highlightMatches(child, searchQuery));
    }
}

function clearHighlights() {
    document.querySelectorAll('mark').forEach((markElement) => {
        markElement.replaceWith(document.createTextNode(markElement.textContent));
    });
}
