import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';

class Movies extends React.Component {
  render() {
    return (
      <div style={{ display: 'inline-block' }}>
        {this.props.moviesData.map((element) =>
          <Card style={{ width: '18rem' }}>
            <Card.Img
              variant='top'
              src={element.image_url}
              alt={element.title}
              style={{ height: '20rem' }}
            />

            <Card.Body>
              <Card.Title>{element.title}</Card.Title>
              <Card.Text>Avg Votes: {element.average_votes}</Card.Text>
              <Card.Text>Total Votes: {element.total_votes}</Card.Text>
              <Card.Text>Popularity: {element.popularity}</Card.Text>
              <Card.Text>Released on: {element.released_on}</Card.Text>
            </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}
export default Movies;