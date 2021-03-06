import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import cookieSrc from "../cookie.svg";
import Item from "./Item";
import useInterval from "../hooks/use-interval.hook";

const items = [
  { id: "cursor", name: "Cursor", cost: 10, value: 1 },
  { id: "grandma", name: "Grandma", cost: 100, value: 10 },
  { id: "farm", name: "Farm", cost: 1000, value: 80 },
];

const calculateCookiesPerTick = (itemsObj, items) => {
  let finalMultiplier = 0;
  const multipliers = Object.values(itemsObj);

  multipliers.forEach((multiplier, index) => finalMultiplier += (items[index].value * multiplier));
  return finalMultiplier;
}

const useKeydown = (keyName, callBack) => {
  const handleKeydown = (ev) => {
    if (ev.code === keyName) {
      callBack();
    }
  }

  React.useEffect(() => {
      window.addEventListener("keydown", handleKeydown);
      return () => {
        window.removeEventListener("keydown", handleKeydown);
      }
  });
}

const useDocumentTitle = (title, fallbackTitle) => {
  React.useEffect(() => {
    document.title = title;
    return () => {
      document.title = fallbackTitle;
    }
  }, [title]);
}

const Game = () => {
  
  const [numCookies, setNumCookies] = useState(10000);
  const [boughtItems, setBoughtItems] = useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  
  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerTick(boughtItems, items);
    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);
  
  useKeydown('Space', () => setNumCookies(numCookies + 1));
  useDocumentTitle(`${numCookies} cookies - Cookie Clicker Workshop`, 'Cookie Clicker Workshop');

  return (
    <Wrapper>
      <GameArea>
        <Indicator>
          <Total>{numCookies} cookies</Total>
          <strong>{calculateCookiesPerTick(boughtItems, items)}</strong> cookies per second
        </Indicator>
        <Button onClick={() => setNumCookies(numCookies + 1)}>
          <Cookie src={cookieSrc} />
        </Button>
      </GameArea>

      <ItemArea>
        <SectionTitle>Items:</SectionTitle>
        {items.map((item, index) => <Item 
          key={item.id} 
          item={item} 
          numCookies={numCookies}
          setNumCookies={setNumCookies}
          boughtItems={boughtItems}
          setBoughtItems={setBoughtItems}
          index={index}
        />)}
      </ItemArea>
      <HomeLink to="/">Return home</HomeLink>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;
const GameArea = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
`;
const Button = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Cookie = styled.img`
  width: 200px;
`;

const ItemArea = styled.div`
  height: 100%;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.h3`
  text-align: center;
  font-size: 32px;
  color: yellow;
`;

const Indicator = styled.div`
  position: absolute;
  width: 250px;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
`;

const Total = styled.h3`
  font-size: 28px;
  color: lime;
`;

const HomeLink = styled(Link)`
  position: absolute;
  top: 15px;
  left: 15px;
  color: #666;
`;

export default Game;
