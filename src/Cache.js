import React, { useState, useEffect } from 'react';

export default function Cache() {
    const [user, setUser] = useState()
    
    const handleChange = (e) => {
        setUser(e.target.value);
    }

    const searchBox = (e) => {
        e.preventDefault();

        const { query } = user;

        if (query === '') {
        return;
        }
    }
    const cachedHits = localStorage.getItem(user);
    const loadData = async() => {
      await fetch('https://hn.algolia.com/api/v1/search?query=' + user)
              .then(response => response.json())
              .then(result => this.onSetResult(result, user));
    }
    useEffect(() => {
        if (cachedHits) {
            setUser({ hits: JSON.parse(cachedHits) });
          } else {
            loadData()
        }
    })
  return (
    <div>
        <h1>Search Hacker News with Local Storage</h1>
        <p>
          There shouldn't be a second network request, when you search
          for a keyword twice.
        </p>

        <form onSubmit={searchBox}>
            <input
                type='text'
                value={user}
                onChange={handleChange}/>

            <button>Search</button>
        </form>
    </div>
  )
}
