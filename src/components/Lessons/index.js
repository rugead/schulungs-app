import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
// import * as ROUTES from '../../constants/routes';

class LessonsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lessons: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .lessons()
      .onSnapshot(snapshot => {
        let lessons = [];

        snapshot.forEach(doc =>
          lessons.push({ ...doc.data(), uid: doc.id }),
        );

        this.setState({
          lessons,
          loading: false,
        });
      });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { lessons, loading } = this.state;

    return (
      <div>
        <h2>Lessons</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {lessons.map(lesson => (
            <li key={lesson.uid}>
              <span>
                <strong>ID:</strong> {lesson.uid}
              </span>
              <span>
                <strong>Title</strong> {lesson.personalnummer}
              </span>
              <span>
                <strong>Username:</strong> {lesson.username}
                {/* {console.log(new Date(lesson.createdAt.seconds*1000))} */}
              </span>
              <span>
                <strong>Date:</strong> {new Date(lesson.createdAt.seconds*1000).toLocaleDateString('de-DE', )}
                {/* {console.log(new Date(lesson.createdAt.seconds*1000))} */}
              </span>
              <span>
                <strong>Time:</strong> {new Date(lesson.createdAt.seconds*1000).toLocaleTimeString('de-DE', )}
                {/* {console.log(new Date(lesson.createdAt.seconds*1000))} */}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(LessonsList);
