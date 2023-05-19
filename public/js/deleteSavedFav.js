const $deleteFavorite = document.getElementById("deleteFav");
const $deleteSaved = document.getElementById("deleteSave");

$deleteSaved.addEventListener("click", async (event) => {
	event.preventDefault();
	try {
		const response = await fetch("/api/saved", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: $deleteSaved.value,
				//user_id: $deleteSaved.name,
			}),
		});
		if (response.ok) {
			alert("Recipe has been deleted");
		} else {
			alert("Failed to delete recipe");
		}
	} catch (error) {
		console.error("Network error:", error);
	}
	window.location.reload();
});

$deleteFavorite.addEventListener("click", async (event) => {
	event.preventDefault();
	try {
		const response = await fetch("/api/favorites", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: $deleteFavorite.value,
				//user_id: $deleteSaved.name,
			}),
		});
		if (response.ok) {
			alert("Recipe has been deleted");
		} else {
			alert("Failed to delete recipe");
		}
	} catch (error) {
		console.error("Network error:", error);
	}
	window.location.reload();
});
