$("#navBtn").click(slider)
function slider() {
    let navPosition = $(".side-nav").offset().left
    console.log(navPosition)
    if (navPosition === -250) {
        $(".side-nav").animate({ left: 0 }, 500)
        $("#navBtn").removeClass('fa-sliders')
        $("#navBtn").addClass('fa-xmark')
        for (var i = 0; i < 5; i++) {
            $(".nav-menu a").eq(i).animate({
                top: 0
            }, (i + 5) * 100)
        }
    } else {
        $(".side-nav").animate({
            left: -250
        }, 500)
        $("#navBtn").removeClass('fa-xmark')
        $("#navBtn").addClass('fa-sliders')
        for (var i = 0; i < 5; i++) {
            $(".nav-menu a").eq(i).animate({
                top: 250
            }, 500)
        }
    }
}

$(document).ready(() => {
    displayMeals().then(() => {
        $(".loading").fadeOut(500)
        $("body").css("overflow", "visible")
    })

})

async function getMeals(count) {
    let meals = []
    for (i = 0; i < count; i++) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        meals.push(data.meals[i])
    }
    return meals
}

async function displayMeals(meals) {
    meals = await getMeals(20);
    var cartona = ``
    for (i = 0; i < meals.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
        document.getElementById('data').innerHTML = cartona
    }

}

async function getDetails(id) {
    $(".loading").fadeIn(500)
    let meals = await getMeals(20);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json();
    const meal = data.meals[0]
    console.log(meal)
    let Recipes = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            Recipes += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    var cartona = ``
    cartona += `
                <div class="col-md-4 text-white">
                    <img src="${meal.strMealThumb}"" class="rounded">
                    <h3 >${meal.strMeal}</h3>
                </div>
                <div class="col-md-8 text-white">
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h3><span class="fw-bold">Area</span> : ${meal.strArea}</h3>
                    <h3><span class="fw-bold">Category</span> : ${meal.strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${Recipes}
                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        <li class="alert alert-danger m-2 p-1">${meal.strTags}</li>
                    </ul>
                    <a rel="noopener" target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                    <a rel="noopener" target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
                </div>`
    document.getElementById('data').innerHTML = cartona
    $(".loading").fadeOut(500)
}

function search() {
    var cartona = `
    <div class="col-md-6">
        <input type="text" placeholder="Search By Name" class="form-control bg-transparent text-white" onkeyup="searchByName(this.value)" id="searchByName">
    </div>
    <div class="col-md-6">
        <input type="text" placeholder="Search By First Letter" class="form-control bg-transparent text-white" onkeyup="searchByFirstLetter(this.value)" id="firstLetter" maxlength="1">
    </div>
`;
    document.getElementById('place-input').innerHTML = cartona;
    document.getElementById('data').innerHTML = ""
}

$('#search').click(function () {
    search()
    slider()
})

async function searchByName(inputValue) {
    console.log(inputValue)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    const data = await response.json()
    const meal = data.meals
    console.log(meal)
    var cartona = ``
    for (i = 0; i < meal.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meal[i].idMeal})">
                    <img src="${meal[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    document.getElementById('data').innerHTML = cartona
}

async function searchByFirstLetter(inputValue) {
    console.log(inputValue)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`)
    const data = await response.json()
    const meal = data.meals
    console.log(meal)
    var cartona = ``
    for (i = 0; i < meal.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meal[i].idMeal})">
                    <img src="${meal[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
        document.getElementById('data').innerHTML = cartona
    }
}

async function displayCategories() {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data = await response.json()
    const mealCategories = data.categories
    console.log(mealCategories)
    var cartona = ``
    for (i = 0; i < mealCategories.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="meal" onclick="filterByC('${mealCategories[i].strCategory}')" >
                    <img src="${mealCategories[i].strCategoryThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded text-center">
                        <h3 class="">${mealCategories[i].strCategory}</h3>
                        <p class="">${mealCategories[i].strCategoryDescription}</p>
                    </div>
                </div>
            </div>
        `
    }
    document.getElementById('data').innerHTML = cartona
    document.getElementById('place-input').innerHTML = ""
    $(".loading").fadeOut(500)
}

$("#categories").click(function () {
    displayCategories()
    slider()
})

async function filterByC(strCategory) {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`)
    const data = await response.json()
    const meals = data.meals
    console.log(meals)
    var cartona = ``
    for (i = 0; i < meals.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    document.getElementById('data').innerHTML = cartona
    $(".loading").fadeOut(500)
}

async function displayArea() {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    const data = await response.json()
    const mealArea = data.meals
    console.log(mealArea)
    var cartona = ``
    for (i = 0; i < mealArea.length; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="meal" onclick="filterByA('${mealArea[i].strArea}')" >
                        <div class="w-100 rounded d-flex flex-column justify-content-center align-items-center text-white">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <h3 class="my-3">${mealArea[i].strArea}</h3>
                        </div>
                </div>
            </div>
        `
    }
    document.getElementById('data').innerHTML = cartona
    document.getElementById('place-input').innerHTML = ""
    $(".loading").fadeOut(500)
}

