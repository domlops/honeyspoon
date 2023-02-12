import React, { useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { novasCategorias } from "../Lists";

function CategoryBar() {
  const [shop, setShop] = useState(false);

  let history = useHistory();

  const clickHandler = (category) => {
    history.push(`/?search=${category}&page=1`);
    setShop(false);
  };

  const bar = () => {
    if (shop) {
      setShop(false);
    } else {
      setShop(true);
    }
  };

  return (
    <div>
      <Nav justify variant="tabs" className="mt-3">
        <Nav.Link onClick={() => bar()}>
          <img
            src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/Logo-horizontal-vinho.png"
            width="200"
            height="100"
            alt="sex-shop"
          />
        </Nav.Link>

        <Nav.Link href="#/papo">
          <img
            src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/Papo+de+Mel.png"
            width="200"
            height="100"
            alt="mlove"
          />
        </Nav.Link>

        <Nav.Link href="#/colmeia">
          <img
            src="https://honeyspoon-bucket.s3.sa-east-1.amazonaws.com/Colmeia.png"
            width="200"
            height="100"
            alt="colmeia"
          />
        </Nav.Link>
      </Nav>

      {shop && (
        <Nav
          fill
          variant="tabs"
          className="mt-3"
          onSelect={(eventKey) => clickHandler(eventKey)}
        >
          {Object.keys(novasCategorias).map((category, index) => (
            <NavDropdown key={index} title={category} id="navDropdown">
              {novasCategorias[category].map((sub, i) => (
                <NavDropdown.Item
                  key={i}
                  id="dropdownItem"
                  eventKey={sub.toLowerCase()}
                >
                  {sub}
                </NavDropdown.Item>
              ))}
              <NavDropdown.Divider />
              <NavDropdown.Item
                id="dropdownItem"
                eventKey={category.toLowerCase()}
              >
                VER TODOS
              </NavDropdown.Item>
            </NavDropdown>
          ))}
        </Nav>
      )}
    </div>
  );
}

export default CategoryBar;
