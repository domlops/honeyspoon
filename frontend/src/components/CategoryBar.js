import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function CategoryBar() {
  const [shop, setShop] = useState(false);

  let history = useHistory();

  const clickHandler = (category) => {
    history.push(`/?search=${category}&page=1`);
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
      <Nav fill variant="tabs" className="mt-3">
        <Nav.Link onClick={() => bar()}>
          <img
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/mel-nobg.png"
            width="100"
            height="100"
            alt="sex-shop"
          />
        </Nav.Link>

        <Nav.Link
          href="https://portal.masterlove.com.br/profissional/1620876086819x131650251047305220"
          target="_blank"
        >
          <img
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/mlove.png"
            width="100"
            height="100"
            alt="mlove"
          />
        </Nav.Link>

        <Nav.Link href="#/inciclo">
          <img
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/inciclo.png"
            width="100"
            height="100"
            alt="inciclo"
          />
        </Nav.Link>

        <Nav.Link href="#/colmeia">
          <img
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/Colmeia+Neon.svg"
            width="100"
            height="100"
            alt="colmeia"
          />
        </Nav.Link>

        <Nav.Link href="#/aroma-honeyspoon">
          <img
            src="https://honeyspoon-bucket.s3-sa-east-1.amazonaws.com/Chocolates.svg"
            width="100"
            height="100"
            alt="chocs"
          />
        </Nav.Link>
      </Nav>

      {shop && (
        <Nav
          justify
          rounded
          variant="tabs"
          className="mt-3"
          onSelect={(eventKey) => clickHandler(eventKey)}
        >
          <Nav.Link eventKey="Vibradores">
            <h6>Vibradores</h6>
          </Nav.Link>
          <Nav.Link eventKey="Bolinhas">
            <h6>Bolinhas</h6>
          </Nav.Link>
          <Nav.Link eventKey="Géis">
            <h6>Géis</h6>
          </Nav.Link>
          <Nav.Link eventKey="Dildos e Plugs">
            <h6>Plugs & Dildos</h6>
          </Nav.Link>
          <Nav.Link eventKey="Fetiche">
            <h6>Fetiche</h6>
          </Nav.Link>
          <Nav.Link eventKey="Anéis Penianos">
            <h6>Anéis Penianos</h6>
          </Nav.Link>
          <Nav.Link eventKey="Lingerie">
            <h6>Lingerie</h6>
          </Nav.Link>
          <Nav.Link eventKey="Massageadores">
            <h6>Massageadores</h6>
          </Nav.Link>
          <Nav.Link eventKey="Cuidados">
            <h6>Cuidados</h6>
          </Nav.Link>
          <Nav.Link eventKey="Outros">
            <h6>Outros</h6>
          </Nav.Link>
          <Nav.Link href="#/bazar">
            <h6>Bazar</h6>
          </Nav.Link>
        </Nav>
      )}
    </div>
  );
}

export default CategoryBar;
