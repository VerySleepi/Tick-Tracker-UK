fetch("https://dev-task.elancoapps.com/data/tick-sightings")
    .then(response => response.json())
    .then(data => console.log("Tick sightings data:", data))
    .catch(error => console.error("Error fetching tick sightings:", error));