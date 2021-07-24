const searchBtn = document.getElementById("searchBtn");
const searchResult = document.getElementById("searchResult");
const searchInput = document.getElementById("searchInput");
const mealList = document.getElementById("mealList");
const singleMeal = document.getElementById("singleMeal");
const singleMealCard = document.getElementById("singleMealCard");

// Hide default area
singleMeal.style.display = "none";
mealList.style.display = "block";

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();

	fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`)
		.then((res) => res.json())
		.then((data) => {
			const meals = data.meals;
			let mealUI = "";

			if (meals !== null) {
				meals.forEach((meal) => {
					mealUI += `
          <div class="col" onclick="showSingleMeal('${meal.idMeal}')">
            <div class="card h-100 shadow text-center">
              <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" />
              <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
              </div>
            </div>
          </div>
        `;
				});
			} else {
				mealUI = `<p class="text-center text-danger">No result found! Search again...</p>`;
				searchInput.value = "";
			}

			searchResult.innerHTML = mealUI;
		});
});

function showSingleMeal(mealId) {
	// Show hide area
	mealList.style.display = "none";
	singleMeal.style.display = "block";

	const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
	fetch(url)
		.then((res) => res.json())
		.then((mealData) => {
			const singleMealInfo = mealData.meals[0];

			let singleMealUI = `
        <div class="card">
          <img src="${singleMealInfo.strMealThumb}" class="card-img-top" alt="${singleMealInfo.strMeal}" />
          <div class="card-body">
            <h5 class="card-title">${singleMealInfo.strMeal}</h5>
            <p class="card-text">
              <ol id="ingredientList">
                <li>${singleMealInfo.strIngredient1}</li>
                <li>${singleMealInfo.strIngredient2}</li>
                <li>${singleMealInfo.strIngredient3}</li>
                <li>${singleMealInfo.strIngredient4}</li>
                <li>${singleMealInfo.strIngredient5}</li>
                <li>${singleMealInfo.strIngredient6}</li>
                <li>${singleMealInfo.strIngredient7}</li>
                <li>${singleMealInfo.strIngredient8}</li>
              </ol>
            </p>
          </div>
        </div>
      `;

			singleMealCard.innerHTML = singleMealUI;
		});
}
