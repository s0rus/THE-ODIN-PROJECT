function Footer() {
    const footer = document.createElement('div');
    footer.id = 'footer';

    const h3 = document.createElement('h3');
    h3.textContent = 'Cassa di Muzza 2021';

    const h5 = document.createElement('h5');

    const a = document.createElement('a');
    a.setAttribute('href', 'https://www.freepik.com');
    a.textContent = 'hotel icon from Freepik';

    footer.appendChild(h3);
    footer.appendChild(h5);
    h5.appendChild(a);

    return footer;
}

export default Footer;