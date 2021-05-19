function AboutUs() {
    const actualContent = document.createElement('div');
    actualContent.classList.add('actual-content');

    const actualContentWrapper = document.createElement('div');
    actualContentWrapper.id = 'actual-content-wrapper';

    actualContent.appendChild(actualContentWrapper);

    const h2 = document.createElement('h2');
    h2.textContent = 'Our hotel was established in 1985 and cemented itself as one of the best services in west Europe';

    const p = document.createElement('p');
    p.textContent = 'Our prices:';

    const p2 = document.createElement('p');
    p2.textContent = '€150 per night in biggest rooms';

    const p3 = document.createElement('p');
    p3.textContent = '€100 per night in smaller rooms';

    const p4 = document.createElement('p');
    p4.textContent = 'All rooms have their own bathroom, and a balcony';

    actualContentWrapper.appendChild(h2);
    actualContentWrapper.appendChild(p);
    actualContentWrapper.appendChild(p2);
    actualContentWrapper.appendChild(p3);
    actualContentWrapper.appendChild(p4);

    return actualContent;
}

export default AboutUs;