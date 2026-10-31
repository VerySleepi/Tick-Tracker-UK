

async function getAllTickSightings() {

    try {
        const response = await fetch("https://dev-task.elancoapps.com/data/tick-sightings");

        if (!response.ok) {
            throw new Error("Could not fetch tick sightings data");
        }

        const data = await response.json();
        let city = [];
        for (const sighting of data) {
            city.push(sighting)
        }
        console.log("Tick sightings data:", city);
        return city;
    }
    catch(error) {
        console.error("Error fetching tick sightings:", error);
    }
}

// fetch("https://dev-task.elancoapps.com/data/tick-sightings")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("Network response was not ok");
//         }
//         return response.json();
//     })
//     .then(data => {
//         for (const sighting of data) {
//             let date = new Date(sighting.date);
//             console.log("Tick sightings data:", date);
//         }
//     })
//     .catch(error => console.error("Error fetching tick sightings:", error));