const movieTitle = document.querySelector(".movie-tilte");
const moviePoster = document.querySelector(".movie-poster");
const movieType = document.querySelector(".movie-type");
const movieReleaseDate = document.querySelector(".movie-date");
const movieOverview = document.querySelector(".movie-overview");
const movieOverviewContainer = document.querySelector(
	".movie-overview-container"
);
const daysLeft = document.querySelector(".days-left");
const nextMovie = document.querySelector(".next-movie");
const lastMovie = document.querySelector(".last-movie");
let movieData = [];
let resNo = 0;
let half = 1;
const fetchApi = (date) => {
	console.log(`https://www.whenisthenextmcufilm.com/api?date=${date}`);
	fetch(`https://www.whenisthenextmcufilm.com/api?date=${date}`)
		.then((res) => res.json())
		.then((data) => {
			movieData.push(data);
			console.log(movieData);
			movieTitle.textContent = data.title;
			movieOverview.textContent = data.overview;
			movieReleaseDate.textContent = data.release_date;
			moviePoster.src = data.poster_url;
			movieType.textContent = data.type;
			daysLeft.textContent = `${data.days_until} Days`;
		})
		.catch((err) => console.log(err));
};

window.onload = () => {
	console.log("Welcome");
	fetchApi(new Date().toISOString().slice(0, 10));

	nextMovie.addEventListener("click", () => {
		if (
			Object.keys(movieData[resNo].following_production).length !== 0
		) {
			if (half === 1) {
				movieTitle.textContent = movieData[resNo].following_production.title;
				movieOverview.textContent =
					movieData[resNo].following_production.overview;
				movieReleaseDate.textContent =
					movieData[resNo].following_production.release_date;
				moviePoster.src = movieData[resNo].following_production.poster_url;
				movieType.textContent = movieData[resNo].following_production.type;
				daysLeft.textContent = `${movieData[resNo].following_production.days_until} Days`;
				half = 2;
			} else {
				fetchApi(
					new Date(movieData[resNo].following_production.release_date)
						.toISOString()
						.slice(0, 10)
				);
				half = 1;
				++resNo;
			}
		} else {
			fetchApi(
				new Date(movieData[resNo].release_date).toISOString().slice(0, 10)
			);
			half = 1;
			++resNo;
		}
	});
	// lastMovie.addEventListener("click", () => {
	// 	if (
	// 		Object.keys(movieData[resNo].following_production).length !== 0 &&
	// 		half === 1
	// 	) {
	// 		if (half === 1) {
	// 			movieTitle.textContent = movieData[resNo].following_production.title;
	// 			movieOverview.textContent =
	// 				movieData[resNo].following_production.overview;
	// 			movieReleaseDate.textContent =
	// 				movieData[resNo].following_production.release_date;
	// 			moviePoster.src = movieData[resNo].following_production.poster_url;
	// 			movieType.textContent = movieData[resNo].following_production.type;
	// 			daysLeft.textContent = `${movieData[resNo].following_production.days_until} Days`;
	// 			half = 2;
	// 		} else {
	// 			fetchApi(
	// 				new Date(movieData[resNo].following_production.release_date)
	// 					.toISOString()
	// 					.slice(0, 10)
	// 			);
	// 			half = 1;
	// 			++resNo;
	// 		}
	// 	} else {
	// 		fetchApi(
	// 			new Date(movieData[resNo].release_date).toISOString().slice(0, 10)
	// 		);
	// 		half = 1;
	// 		++resNo;
	// 	}
	// });
};
