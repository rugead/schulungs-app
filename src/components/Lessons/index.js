import React, { Component } from 'react';
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import { withAuthorization, withEmailVerification } from '../Session'
import { AuthUserContext } from '../Session';
 
class LessonsList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      loading: false,
      lessons: [],
      authUser: null
    };
  }
  
  componentDidMount() {
    this.setState({ loading: true });
    console.log('props: ', this.props);
    // const userId = this.props.firebase.auth
    console.log('userId: ', this.state.authUser);

    this.unsubscribe = this.props.firebase
      .lessons().where('personalnummer', '==',  '1111')
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
  xxx = (authUser) => {
    this.setState({authUser: authUser})
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { lessons, loading } = this.state;
   
    const { xxx } = this
    return (
      <AuthUserContext.Consumer>
      {authUser => (
     
      <div>
        <h2>Lessons</h2>
        {loading && <div>Loading ...</div>}
        { xxx(authUser) }
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
      )}
      </AuthUserContext.Consumer>
    );
  }
}


const condition = authUser => !!authUser;

// export default withFirebase(LessonsList);

export default compose(
  withFirebase,
  withEmailVerification,
  withAuthorization(condition),
)(LessonsList);