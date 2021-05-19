import Header from './Header';
import Home from './Home';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Footer from './Footer';

function init() {
    const content = document.getElementById('content');
    content.appendChild(Header());
    content.appendChild(Home());
    content.appendChild(Footer());

    const navigation = document.getElementById('navigation');
    const home = document.createElement('button');
    home.textContent = 'HOME';
    const aboutus = document.createElement('button');
    aboutus.textContent = 'ABOUT US';
    const contact = document.createElement('button');
    contact.textContent = 'CONTACT';

    navigation.appendChild(home);
    navigation.appendChild(aboutus);
    navigation.appendChild(contact);

    home.addEventListener('click', () => {
        const actualContent = document.querySelector('.actual-content');
        const footer = document.getElementById('footer');
        actualContent.remove();
        footer.remove();
        content.appendChild(Home());
        content.appendChild(Footer());
    })

    aboutus.addEventListener('click', () => {
        const actualContent = document.querySelector('.actual-content');
        const footer = document.getElementById('footer');
        actualContent.remove();
        footer.remove();
        content.appendChild(AboutUs());
        content.appendChild(Footer());
    });

    contact.addEventListener('click', () => {
        const actualContent = document.querySelector('.actual-content');
        const footer = document.getElementById('footer');
        actualContent.remove();
        footer.remove();
        content.appendChild(Contact());
        content.appendChild(Footer());
    });
}

export default init;