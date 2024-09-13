import React, {Component} from 'react'
import axios from 'axios'

const styles = {
  container: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
  },
  header: {
    paddingBottom: 16,
    borderBottom: '1px solid #ddd',
    marginBottom: 20,
  },
  title: {
    margin: 0,
    fontSize: '1.8em',
    fontWeight: '600',
    color: '#333',
  },
  detailsContainer: {
    padding: '10px 0',
  },
  detail: {
    fontSize: '1em',
    color: '#555',
    margin: '10px 0',
  },
  description: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    whiteSpace: 'pre-wrap', // To handle newline characters in the description
  },
}

class JobDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job: null,
      isLoading: true,
      error: null,
    }
  }

  componentDidMount() {
    const {match} = this.props // Destructure match from props
    const {id} = match.params // Destructure id from match.params
    this.fetchJobDetails(id)
  }

  fetchJobDetails = async id => {
    try {
      const response = await axios.get(
        `https://testapi.getlokalapp.com/common/jobs/${id}`,
      )
      this.setState({
        job: response.data,
        isLoading: false,
      })
    } catch (error) {
      this.setState({
        error: 'Failed to fetch job details',
        isLoading: false,
      })
    }
  }

  render() {
    const {job, isLoading, error} = this.state
    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>
    if (!job) return <p>Job not found.</p>

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>{job.title}</h2>
        </div>
        <div style={styles.detailsContainer}>
          <p style={styles.detail}>
            <strong>Location:</strong> {job.primary_details?.Place || 'N/A'}
          </p>
          <p style={styles.detail}>
            <strong>Salary:</strong> {job.primary_details?.Salary || 'N/A'}
          </p>
          <p style={styles.detail}>
            <strong>Phone:</strong> {job.primary_details?.Phone || 'N/A'}
          </p>
          <p style={styles.detail}>
            <strong>Description:</strong>
          </p>
          <div style={styles.description}>
            {job.content || 'No description available.'}
          </div>
        </div>
      </div>
    )
  }
}
export default JobDetails
