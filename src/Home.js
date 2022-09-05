import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      query: "", 
      hits: [] 
    };
  }

  onChange = event => {
    this.setState({ query: event.target.value });
  };

  onSearch = event => {
    event.preventDefault();

    const { query } = this.state;

    if (query === '') {
      return;
    }

    const cachedHits = localStorage.getItem(query);
    

    if (cachedHits) {
      this.setState({ hits: JSON.parse(cachedHits) });
      console.log(cachedHits)
    } else {
      fetch('https://hn.algolia.com/api/v1/search?query=' + query)
        .then(response => response.json())
        .then(result => this.onSetResult(result, query));
    }
  };

  onSetResult = (result, key) => {
    localStorage.setItem(key, JSON.stringify(result.hits));
    this.setState({ hits: result.hits });
  };

  render() {
    return (
      <div>
        <h1>Search Hacker News with Local Storage</h1>
        
        <form onSubmit={this.onSearch}>
          <input type="text" onChange={this.onChange} />
          <button type="submit">Search</button>
        </form>

        
        {
          this.state.hits.map((item) => {
            return(
              <div key={item.objectID}>
                {item.title}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Home;
