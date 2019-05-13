import React from 'react';
import { Table, Button } from 'rbx';
import ReactToPrint from 'react-to-print';
import moment from 'moment'
import 'moment/locale/de'  // without this line it didn't work
moment.locale('de')

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
componentDidMount() {
}

  render() {
    const lessons = this.props.lessons;

    return (
        <div>
          <div className='logo'></div>
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
          {lessons.map(lesson => (
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

class PrintLessons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        console.log('Les: ', this.props.lessons)
    }

  render() {
    return (
      <div>
        <ComponentToPrint lessons={this.props.lessons} ref={el => (this.componentRef = el)} />
        <ReactToPrint
          trigger={() => <Button href="#">drucken</Button>}
          content={() => this.componentRef}
          bodyClass='bodyclass'
          pageStyle='pagestyle'
        />
      </div>
    );
  }
}

export  { PrintLessons };