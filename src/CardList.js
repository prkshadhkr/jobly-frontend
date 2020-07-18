import React from 'react';
import Card from './Card';


const CardList = ({ cards = [], apply = () => null}) =>{
    return cards.length ? (
        <div>
            {cards.map ((card, index) =>(
                <Card 
                    index={index}
                    item={card}
                    key={index}
                    apply={apply}
                />
            ))}
        </div>
    ) : (
        <p>Sorry, results not found!</p>
    )
}

export default CardList;