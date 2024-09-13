import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom'
import Jobs from './components/Jobs'
import Bookmarks from './components/Bookmarks'
import JobDetails from './components/JobDetails'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: '"Roboto", sans-serif',
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 20px',
    background: '#007bff',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px 20px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  navLinkActive: {
    backgroundColor: '#0056b3',
  },
  main: {
    flex: 1,
    padding: '20px',
    background: '#f8f9fa',
  },
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeSection: 'jobs',
      bookmarks: [],
    }
  }

  componentDidMount() {
    const storedBookmarks = localStorage.getItem('bookmarks')
    if (storedBookmarks) {
      this.setState({bookmarks: JSON.parse(storedBookmarks)})
    }
  }

  handleBookmark = job => {
    this.setState(prevState => {
      const existingBookmarks = new Set(prevState.bookmarks.map(bm => bm.id))
      if (!existingBookmarks.has(job.id)) {
        const updatedBookmarks = [...prevState.bookmarks, job]
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
        return {bookmarks: updatedBookmarks}
      }
      return prevState // No change if the job is already bookmarked
    })
  }

  render() {
    const {bookmarks} = this.state
    return (
      <Router>
        <div style={styles.container}>
          <nav style={styles.nav}>
            <Link to="/jobs" style={styles.navLink}>
              Jobs
            </Link>
            <Link to="/bookmarks" style={styles.navLink}>
              Bookmarks
            </Link>
          </nav>
          <main style={styles.main}>
            <Switch>
              <Route
                path="/jobs"
                render={() => <Jobs handleBookmark={this.handleBookmark} />}
              />
              <Route
                path="/bookmarks"
                render={() => (
                  <Bookmarks
                    initialBookmarks={bookmarks}
                    onBookmarksChange={this.handleBookmarksChange}
                  />
                )}
              />
              <Route
                path="/job-details/:id"
                render={props => <JobDetails {...props} />}
              />
              <Route exact path="/" render={() => <Redirect to="/jobs" />} />
            </Switch>
          </main>
        </div>
      </Router>
    )
  }
}
export default App
