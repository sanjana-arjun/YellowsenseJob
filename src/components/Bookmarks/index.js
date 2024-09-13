import React, {Component} from 'react'

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    minHeight: 'calc(100vh - 60px)', // To fill the remaining vertical space
  },
  noBookmarks: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
    marginTop: '20px',
  },
  card: {
    padding: 20,
    margin: '10px auto',
    maxWidth: '600px',
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: 5,
    backgroundColor: '#dc3545', // Red for remove
    color: '#fff',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    marginTop: 10,
  },
  title: {
    margin: '0 0 10px',
    fontSize: '1.6em',
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Roboto',
  },
  detail: {
    fontSize: '16px',
    color: '#555',
    margin: '5px 0',
  },
}

class Bookmarks extends Component {
  constructor(props) {
    super(props)
    const {initialBookmarks} = props
    this.state = {
      bookmarks: initialBookmarks || [],
    }
  }

  componentDidUpdate(prevProps) {
    const {initialBookmarks} = this.props // Destructure props here
    if (prevProps.initialBookmarks !== initialBookmarks) {
      this.setState({bookmarks: initialBookmarks})
    }
  }

  removeBookmark = id => {
    const {bookmarks} = this.state
    this.setState(
      prevState => ({
        bookmarks: prevState.bookmarks.filter(bookmark => bookmark.id !== id),
      }),
      () => {
        const {onBookmarksChange} = this.props // Destructure props here
        if (onBookmarksChange) {
          onBookmarksChange(bookmarks)
        }
      },
    )
  }

  getUniqueBookmarks = bookmarks => {
    const unique = new Map()
    bookmarks.forEach(item => unique.set(item.id, item))
    return Array.from(unique.values())
  }

  render() {
    const {bookmarks} = this.state
    const uniqueBookmarks = this.getUniqueBookmarks(bookmarks)

    if (uniqueBookmarks.length === 0) {
      return <p style={styles.noBookmarks}>No jobs bookmarked yet.</p>
    }

    return (
      <div style={styles.container}>
        {uniqueBookmarks.map(job => (
          <div key={job.id} style={styles.card}>
            <h3 style={styles.title}>{job.title}</h3>
            <p style={styles.detail}>
              <strong>Location:</strong> {job.primary_details?.Place || 'N/A'}
            </p>
            <p style={styles.detail}>
              <strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}
            </p>
            <button
              onClick={() => this.removeBookmark(job.id)}
              style={styles.button}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )
  }
}
export default Bookmarks
