document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postsList = document.getElementById("posts-list");

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await response.json();

        posts.forEach(post => {
            const div = document.createElement("div");
            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button onclick="toggleComments(${post.id})">ดูความคิดเห็น</button>
                <div id="comments-${post.id}" style="display:none;"></div>
            `;
            postsList.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});

async function toggleComments(postId) {
    const commentsDiv = document.getElementById(`comments-${postId}`);
    
    if (commentsDiv.style.display === "none") {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const comments = await response.json();
            commentsDiv.innerHTML = comments.map(c => `<p><strong>${c.name}:</strong> ${c.body}</p>`).join("");
            commentsDiv.style.display = "block";
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    } else {
        commentsDiv.style.display = "none";
    }
}
