import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Input } from 'rbx';
import { PrintLessons } from './PrintLessons.js';
import moment from 'moment'
import 'moment/locale/de'  // without this line it didn't work
moment.locale('de')

class AdminLessons extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      lessons: [],
      props: {},
      authUser: null,
      search: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.unsubscribe = this.props.firebase
      .lessons()
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

  updateSearch = (ev) => this.setState({ search: ev.target.value})

  render() {
    const { lessons, loading } = this.state;
    const sortByDateAsc = (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    // const sortByPersonalnummerDesc = (a,b) => a.personalnummer - b.personalnummer
    // const sortByPersonalnummerAsc = (a,b) => b.personalnummer - a.personalnummer

    let filteredLessons = lessons
      .filter(lesson => lesson.username.concat(lesson.personalnummer).toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
      .sort(sortByDateAsc)

    return (
      <div>
        {loading && <div>Loading ...</div>}
        <Input type="text" size="medium" value={this.state.search} placeholder="Suche nach Namen oder Personalnummer" color="primary" onChange={this.updateSearch} />
        <PrintLessons lessons={filteredLessons} />
      </div>
    );
  }
}


export default withFirebase(AdminLessons);
