import React from 'react';
import styled from "styled-components";

const Item = ({item, purchasedItems}) => {
    const handleClick = e => {
        console.log('Hey there');
    }
    
    return (
        <ItemContainer onClick={handleClick}>
            <ItemInfo>
                <div style={{marginTop: 10}}>
                    <h1 style={{marginRight: "100%"}}>{item.name}</h1>
                    <ItemProductionDescription>{`Cost: ${item.cost} cookie(s). Produces ${item.value} cookie(s)/second`}</ItemProductionDescription>
                </div>
                <ItemOwnedCount>
                    {purchasedItems[item.id]}
                </ItemOwnedCount>
            </ItemInfo>
        </ItemContainer>
    );
}

// ↓From https://css-tricks.com/overriding-default-button-styles/↓
const ItemContainer = styled.button`
    display: inline-block;
    border: none;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    background: transparent;
    color: #ffffff;
    font-family: sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
    transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;


    &button:hover,
    button:focus {
        background: #0053ba;
    }

    &button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    &button:active {
        transform: scale(0.99);
    }
`;
// ↑From https://css-tricks.com/overriding-default-button-styles/↑

const ItemInfo = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid darkgrey;
`;

const ItemOwnedCount = styled.div`
    margin-left: 70px;
    margin-right: 20px;
    font-size: 2.5em;
    align-self: center;
`;

const ItemProductionDescription = styled.p`
    color: darkgrey;
    margin-bottom: 20px;
`;

export default Item;