$("#area").click(function () {
    displayArea()
    slider()
})

async function filterByA(strArea) {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${strArea}`)
    const data = await response.json()
    const meals = data.meals
    console.log(meals)
    var cartona = ``
    for (i = 0; i < meals.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    document.getElementById('data').innerHTML = cartona
    $(".loading").fadeOut(500)
}

async function displayIngredients() {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    const data = await response.json()
    const mealIngredients = data.meals
    console.log(mealIngredients)
    var cartona = ``
    for (i = 0; i < 25; i++) {
        cartona += `
            <div class="col-md-3">
                <div class="meal" onclick="filterByI('${mealIngredients[i].strIngredient}')" >
                        <div class="text-center w-100 rounded d-flex flex-column justify-content-center align-items-center text-white">
                            <i class="fa-solid fa-drumstick-bite"></i>
                            <h3 class="my-3">${mealIngredients[i].strIngredient}</h3>
                            <p>${mealIngredients[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                        </div>
                </div>
            </div>
        `
    }
    document.getElementById('data').innerHTML = cartona
    document.getElementById('place-input').innerHTML = ""
    $(".loading").fadeOut(500)
}

$("#ingredients").click(function () {
    displayIngredients()
    slider()
})

async function filterByI(strIngredient) {
    $(".loading").fadeIn(500)
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`)
    const data = await response.json()
    const meals = data.meals
    console.log(meals)
    var cartona = ``
    for (i = 0; i < meals.length; i++) {
        cartona +=
            `<div class="col-md-3">
                <div class="meal" onclick="getDetails(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" alt="" class="rounded">
                    <div class="layer w-100 rounded d-flex align-items-center">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>`
    }
    document.getElementById('data').innerHTML = cartona
    $(".loading").fadeOut(500)
}

function validateName(inputValue) {
    const namePattern = /^[A-Za-z\s]+$/;
    if (namePattern.test(inputValue)) {
        $("#nameValidation").removeClass('d-block')
        $("#nameValidation").addClass('d-none')
    } else {
        $("#nameValidation").removeClass('d-none')
        $("#nameValidation").addClass('d-block')
    }
}

function validateEmail(inputValue) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(inputValue)) {
        $("#emailValidation").removeClass('d-block')
        $("#emailValidation").addClass('d-none')
    } else {
        $("#emailValidation").removeClass('d-none')
        $("#emailValidation").addClass('d-block')
    }
}

function validatePhone(inputValue) {
    const phonePattern = /^(010|011|012|015)\d{8}$/;
    if (phonePattern.test(inputValue)) {
        $("#phoneValidation").removeClass('d-block')
        $("#phoneValidation").addClass('d-none')
    } else {
        $("#phoneValidation").removeClass('d-none')
        $("#phoneValidation").addClass('d-block')
    }
}

function validateAge(inputValue) {
    let age = parseInt(inputValue)
    console.log(age)
    if (age >= 16 && age <= 100) {
        $("#ageValidation").removeClass('d-block')
        $("#ageValidation").addClass('d-none')
    } else {
        $("#ageValidation").removeClass('d-none')
        $("#ageValidation").addClass('d-block')
    }
}

function validatePassword(inputValue) {
    const password = inputValue
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (passwordPattern.test(password)) {
        $("#passwordValidation").removeClass('d-block')
        $("#passwordValidation").addClass('d-none')
    } else {
        $("#passwordValidation").removeClass('d-none')
        $("#passwordValidation").addClass('d-block')
    }
}

function validateRepassword(inputValue) {
    const repassword = inputValue
    const password = $("#password").val();
    console.log(password)
    if (repassword === password) {
        $("#repasswordValidation").removeClass('d-block')
        $("#repasswordValidation").addClass('d-none')
    } else {
        $("#repasswordValidation").removeClass('d-none')
        $("#repasswordValidation").addClass('d-block')
    }
}

function displayForm() {
    var cartona = `
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Name" class="form-control bg-transparent text-black" id="name" onkeyup="validateName(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="nameValidation">Special characters and numbers not allowed</div>
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Email" class="form-control bg-transparent text-black" onkeyup="validateEmail(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="emailValidation">Email not valid *exemple@yyy.zzz</div>
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Phone" class="form-control bg-transparent text-black" onkeyup="validatePhone(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="phoneValidation">Enter valid Phone Number</div>
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Age" class="form-control bg-transparent text-black" onkeyup="validateAge(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="ageValidation">Enter valid age</div>
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Enter Your Password" class="form-control bg-transparent text-black" id="password" onkeyup="validatePassword(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="passwordValidation">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Repassword" class="form-control bg-transparent text-black" id="repassword" onkeyup="validateRepassword(this.value)">
                    <div class="alert alert-danger w-100 mt-2 d-none text-center" id="repasswordValidation">Enter valid repassword</div>
                </div>
                <div class="col-md-12 mt-4 d-flex justify-content-center">
                    <button class="btn btn-outline-danger">Submit</button>
                </div>
`;
    document.getElementById('place-input').innerHTML = "";
    document.getElementById('data').innerHTML = cartona
}

$("#contactUs").click(function () {
    displayForm()
    slider()
})