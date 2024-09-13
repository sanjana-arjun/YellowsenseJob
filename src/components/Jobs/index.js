import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const styles = {
  container: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    width: '100%',
    maxWidth: '600px',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
  },
  cardHover: {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.2)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  tag: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: 12,
    fontSize: '0.9em',
  },
  details: {
    margin: 0,
    color: '#555',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  bookmarkButton: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: 5,
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '0.9em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: 10,
  },
  bookmarkButtonHover: {
    backgroundColor: '#0056b3',
  },
}

class Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      page: 1,
      isLoading: false,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchJobs()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  fetchJobs = async () => {
    const {page} = this.state
    this.setState({isLoading: true})
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs?page=${page}`,
      )
      if (Array.isArray(response.data.results)) {
        this.setState(prevState => ({
          jobs: [...prevState.jobs, ...response.data.results],
          isLoading: false,
        }))
      } else {
        throw new Error('Data format error')
      }
    } catch (error) {
      this.setState({
        error: 'Failed to fetch jobs',
        isLoading: false,
      })
    }
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState(prevState => ({page: prevState.page + 1}), this.fetchJobs)
    }
  }

  handleBookmark = job => {
    const {handleBookmark} = this.props
    handleBookmark(job)
  }

  render() {
    const {jobs, isLoading, error, hoveredJobId} = this.state

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (jobs.length === 0) return <p>No jobs available.</p>

    return (
      <div style={styles.container}>
        {jobs.map(job => (
          <div
            key={job.id}
            style={{
              ...styles.card,
              ...(hoveredJobId === job.id ? styles.cardHover : {}),
            }}
            onMouseEnter={() => this.setState({hoveredJobId: job.id})}
            onMouseLeave={() => this.setState({hoveredJobId: null})}
          >
            <Link to={`/job-details/${job.id}`} style={styles.link}>
              <div style={styles.cardHeader}>
                <h3 style={styles.title}>{job.title}</h3>
                <span style={styles.tag}>New</span>
              </div>
              <p style={styles.details}>
                Location: {job.primary_details?.Place || 'N/A'}
              </p>
              <p style={styles.details}>
                Salary: {job.primary_details?.Salary || 'N/A'}
              </p>
            </Link>
            <button
              onClick={() => this.handleBookmark(job)}
              style={styles.bookmarkButton}
            >
              Bookmark
            </button>
          </div>
        ))}
      </div>
    )
  }
}

export default Jobs
