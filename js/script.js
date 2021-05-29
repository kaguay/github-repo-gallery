//div where profile information will appear
const overview = document.querySelector(".overview");
const username = "kaguay";

//Fetch API JSON Data
const getProfileInfo = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(res);
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
};
