import React, { Component } from 'react';

import './App.css';
import { Button } from 'reactstrap';
import {Card, Col, Row, Form, FormGroup, Label, Input,Table } from 'reactstrap';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name:"",
      Designation:"",
      location:"",
      postStatus:"",
      deletestatus:'',
      data:[],
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(){
    var data={
      "Name": this.state.name,
      "Designation": this.state.Designation,
      "Location": this.state.location,
        }
    fetch("http://localhost:55773/api/PostEmployee",{
      method: 'POST',
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
      body: data
      // JSON.stringify(data)
    }).then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({postStatus:body})
      });
     })
    console.log(this.state);
    
  }
  delete(id){
    fetch("http://localhost:55773/api/DeleteEmployee?id="+id,{
      method: 'DELETE',
      headers:{'Content-Type': 'application/json',
                'Accept': 'application/json'
              }}).then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({deletestatus:body})
      });
     })

  }
  componentWillMount(){
    fetch("http://localhost:55773/api/GetEmployees").then(Response=>{            
      Response.json().then(body=>{ 
        this.setState({data:body})
      });
     })

  }
  handleChange(event) {
    this.setState({
        [event.target.id]: event.target.value
      });
    }
  render() {
    
    return (
     <div>
      <Card className='cardt'>
          <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="name">name</Label>
                <Input type="text" name="name" id="name" placeholder="Abhishek gupta" onChange={this.handleChange}/>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="Designation">Designation</Label>
                <Input type="text" name="Designation" id="Designation" placeholder="Full stack developer"onChange={this.handleChange} />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="location">location</Label>
            <Input type="text" name="location" id="location" placeholder="delhi devnagar"onChange={this.handleChange}/>
          </FormGroup>     
          <Button onClick={this.submit}>submit</Button>
          {this.state.postStatus==="Updated"?(<div>succsefully updated</div>):""}
        </Form>
    </Card>
    <Card className='cardt'>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Designation</th>
            <th>location</th>
          </tr>
        </thead>
        <tbody>
            {this.state.data.map((prop)=>{
              return(
                <tr>
                  <td>{prop.ID}</td>
                  <td>{prop.Name}</td>
                  <td>{prop.Designation}</td>
                  <td>{prop.Location}</td>
                  <td ><Button color="danger" onClick={this.delete(prop.ID)}>Delete</Button></td>
                </tr>
              )
            })}
         
        </tbody>
      </Table>
    </Card>
    </div>
    );
  }
}

export default App;
