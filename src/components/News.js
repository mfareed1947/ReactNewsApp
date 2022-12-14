import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {

  const captilize = (string) => {
    return string?.charAt(0)?.toUpperCase() + string?.slice(1);
  }

  const [articles, setArticles] = useState([])
  const [laoding, setLaoding] = useState(false)
  const [page, setPage] = useState(1)
  const [totalresults, setTotalResults] = useState(0)


  // document.title = `${captilize(props.category)} News Gorilla`;



  const updateNews = async () => {
    props.setProgress(0);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    console.log(parsedData)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLaoding(false)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  },[])



  const fetchMoreData = async () => {
    setPage(page + 1)
    let url = ` https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLaoding(false)
  }

  return (
    <>
      <h1 className='text-center' style={{ margin: '30px',marginTop:'90px' }}>News Gorilla {captilize(props.category)} Top Headlines</h1>
      {laoding && <Spinner />}
      <InfiniteScroll
        dataLength={articles?.length}
        next={fetchMoreData}
        hasMore={articles !== totalresults}
        loader={<Spinner />}
      >
        <div className="container">

          <div className="row">
            {articles?.map((ele) => {
              return <div className="col md-4" key={ele.url}>
                <NewsItem title={ele.title} description={ele.description} imageUrl={ele.urlToImage} newsUrl={ele.url} date={ele.publishedAt} author={ele.author} source={ele.source.name} />
              </div>

            })}
          </div>
        </div>
      </InfiniteScroll>
    </>

  )
}

News.defaultProps = {
  country: 'us',
  pageSize: 6
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number
}

export default News