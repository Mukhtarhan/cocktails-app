import {Link} from 'react-router-dom'

const Home = () => {
    return(
        <div className="container">
            <div className="banner-container">
                <div className="banner">
                    <p>Let's check out a range of drinks, from classic cocktails to trendy mocktails. Cheers to discovering new favourites!</p>

                    <Link to={`/drinks`}>
                        <div className="btn">
                            View Cocktails
                        </div>
                    </Link>
                    

                </div>
            </div>

        </div>
    )
}

export default Home