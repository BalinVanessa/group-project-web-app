import { useEffect, useState } from "react";
import * as filtersClient from './../Clients/filtersClient.js'

function FilterForm() {
    const [currentFilters, setCurrentFilters] = useState([]);

    const fetchCurrentFilters = async() => {
        const filters = await filtersClient.getCurrentFilters();
        setCurrentFilters(filters);
    }

    useEffect(() => {
        // fetchCurrentFilters();
    });

    const handleLabelClick = (event) => {
        event.stopPropagation();
    };

    const handleAddIngredientFilter = (event) => {
        event.stopPropagation();
    };

    return (
        <form className="dropdown-menu p-4" style={{ width: "300px" }}>
            <div className="mb-3">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="alcoholic-check" />
                    <label className="form-check-label" htmlFor="alcoholic-check" onClick={handleLabelClick}>
                        Alcoholic
                    </label>
                </div>
            </div>
            <div className="mb-3">
                <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="non-alcoholic-check" />
                    <label className="form-check-label" htmlFor="non-alcoholic-check" onClick={handleLabelClick}>
                        Non-Alcoholic
                    </label>
                </div>
            </div>
            <div className="dropdown-divider"></div>
            <h5>Ingredients</h5>
            <div className="mb-3">
                <input type="text" className="form-control w-75 ingred-search" placeholder="Search for ingredients..." />
                <button className="golden-button-small add-ingred-button margin-left-15" onClick={handleAddIngredientFilter}>+</button>
            </div>
            <button className="btn btn-primary">Apply</button>
        </form>
    );
}

export default FilterForm;