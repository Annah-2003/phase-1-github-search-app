document.addEventListener('DOMContentLoaded', () => {
    const githubForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');

    // Function to display user search results
    function displayUsers(users) {
        userList.innerHTML = ''; // Clear previous results
        users.forEach((user) => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}">
                <h3>${user.login}</h3>
                <a href="${user.html_url}" target="_blank">View Profile</a>
            `;
            userList.appendChild(userItem);

            // Add a click event listener to fetch and display user repositories
            userItem.addEventListener('click', () => {
                fetchUserRepositories(user.login);
            });
        });
    }

    // Function to fetch user repositories
    async function fetchUserRepositories(username) {
        // Make a request to the User Repos Endpoint
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repositories = await response.json();
        displayRepositories(repositories);
    }

    // Function to display user repositories
    function displayRepositories(repositories) {
        reposList.innerHTML = ''; // Clear previous results
        repositories.forEach((repo) => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || 'No description available'}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            reposList.appendChild(repoItem);
        });
    }

    // Event listener for form submission
    githubForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;

        // Make a request to the GitHub User Search Endpoint
        const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
        const userData = await response.json();
        const users = userData.items;
        displayUsers(users);
    });
});
