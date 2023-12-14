import DrinkCard from './../../DrinkCard/DrinkCard'

function DrinkCollection ({drinks}) {
    return (
        <div className="d-inline-flex cardRow">
            {drinks && drinks.map((drink) => (
                <DrinkCard drink={drink} />
            ))}
        </div>
    );
}

export default DrinkCollection;