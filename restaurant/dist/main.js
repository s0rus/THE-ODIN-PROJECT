(()=>{"use strict";const e=function(){const e=document.createElement("div");e.classList.add("actual-content");const t=document.createElement("div");t.id="actual-content-wrapper",e.appendChild(t);const n=document.createElement("h2");n.textContent="Casa di Muzza is the best hotel in the west!";const o=document.createElement("p");o.textContent="Feel free to contact us and check out our offer as it is quite cheap relative to other hotels in our area.";const c=document.createElement("img");return c.setAttribute("src","../src/hotel.png"),t.appendChild(n),t.appendChild(o),t.appendChild(c),e},t=function(){const e=document.createElement("div");e.id="footer";const t=document.createElement("h3");t.textContent="Cassa di Muzza 2021";const n=document.createElement("h5"),o=document.createElement("a");return o.setAttribute("href","https://www.freepik.com"),o.textContent="hotel icon from Freepik",e.appendChild(t),e.appendChild(n),n.appendChild(o),e};!function(){const n=document.getElementById("content");n.appendChild(function(){const e=document.createElement("div");e.id="header";const t=document.createElement("h1");t.textContent="CASA DI MUZZA";const n=document.createElement("div");return n.id="navigation",e.appendChild(t),e.appendChild(n),e}()),n.appendChild(e()),n.appendChild(t());const o=document.getElementById("navigation"),c=document.createElement("button");c.textContent="HOME";const d=document.createElement("button");d.textContent="ABOUT US";const a=document.createElement("button");a.textContent="CONTACT",o.appendChild(c),o.appendChild(d),o.appendChild(a),c.addEventListener("click",(()=>{const o=document.querySelector(".actual-content"),c=document.getElementById("footer");o.remove(),c.remove(),n.appendChild(e()),n.appendChild(t())})),d.addEventListener("click",(()=>{const e=document.querySelector(".actual-content"),o=document.getElementById("footer");e.remove(),o.remove(),n.appendChild(function(){const e=document.createElement("div");e.classList.add("actual-content");const t=document.createElement("div");t.id="actual-content-wrapper",e.appendChild(t);const n=document.createElement("h2");n.textContent="Our hotel was established in 1985 and cemented itself as one of the best services in west Europe";const o=document.createElement("p");o.textContent="Our prices:";const c=document.createElement("p");c.textContent="€150 per night in biggest rooms";const d=document.createElement("p");d.textContent="€100 per night in smaller rooms";const a=document.createElement("p");return a.textContent="All rooms have their own bathroom, and a balcony",t.appendChild(n),t.appendChild(o),t.appendChild(c),t.appendChild(d),t.appendChild(a),e}()),n.appendChild(t())})),a.addEventListener("click",(()=>{const e=document.querySelector(".actual-content"),o=document.getElementById("footer");e.remove(),o.remove(),n.appendChild(function(){const e=document.createElement("div");e.classList.add("actual-content");const t=document.createElement("div");t.id="actual-content-wrapper",e.appendChild(t);const n=document.createElement("h2");n.textContent="Please, contact us to book a hotel!";const o=document.createElement("p");o.textContent="EMAIL: cassadi@muzza.com";const c=document.createElement("img");return c.style.width="50%",c.setAttribute("src","../src/map.jpg"),t.appendChild(n),t.appendChild(o),t.appendChild(c),e}()),n.appendChild(t())}))}()})();