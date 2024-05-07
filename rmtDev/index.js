// --GLOBAL --
const bookmarksBtnEl = document.querySelector('.bookmarks-btn');
const errorEl = document.querySelector('.error');
const errorTextEl = document.querySelector('.error__text');
const jobDetailsEl = document.querySelector('.job-details');
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector('.job-list--bookmarks');
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(".pagination__number--next");
const paginationNumberBackEl = document.querySelector(".pagination__number--back");
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(".sorting__button--relevant");
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

// -- SEARCH COMPONENT --
const submitHandler = event => {
    // Prevent default form submission behavior
    event.preventDefault();
    const searchText = searchInputEl.value;

    // Validate search input (regularexpression)
    const forbiddenPattern = /python/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        errorEl.classList.add("error--visible");
        errorTextEl.textContent = "Python is not allowed!";
        setTimeout(() => {
            errorEl.classList.remove("error--visible");
        }, 3500);
    }

    // Blur search input
    searchInputEl.blur();

    // Clear job list
    jobListSearchEl.innerHTML = "";

    // render spinner
    spinnerSearchEl.classList.add("spinner--visible");

    // Fetch search results
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`)
        .then(response => {
            if (!response.ok) {
                console.log("Error: ", response.status);
                return;
            }
            return response.json();
        })
        .then(data => {
            // Extract job items from data
            const { jobItems } = data;

            // remove spinner
            spinnerSearchEl.classList.remove("spinner--visible");
            // render number of search results
            numberEl.textContent = jobItems.length;

            // render job list
            jobItems.forEach(jobItem => {
                const newJobItemHTML = `
                    <li class="job-item">
                        <a class="job-item__link" href="${jobItem.id}">
                            <div class="job-item__badge">${jobItem.badgeLetters}</div>
                            <div class="job-item__middle">
                                <h3 class="third-heading">${jobItem.title}</h3>
                                <p class="job-item__company">${jobItem.company}</p>
                                <div class="job-item__extras">
                                    <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i> ${jobItem.duration}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                                    <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                                </div>
                            </div>
                            <div class="job-item__right">
                                <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
                                <time class="job-item__time">${jobItem.daysAgo}d</time>
                            </div>
                        </a>
                    </li>
                    `;
                jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
            });
        })
        .catch(error => {
            console.log(`Error: ${error}`);
        });

};

searchFormEl.addEventListener("submit", submitHandler);


