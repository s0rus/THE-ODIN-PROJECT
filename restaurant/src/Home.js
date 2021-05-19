function Home() {
    const actualContent = document.createElement('div');
    actualContent.classList.add('actual-content');

    const actualContentWrapper = document.createElement('div');
    actualContentWrapper.id = 'actual-content-wrapper';

    actualContent.appendChild(actualContentWrapper);

    const h2 = document.createElement('h2');
    h2.textContent = 'Casa di Muzza is the best hotel in the west!';

    const p = document.createElement('p');
    p.textContent = 'Feel free to contact us and check out our offer as it is quite cheap relative to other hotels in our area.';

    const img = document.createElement('img');
    img.setAttribute('src', '../src/hotel.png');

    actualContentWrapper.appendChild(h2);
    actualContentWrapper.appendChild(p);
    actualContentWrapper.appendChild(img);

    return actualContent;
}

export default Home;