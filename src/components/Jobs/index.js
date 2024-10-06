import React, {Component} from 'react'
import {useSwipeable} from 'react-swipeable'
import axios from 'axios'

// Your styles here
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
    width: '100%',
    maxWidth: '600px',
    cursor: 'pointer',
  },
  title: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
  },
  detail: {
    fontSize: '1em',
    color: '#555',
    margin: '10px 0',
  },
}

const JobCard = ({job, onBookmark, onDismiss}) => {
  const handlers = useSwipeable({
    onSwipedRight: () => onBookmark(job),
    onSwipedLeft: () => onDismiss(job),
  })

  return (
    <div {...handlers} style={styles.card}>
      <h3 style={styles.title}>{job.title}</h3>
      <p style={styles.detail}>
        <strong>Location:</strong> {job.primary_details?.Place || 'N/A'}
      </p>
      <p style={styles.detail}>
        <strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}
      </p>
    </div>
  )
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
      this.setState({error: 'Failed to fetch jobs', isLoading: false})
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
    console.log(`Job bookmarked: ${job.title}`)
  }

  handleDismiss = job => {
    console.log(`Job dismissed: ${job.title}`)
    // Additional logic to handle dismissal can go here
  }

  render() {
    const {jobs, isLoading, error} = this.state

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (jobs.length === 0) return <p>No jobs available.</p>

    return (
      <div style={styles.container}>
        {jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onBookmark={this.handleBookmark}
            onDismiss={this.handleDismiss}
          />
        ))}
      </div>
    )
  }
}

export default Jobs
