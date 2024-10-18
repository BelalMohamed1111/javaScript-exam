$(document).ready(function () {
  $('#menuBtn').click(function () {
    $('#navContainer').addClass('nav-expanded');
    $('#menuBtn').hide();
    $('#closeBtn').show();

    $('.nav-link').each(function (index) {
      $(this).delay(index * 150).queue(function (next) {
        $(this).removeClass('nav-link-hide').addClass('nav-link-appear');
        next();
      });
    });
  });

  $('#closeBtn').click(function () {
    closeNavMenu();
  });

  function closeNavMenu() {
    $('#navContainer').removeClass('nav-expanded');
    $('#closeBtn').hide();
    $('#menuBtn').show();

    $('.nav-link').removeClass('nav-link-appear').addClass('nav-link-hide');
  }

  $('.nav-link').click(function () {
    closeNavMenu();
  });

$('#areaLink').click(function () {
  $('#mealsSection').hide();
  $('#searchSection').addClass('d-none'); 
  $('#mealDetails').remove(); 

  fetchAreas();
});

function fetchAreas() {
  $.ajax({
    url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list', 
    method: 'GET',
    success: function (data) {
      displayAreas(data.meals); 
    },
    error: function (error) {
      console.log('Error fetching areas:', error);
    }
  });
}


function displayAreas(areas) {
  const mealsContainer = $('#mealsContainer');
  mealsContainer.empty(); 

  if (areas) {
    areas.forEach(area => {
      mealsContainer.append(`
        <div class="col-lg-3 mb-4">
          <div class="card position-relative overflow-hidden area-card">
            <div class="overlay d-flex align-items-end">
              <span class="meal-name">${area.strArea}</span>
            </div>
          </div>
        </div>
      `);
    });
  } else {
    mealsContainer.append('<p>No areas found.</p>');
  }
}


$('#ingredientsLink').click(function () {
  $('#mealsSection').hide(); 
  $('#searchSection').addClass('d-none');


  $('#mealDetails').remove();


  fetchIngredients();
});


function fetchIngredients() {
  $.ajax({
      url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
      method: 'GET',
      success: function (data) {
          displayIngredients(data.meals);
      },
      error: function (error) {
          console.log('Error fetching ingredients:', error);
      }
  });
}

function displayIngredients(ingredients) {
  const mealsContainer = $('#mealsContainer');
  mealsContainer.empty(); 

  if (ingredients) {
      ingredients.forEach(ingredient => {
          mealsContainer.append(`
              <div class="col-lg-3 mb-4 text-center">
                  <div class="ingredient-card">
                      <i class="fa-solid fa-drumstick-bite fa-3x"></i>
                      <h5>${ingredient.strIngredient}</h5>
                      <p>${ingredient.strDescription || "No description available."}</p>
                  </div>
              </div>
          `);
      });
  } else {
      mealsContainer.append('<p>No ingredients found.</p>');
  }
}


$('#contactUsLink').click(function () {
  $('.content-section').hide(); 
  showContactForm(); 
});

function showContactForm() {
  $('div').not('#contactForm').remove(); 

  const contactFormHtml = `
      <div id="contactForm" class="contact-form d-flex justify-content-center align-items-center" style="height: 100vh;">
          <form>
              <div class="row mb-3">
                  <div class="col">
                      <input type="text" class="form-control" placeholder="Name" required>
                  </div>
                  <div class="col">
                      <input type="email" class="form-control" placeholder="Email" required>
                  </div>
              </div>
              <div class="row mb-3">
                  <div class="col">
                      <input type="tel" class="form-control" placeholder="Phone" required>
                  </div>
                  <div class="col">
                      <input type="number" class="form-control" placeholder="Age" required>
                  </div>
              </div>
              <div class="row mb-3">
                  <div class="col">
                      <input type="password" class="form-control" placeholder="Password" required>
                  </div>
                  <div class="col">
                      <input type="password" class="form-control" placeholder="Re-enter Password" required>
                  </div>
              </div>
              <button type="submit" class="btn btn-danger">Submit</button>
          </form>
      </div>
  `;


  $('body').append(contactFormHtml); 
}


function centerForm() {
  const form = $('#contactForm');
  form.css({
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '1000',
      width: '300px',
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
  });
}


  fetchMeals();


  function fetchMeals() {
    $.ajax({
      url: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      method: 'GET',
      success: function (data) {
        displayMeals(data.meals);
      },
      error: function (error) {
        console.log('Error fetching meals:', error);
      }
    });
  }

  function displayMeals(meals) {
    const mealsContainer = $('#mealsContainer');
    mealsContainer.empty();

    if (meals) {
      meals.forEach(meal => {
        mealsContainer.append(`
          <div class="col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden meal-card" data-id="${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top">
              <div class="overlay d-flex align-items-end">
                <span class="meal-name">${meal.strMeal}</span>
              </div>
            </div>
          </div>
        `);
      });

      $('.meal-card').on('click', function () {
        const mealId = $(this).data('id');
        showMealDetails(mealId);
      });
    } else {
      mealsContainer.append('<p>No meals found.</p>');
    }
  }


  function showMealDetails(mealId) {
    $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
      method: 'GET',
      success: function (data) {
        const meal = data.meals[0];
        $('#mealsSection').hide(); 
        $('#searchSection').addClass('d-none'); 

        const mealDetails = `
          <div class="container" id="mealDetails">
            <div class="row">
              <div class="col-lg-4">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <h2>${meal.strMeal}</h2>
              </div>
              <div class="col-lg-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <span><h2>Area: ${meal.strArea}</h2></span>
                <span><h2>Category: ${meal.strCategory}</h2></span>
                <h2>Ingredients:</h2>
                <div class="ingredient-buttons">${getIngredientButtons(meal)}</div>
                <h2>Tags:</h2>
                <div class="tag-buttons">${getTagButtons(meal.strTags)}</div>
                <div class="meal-links mt-3">
                ${getSourceAndVideoButtons(meal.strSource, meal.strYoutube)}
                </div>
              </div>
            </div>
          </div>
        `;
        $('#mealsSection').after(mealDetails); 
      },
      error: function (error) {
        console.log('Error fetching meal details:', error);
      }
    });
  }

  $('#searchLink').click(function () {
    $('#mealsSection').hide();
    $('#searchSection').removeClass('d-none'); 
    $('#searchSection').empty();


    $('#mealDetails').remove(); 

    $('#searchSection').append(`
      <div class="row mt-4">
        <div class="col-md-6 mb-2">
          <input type="text" id="mealName" class="form-control" placeholder="Search meals by name">
        </div>
        <div class="col-md-6 mb-2">
          <input type="text" id="mealFirstLetter" class="form-control" placeholder="Search meals by first letter">
        </div>
      </div>
      <div id="searchResults" class="row"></div>
    `);

  
    $('#mealName').on('input', function () {
      const name = $(this).val();
      searchMealsByName(name);
    });

    $('#mealFirstLetter').on('input', function () {
      const firstLetter = $(this).val();
      searchMealsByFirstLetter(firstLetter);
    });
  });

  function searchMealsByName(name) {
    if (name) {
      $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
        method: 'GET',
        success: function (data) {
          displaySearchResults(data.meals);
        },
        error: function (error) {
          console.log('Error fetching meals:', error);
        }
      });
    } else {
      $('#searchResults').empty();
    }
  }

  function searchMealsByFirstLetter(firstLetter) {
    if (firstLetter.length === 1) {
      $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`,
        method: 'GET',
        success: function (data) {
          displaySearchResults(data.meals);
        },
        error: function (error) {
          console.log('Error fetching meals:', error);
        }
      });
    } else {
      $('#searchResults').empty();
    }
  }

  function displaySearchResults(meals) {
    const searchResultsContainer = $('#searchResults');
    searchResultsContainer.empty(); 

    if (meals) {
      meals.forEach(meal => {
        searchResultsContainer.append(`
          <div class="col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden meal-card" data-id="${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top">
              <div class="overlay d-flex align-items-end">
                <span class="meal-name">${meal.strMeal}</span>
              </div>
            </div>
          </div>
        `);
      });

     
      $('.meal-card').on('click', function () {
        const mealId = $(this).data('id');
        showMealDetails(mealId);
      });
    } else {
      searchResultsContainer.append('<p>No meals found.</p>');
    }
  }

 
  fetchCategories();


  function fetchCategories() {
    $.ajax({
      url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
      method: 'GET',
      success: function (data) {
        displayCategories(data.categories);
      },
      error: function (error) {
        console.log('Error fetching categories:', error);
      }
    });
  }


  function fetchMealsByCategory(category) {
    $.ajax({
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      method: 'GET',
      success: function (data) {
        displayMeals(data.meals);
      },
      error: function (error) {
        console.log('Error fetching meals by category:', error);
      }
    });
  }


  $('#categoriesLink').click(function () {
    $('#mealsSection').hide();
    $('#searchSection').addClass('d-none'); 


    $('#mealDetails').remove(); 


    fetchCategories();
  });


  function displayCategories(categories) {
    const mealsContainer = $('#mealsContainer');
    mealsContainer.empty();

    if (categories) {
      categories.forEach(category => {
        mealsContainer.append(`
          <div class="col-lg-3 mb-4">
            <div class="card position-relative overflow-hidden category-card" data-category="${category.strCategory}">
              <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="card-img-top">
              <div class="overlay d-flex align-items-end">
                <span class="category-name">${category.strCategory}</span>
                <p class="category-description">${category.strCategoryDescription}</p>
              </div>
            </div>
          </div>
        `);
      });

      $('.category-card').on('click', function () {
        const category = $(this).data('category');
        fetchMealsByCategory(category);
      });
    } else {
      mealsContainer.append('<p>No categories found.</p>');
    }
  }

  function getIngredientButtons(meal) {
    let buttons = '';
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient) {
        buttons += `<button class="btn btn-info m-1">${ingredient} - ${measure}</button>`;
      }
    }
    return buttons;
  }

  function getTagButtons(tags) {
    if (!tags) return '';
    return tags.split(',').map(tag => `<button class="btn btn-warning m-1">${tag}</button>`).join('');
  }

  function getSourceAndVideoButtons(source, video) {
    let buttons = '';
    if (source) {
      buttons += `<a href="${source}" target="_blank" class="btn btn-success m-1">Source</a>`;
    }
    if (video) {
      buttons += `<a href="${video}" target="_blank" class="btn btn-danger m-1">Video</a>`;
    }
    return buttons;
  }

  

});
