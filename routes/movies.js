const express = require('express')
const MoviesService = require('../services/movies')


/*function moviesApi(app) {
	const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();
    console.log('entro')


	router.get('/', async(req, res, next) => {

		const { tags } = req.query // Se saca del query de la ruta localhost:8080/api/movies?

		try {
			const movies = await moviesService.getMovies({ tags }) // se envia los tags

			res.status(200).json({
				data: movies,
				message: 'movies listed'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.get('/:movieId', async(req, res, next) => {

		const { movieId } = req.params // Se saca de los parametros de la ruta localhost:8080/api/movies/2

		try {
			const movie = await moviesService.getMovie({ movieId })

			res.status(200).json({
				data: movie,
				message: 'movie read'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.post('/', async(req, res, next) => {

		const { body: movie } = req

		try {
			const createMoviesId = await moviesService.createMovie({ movie })

			res.status(201).json({
				data: createMoviesId,
				message: 'movie create'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.put('/:movieId', async(req, res, next) => {

		const { movieId } = req.params
		const { body: movie } = req

		try {
			const updatedMovieId = await moviesService.updateMovie({ movieId, movie })

			res.status(200).json({
				data: updatedMovieId,
				message: 'movie update'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.patch('/:movieId', async(req, res, next) => {

		const { movieId } = rq.params
		const { body: movie } = req
		try {
			const partialUpdatedMovie = await moviesService.partialUpdatedMovie({ movieId, movie })

			res.status(200).json({
				data: partialUpdatedMovie,
				message: 'movie update'
			})
		} catch(err) {
			next(err.message)
		}
	})

	router.delete('/:movieId', async(req, res, next) => {

		const { movieId } = req.params

		try {
			const deleteMovieId = await moviesService.deleteMovie({ movieId })

			res.status(200).json({
				data: deleteMovieId,
				message: 'movie deleted'
			})
		} catch(err) {
			next(err.message)
		}
	})
}*/

function moviesApi(app) {
    const router = express.Router();
    app.use('/api/movies', router);

    const moviesService = new MoviesService();

    router.get('/', async (req, res, next) => {
        const { tags } = req.query;
        try {
            const movies = await moviesService.getMovies({ tags });
            res.status(200).json({
                data: movies,
                message: "movies listed"
            })
        }
        catch (e) {
            next(e)
        }
    });

    router.get('/:IdMovie', async (req, res, next) => {
        const { IdMovie } = req.params;
        try {
            const movies = await moviesService.getMovie({ IdMovie })
            res.status(200).json({
                data: movies,
                message: "movies find"
            })
        }
        catch (e) {
            next(e)
        }
    });

    router.post('/', async (req, res, next) => {
        const { body: movie } = req;
        try {
            const createdMovie = await moviesService.createMovie({ movie });
            res.status(201).json({
                data: createdMovie,
                message: "movie  created"
            })
        }
        catch (e) {
            next(e)
        }
    });

    router.put('/:IdMovie', async (req, res, next) => {
        const { IdMovie } = req.params;
        const { body: movie } = req;
        try {
            const updatedMovie = await moviesService.updateMovie({ IdMovie, movie })
            res.status(200).json({
                data: updatedMovie,
                message: "movie updated"
            })
        }
        catch (e) {
            next(e)
        }
    });

    router.delete('/:IdMovie', async (req, res, next) => {
        const { IdMovie } = req.params;
        try {
            console.log(IdMovie);
            const deleteMovie = await moviesService.deleteMovie({ IdMovie })
            res.status(200).json({
                data: deleteMovie,
                message: "movie deleted"
            })
        }
        catch (e) {
            next(e)
        }
    });
}



module.exports = moviesApi