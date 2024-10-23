/*
Project: Redpers
Ontwikkelaar: [Fatima el Hilali]
Beschrijving: Deze JavaScript-code is ontworpen om interactieve functionaliteiten toe te voegen aan de website van Redpers. 
Het script bevat de volgende functies:
1. Menu-functionaliteit: Het openen en sluiten van een dropdownmenu met behulp van een overlay, 
   inclusief toegankelijkheid voor schermlezers en toetsenbordgebruikers.
2. View counter: Het bijhouden en weergeven van het aantal keren dat een artikel is bekeken door middel van de browser's localStorage.
3. Voortgangsbalk: Een dynamische voortgangsbalk die de scrolprogressie van de gebruiker door het artikel toont. 
   Deze balk biedt visuele feedback over hoeveel van het artikel is gelezen.
4. Popup-functionaliteit: Een nieuwsbrief-popup die verschijnt na een vertraging en kan worden gesloten door de gebruiker.
*/

document.addEventListener('DOMContentLoaded', function () {
    // MENU FUNCTIONALITEIT

    // Pak de elementen voor het menu en de overlay
    const menuButton = document.getElementById('menu-button');  // De knop waarmee het menu opent
    const dropdown = document.querySelector('.dropdown');       // Het dropdownmenu
    const overlay = document.getElementById('overlay');         // De overlay
    const closeButton = document.getElementById('close-button');// De knop om het menu te sluiten

    // Wanneer de menu-knop wordt aangeklikt
    menuButton.addEventListener('click', function () {
        overlay.classList.add('show');    // Laat de overlay zien door de 'show' class toe te voegen
        dropdown.classList.add('show');   // Laat het dropdownmenu zien door de 'show' class toe te voegen
        dropdown.focus(); // Zet de focus op het dropdownmenu voor toegankelijkheid
    });

    // Wanneer de sluitknop wordt aangeklikt
    closeButton.addEventListener('click', function () {
        closeMenu();
    });

    // Wanneer je op de overlay zelf klikt, sluit het menu
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {   // Controleer of je daadwerkelijk op de overlay klikt, en niet op een kindelement
            closeMenu();
        }
    });

    // Functie om het menu te sluiten
    function closeMenu() {
        overlay.classList.remove('show'); // Verberg de overlay door de 'show' class te verwijderen
        dropdown.classList.remove('show');// Verberg het dropdownmenu door de 'show' class te verwijderen
    }

    // VIEW COUNTER FUNCTIONALITEIT

    // Pak het element voor de view-counter (zorg dat dit overeenkomt met de HTML-class)
    const viewCounter = document.querySelector('.view-counter'); 

    // Stel een uniek ID in voor het artikel, om het aantal weergaven specifiek voor dit artikel bij te houden
    const articleId = 'article-123'; 

    // Haal het huidige aantal weergaven uit de browser's localStorage
    let views = localStorage.getItem(articleId) || 0;  // Als er nog geen waarde is, begin dan met 0
    views++;  // Verhoog het aantal weergaven met 1 bij elke nieuwe paginaweergave

    // Toon het bijgewerkte aantal weergaven in de viewCounter
    viewCounter.textContent = `${views} keer bekeken`; 

    // Sla het bijgewerkte aantal weergaven weer op in localStorage, zodat het behouden blijft bij het vernieuwen van de pagina
    localStorage.setItem(articleId, views);

    // VOORTGANGSBALK FUNCTIONALITEIT

    // Pak de voortgangsbalk en het artikel
    const progressBar = document.getElementById('progress-bar'); // De voortgangsbalk
    const article = document.querySelector('.article-content');  // Het artikel zelf

    // Functie om de voortgangsbalk bij te werken
    window.addEventListener('scroll', function () {
        const articleTop = article.offsetTop; // Afstand van het artikel tot de bovenkant van de pagina
        const articleHeight = article.offsetHeight; // Hoogte van het artikel
        const scrollTop = window.scrollY; // Hoe ver de gebruiker heeft gescrold
        const windowHeight = window.innerHeight; // Hoogte van het venster

        // Bereken de maximale scrollbare hoogte van het artikel
        const maxScroll = articleTop + articleHeight - windowHeight;

        // Bereken de voortgang in percentage, maar houd het binnen 0 en 100
        const progress = ((scrollTop - articleTop) / maxScroll) * 100;

        // Stel de breedte van de voortgangsbalk in op basis van het percentage
        progressBar.style.width = Math.max(0, Math.min(progress, 100)) + '%'; // Voorkom negatieve waarden
    });

    // NIEUWSBRIEF POPUP FUNCTIONALITEIT

    // Pak de elementen voor de popup
    const popup = document.getElementById('newsletter-popup');
    const closePopup = document.getElementById('close-popup');

    // Toon de popup na een vertraging (bijv. 5 seconden)
    setTimeout(function () {
        popup.classList.add('show'); // Voeg de 'show' class toe om de popup zichtbaar te maken
        popup.focus(); // Zet de focus op de popup
    }, 5000); // 5 seconden vertraging

    // Sluit de popup wanneer op de sluitknop wordt geklikt
    closePopup.addEventListener('click', function () {
        popup.classList.remove('show'); // Verwijder de 'show' class om de popup te verbergen
    });

    // Zorg ervoor dat de focus teruggaat naar de knop die de popup opent, als deze bestaat
    // Bijvoorbeeld: document.getElementById('open-popup-button').focus(); 
});
