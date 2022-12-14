import React from 'react'

const NewsItem = (props) => {


  let { title, description, imageUrl, newsUrl, date, author, source } = props
  return (
    <div>
      <div className="card" style={{ width: '21rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
          <span className="badge rounded-pill bg-danger" >{source}</span>
        </div>
        <img src={!imageUrl ? 'https:i.cbc.ca/1.6506861.1656600185!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_620/cricket-processing-facility.jpg' : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text"><small className="text-danger">by {author} on {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
    </div>
  )

}

export default NewsItem
