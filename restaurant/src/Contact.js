function Contact() {
    const actualContent = document.createElement('div');
    actualContent.classList.add('actual-content');

    const actualContentWrapper = document.createElement('div');
    actualContentWrapper.id = 'actual-content-wrapper';

    actualContent.appendChild(actualContentWrapper);

    const h2 = document.createElement('h2');
    h2.textContent = 'Please, contact us to book a hotel!';

    const p = document.createElement('p');
    p.textContent = 'EMAIL: cassadi@muzza.com';

    const img = document.createElement('img');
    img.style.width = "50%";
    img.setAttribute('src', '../src/map.jpg');

    actualContentWrapper.appendChild(h2);
    actualContentWrapper.appendChild(p);
    actualContentWrapper.appendChild(img);

    return actualContent;
}

export default Contact;