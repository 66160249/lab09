document.addEventListener("DOMContentLoaded", async () => {
    const userList = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        users.forEach(user => {
            const div = document.createElement("div");
            div.innerHTML = `<p><a href="user-detail.html?id=${user.id}">${user.name}</a></p>`;
            userList.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});
