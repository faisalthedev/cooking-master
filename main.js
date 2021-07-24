const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();

	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
		.then((res) => res.json())
		.then((data) => {
			const meals = data.meals;
			let mealUI = "";

			meals.forEach((meal) => {
				mealUI += `
          <div class="col">
            <div class="card h-100 shadow text-center">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
              </div>
            </div>
          </div>
        `;
			});

			searchResult.innerHTML = mealUI;
		});
});
