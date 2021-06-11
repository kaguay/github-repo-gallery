//div where profile information will appear
const overview = document.querySelector(".overview");
//unordered list to display the repos list
const repoList = document.querySelector(".repo-list");
//section where repo information appears
const repoInfoSection = document.querySelector(".repos");
//section where individual repo data appears
const individualRepoInfo = document.querySelector(".repo-data");
//button to go back to global repo gallery
const backToGallery = document.querySelector(".view-repos");
//select input with "search by name" 
const filterInput = document.querySelector(".filter-repos");

const username = "kaguay";

//Fetch API JSON Data
const getProfileInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(res);
    //Call the Display Function & View Your Project
    displayFetchedInfo(data);
};

getProfileInfo();

//Fetch & Display User Information
const displayFetchedInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `
    <figure>
     <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
    `;

    overview.append(div);
    fetchRepos();
};

//Fetch Your Repos
const fetchRepos = async function () {
    const getRepo = await fetch (`https://api.github.com/users/${username}/repos?sort=newest&per_page=100`);
    const repoData = await getRepo.json();
    //console.log(repoData);
    displayRepoInfo(repoData);
};

//Display Info About Your Repos
const displayRepoInfo = function (repoData) {
    filterInput.classList.remove("hide");
    for (const repo of repoData) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

//Add a Click Event
    repoList.addEventListener ("click", function (e) {
        if (e.target.matches("h3")) {
            const repoName = e.target.innerText;
            getSpecificInfo(repoName);
        }
    });

    //Create a Function to Get Specific Repo Info
    const getSpecificInfo = async function (repoName) {
        const fetchInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
        const repoInfo = await fetchInfo.json();
        //console.log(repoInfo);

    //Create an Array of Languages
       //Get Languages
        const fetchLanguages = await fetch (repoInfo.languages_url);
        const languageData = await fetchLanguages.json();
        //console.log(languageData);

        //Add each language to an empty array
        const languages = [];
        for (const language in languageData) {
            languages.push(language);
        }

        displaySpecificRepoInfo(repoInfo, languages);

    };

    //Create a Function to Display Specific Repo Info
    const displaySpecificRepoInfo = function (repoInfo, languages) {
        individualRepoInfo.innerHTML= "";
        individualRepoInfo.classList.remove("hide");
        repoInfoSection.classList.add("hide");
        backToGallery.classList.remove("hide");
        const newElement = document.createElement("div");
        newElement.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        individualRepoInfo.append(newElement);

    };
 
backToGallery.addEventListener("click", function () {
    repoInfoSection.classList.remove("hide");
    individualRepoInfo.classList.add("hide");
    backToGallery.classList.add("hide");

} )

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const searchLowercase = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowercase = repo.innerText.toLowerCase();
        if (repoLowercase.includes(searchLowercase)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});