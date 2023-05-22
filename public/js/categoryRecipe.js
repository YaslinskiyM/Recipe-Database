//make post request for recipe to be saved for user
//make post request for recipe to be favorited for user

const $saveBtn = document.getElementById("save");
const $favBtn = document.getElementById("favorite");

$saveBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/api/saved", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recipe_id: $saveBtn.value,
            }),
        });
        if (response.ok) {
            alert("Recipe has been saved");
        } else {
            alert("Failed to save recipe");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
    window.location.reload();
})

$favBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                recipe_id: $favBtn.value,
            }),
        });
        if (response.ok) {
            alert("Recipe has been saved");
        } else {
            alert("Failed to save recipe");
        }
    } catch (error) {
        console.error("Network error:", error);
    }
    window.location.reload();
})