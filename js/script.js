//div where profile information will appear
const overview = document.querySelector(".overview");
//unordered list to display the repos list
const displayRepoList = document.querySelector(".repo-list");
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
    for (const repo of repoData) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        displayRepoList.append(repoItem);
    }

};