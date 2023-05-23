const deleteFavorite = document.querySelectorAll(".deleteFavorite");
const deleteSaved = document.querySelectorAll(".deleteSave");
// console.log(deleteFavorite);
// console.log(deleteSaved);


if(deleteSaved){
	for (let i = 0; i < deleteSaved.length; i++) {
		deleteSaved[i].addEventListener("click", async (event) => {
			event.preventDefault();
			try {
				const response = await fetch("/api/saved", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: deleteSaved[i].value,
						//user_id: deleteSaved.name,
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
	}
}

if (deleteFavorite) {
	for (let i = 0; i < deleteFavorite.length; i++) {
		deleteFavorite[i].addEventListener("click", async (event) => {
			event.preventDefault();
			try {
				const response = await fetch("/api/favorites", {
					method: "DELETE",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: deleteFavorite[i].value,
						//user_id: deleteSaved.name,
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
	}

}
