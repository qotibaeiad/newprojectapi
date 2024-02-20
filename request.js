function getSelectedValue() {
  // Get the dropdown button element
  var dropdownButton = document.getElementById("hs-dropdown-hover-event");

  // Get the currently selected value
  var selectedValue = dropdownButton.textContent.trim();

  // Log or return the selected value
  console.log("Selected Value: ", selectedValue);
  // return selectedValue; // uncomment this line if you want to return the value from the function
}




function toggleFavorite(i) {
  checkfavorite[i] = !checkfavorite[i];
  updateStarIcon(i);
}

var checkfavorite = [];
function updateStarIcon(i) {
  // Get the star icon element
  var starIcon = document.getElementById("staricon" + i);

  // Update the SVG content based on the checkfavorite value
  if (checkfavorite[i]) {
    starIcon.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="absolute bottom-4 right-4 h-6 w-6 text-blue-500 dark:text-white star-icon">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" fill="blue"></path>
      </svg>
    `;
  } else {
    starIcon.innerHTML = `
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" class="absolute bottom-4 right-4 h-6 w-6 text-blue-500 dark:text-white star-icon">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 2l2.308 7.426h7.383l-5.955 4.573L16.693 22 12 17.456 7.307 22l1.266-7.001L2 9.426h7.383L12 2z" />
      </svg>
    `;
  }
}

function fetchAndDisplayArticles(category) {
  document.getElementById('loadingSpinner').classList.remove('hidden');
  fetch(`https://tailwindserverweb.onrender.com/api/data?category=${category}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('loadingSpinner').classList.add('hidden');
      const articlesContainer = document.getElementById('gridid');

      // Clear existing content in the container
      articlesContainer.innerHTML = '';

      // Check if articles exist
      if (data.articles && data.articles.length > 0) {
        checkfavorite = new Array(data.articles.length); // Creates an array with length 5, all elements are initially undefined
        // Loop through articles and create HTML elements
        data.articles.forEach((article, i) => {
          if (article.title && article.description && article.urlToImage) {
          const articleElement = document.createElement('div');
          articleElement.innerHTML = `
          <div class="hover:scale-90 mb-6 flex flex-wrap transform shadow-lg transition-transform duration-300 ease-in-out text-black dark:text-wight mt-16 mb-16 p-6">
            <div class="mb-6 ml-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-3/12">
              <div class="relative mb-6 overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-lg dark:shadow-black/20" data-te-ripple-init data-te-ripple-color="light">
                <img src="${article.urlToImage}" onclick="" class="lg:w-full" alt="Louvre" />
              </div>
            </div>
                          
              <div class="mb-6 mr-auto w-full shrink-0 grow-0 basis-auto px-3 md:mb-0 md:w-9/12 xl:w-7/12">
                <h5 class="mb-3 text-lg font-bold text-black dark:text-white" onclick="" >${article.title}</h5>
                <div class="mb-3 flex items-center justify-center text-sm font-medium text-black dark:text-white md:justify-start">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="mr-2 h-5 w-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                  News
                </div>
                <p class="mb-6 text-black dark:text-white">
                  <small>Published <u>${article.publishedAt}</u></small>
                </p>
                <p class="text-black dark:text-white">
                  ${article.description}
                </p>
                <a href="#!" class="star-link" id="starlink${i}" onclick="toggleFavorite(${i})">
                  <div id="staricon${i}" class="star-icon"></div>
                </a>
              </div>
            </div>
          `;
          
          articlesContainer.appendChild(articleElement);
          updateStarIcon(i); // Update star icon initially
        }
        });
      } else {
        const articlesContainer = document.getElementById('gridid');

        // Handle case when no articles are available
        articlesContainer.innerHTML = '<p>No articles available</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      const articlesContainer = document.getElementById('gridid');
      articlesContainer.innerHTML = '<p>Error fetching articles</p>';
    });
}

function checkUser(username, password) {
  const apiUrl = `https://tailwindserverweb.onrender.com/api/login?username=${username}&password=${password}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        return true
        // Perform actions after successful authentication (e.g., redirect, display content)
      } else {
        // Authentication failed
        return false
        // Handle authentication failure (e.g., display an error message)
      }
    })
    .catch(error => {
      console.error('Error during login request:', error);
      // Handle other errors (e.g., network issues)
    });
}

function checkLogin() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  if(username==null||password==null){
    alert('enter usernmae or password');
    return;
  }
  if (checkUser(username,password)) {
    loadPage('home')
  } else {
    alert('Incorrect username or password');
  }
}

fetchAndDisplayArticles('general');
