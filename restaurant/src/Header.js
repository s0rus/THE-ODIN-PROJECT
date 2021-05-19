function Header() {

    const headerDiv = document.createElement('div');
    headerDiv.id = 'header';

    const hotelName = document.createElement('h1');
    hotelName.textContent = 'CASA DI MUZZA';

    const navDiv = document.createElement('div');
    navDiv.id = "navigation";

    headerDiv.appendChild(hotelName);
    headerDiv.appendChild(navDiv);

    return headerDiv;
}

export default Header;