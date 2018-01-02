import React from 'react';

class FilmInfo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            movieID: 106646,
            movies: false,
            placeholder: " ",
        }
    }

    componentDidMount(){
        let url = `https://api.themoviedb.org/3/movie/${this.state.movieID}?api_key=dc10a74e3b456f7ea1ca583b9da65d68`;
        fetch(url).then(resp => resp.json()).then(data =>
            this.setState({
                title: data.original_title,
                overview: data.overview,
                vote: data.vote_average,
                poster:`https://image.tmdb.org/t/p/w500${data.poster_path}`,
                runtime: data.runtime,
                date: data.release_date,
                language: data.original_language
        }));
    }


    handleChange = (event) => {
        let url = `https://api.themoviedb.org/3/search/movie?query=%${event.target.value}&api_key=dc10a74e3b456f7ea1ca583b9da65d68`;
        fetch(url).then(resp => resp.json()).then(data => this.setState({movies: data.results}))
    };

    fetchNewMovie(movieID) {
        if(this.state.movies) {
            let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=dc10a74e3b456f7ea1ca583b9da65d68`;
            fetch(url).then(resp => resp.json()).then(data =>
                this.setState({
                    movieID,
                    title: data.original_title,
                    overview: data.overview,
                    vote: data.vote_average,
                    poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
                    runtime: data.runtime,
                    date: data.release_date,
                    language: data.original_language,
                }));
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        if(!this.state.movies && this.state.movies[0].id === undefined){
            this.setState({
                placeholder: "Not found"
            })
        } else {
            let movies = this.state.movies;
            this.fetchNewMovie(movies[0].id);
            this.setState({
                placeholder: " "
            })
        }
    };

    render(){
        if(this.state.movieID) {
            return (
                <div>
                    <header className="col-xl-12 row">
                    <form className="input-group col-xl-12" onSubmit={this.handleClick}>
                        <input onChange={this.handleChange} placeholder="Search Movie Title..." className="form-control col-10"/>
                        <input type="submit" value="Search" className="btn btn-dark col-2"/>
                    </form>
                        <p>{this.state.placeholder}</p>
                    </header>
                    <div className="row main col-xl-12">
                        <div key={this.state.movieID} className="image row col-xl-6">
                            <img src={this.state.poster}/>
                        </div>
                        <div className="col-xl-6 col-md-12" style={{after: {content: 'witam'}}}>
                            <h3 className="col-xl-12">{this.state.title}</h3>
                            <p className="col-xl-12 overview">{this.state.overview}</p>
                        <div className="row col-xl-12">
                            <p className="col-xl-6 smaller">Release date: </p>
                            <p className="col-xl-6 info">{this.state.date}</p>

                        </div>
                        <div className="row col-xl-12">
                            <p className="col-xl-6 smaller">Vote Average: </p>
                            <p className="col-xl-6 info">{this.state.vote}/10</p>
                        </div>
                        <div className="row col-xl-12">
                            <p className="col-xl-6 smaller">Runtime: </p>
                            <p className="col-xl-6 info">{this.state.runtime} mins</p>
                        </div>
                        <div className="row col-xl-12">
                            <p className="col-xl-6 smaller">Original language: </p>
                            <p className="col-xl-6 info">{this.state.language}</p>
                        </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

export default FilmInfo
