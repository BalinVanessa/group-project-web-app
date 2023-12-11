import {IoClose} from "react-icons/io5";

function IngredientFilterTag ({ingredient, deleteIngredient, isInForm}) {
    const handleDeleteIngredient = () => {
        deleteIngredient(ingredient);
    }

    return (
        <div className="d-flex align-items-center">
            <span className={`filter-pill-text ${isInForm ? "filter-pill-form-spacing" : "filter-pill-main-spacing"}`}>{ingredient}</span>
            <button type="button" className={`delete-filter-btn ${isInForm ? "filter-pill-form-spacing" : "filter-pill-main-spacing"}`} onClick={handleDeleteIngredient}><IoClose style={{marginBottom: "2px"}}/></button>
        </div>
    );
}

export default IngredientFilterTag;