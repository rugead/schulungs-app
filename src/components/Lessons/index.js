import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { List, Title } from 'rbx'
import moment from 'moment'
import 'moment/locale/de'  // without this line it didn't work
moment.locale('de')

class LessonsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lessons: [],
      props: {},
      authUser: null,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .lessons()
      .where('userId', '==', this.props.authUser.uid)
      .orderBy("createdAt", "desc")
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
        <Title subtitle>Sie haben bereits folgende Schulungen absolviert: </Title>
        {loading && <div>Loading ...</div>}
        <List>
          {lessons.map(lesson => (
            <List.Item key={lesson.uid}>
              Video: {lesson.title} | 
              Personalnummer: {lesson.personalnummer} |
              Name: {lesson.username || this.props.authUser.email} |
              angesehen am:            
                {
                  moment(new Date(lesson.createdAt.seconds*1000)).format(' D.MM.YYYY, HH:mm') || 'heute'
                }
            </List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default withFirebase(LessonsList);
