import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Input, Table } from 'rbx'
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
                            // .sort(sortByDateAsc)

    return (
      <div>
        {loading && <div>Loading ...</div>}
        <Input type="text" size="medium" value={this.state.search} placeholder="Suche nach Namen oder Personalnummer" color="primary" onChange={this.updateSearch} />
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Heading>Personalnummer</Table.Heading>
              <Table.Heading>Name</Table.Heading>
              <Table.Heading>Video</Table.Heading>
              <Table.Heading>angesehen am</Table.Heading>
            </Table.Row>
          </Table.Head>
          
          <Table.Body>
            {filteredLessons.map(lesson => (
            <Table.Row key={lesson.uid}>
              <Table.Cell>{lesson.personalnummer}</Table.Cell>
              <Table.Cell>{lesson.username || this.props.authUser.email}</Table.Cell>
              <Table.Cell>{lesson.title}</Table.Cell>
              <Table.Cell>
                {
                  moment(new Date(lesson.createdAt.seconds*1000)).format(' D.MM.YYYY, HH:mm') || 'heute'
                }
              </Table.Cell>
            </Table.Row>          
            ))}
          </Table.Body>
        </Table>  
      </div>
    );
  }
}

export default withFirebase(AdminLessons);
