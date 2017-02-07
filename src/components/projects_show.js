import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchProject } from '../actions'

class ProjectsShow extends Component {
  componentWillMount() {
    this.props.fetchProject(this.props.params.id);
  }

  render() {
    const { project } = this.props

    if(!project) {
      return <div>Loading '{this.props.params.id}' ...</div>
    }

    return (
      <div>
        <p><strong>Name:</strong> {project.name}</p>
        <p><strong>Slug:</strong> {project.slug}</p>
        <p><strong>Roles:</strong> {project.roles.map((role) => role.name).join(', ')}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { project: state.projects.project }
}


export default connect(mapStateToProps, { fetchProject })(ProjectsShow)
