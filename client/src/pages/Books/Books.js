import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

class Books extends Component {
  state = {
    UserId:1,
    Cuisine:"",
    Title: "",
    imageURL:"",
    InstructionURL:"",
    Ingredients:""
    
  };

  componentDidMount() {
    console.log("calling load recipes");
    this.loadRecipes();
  }

// loadRecipes = () => {
//    API.getRecipes()
//      .then(res => {
//        this.setState({ ...this.state, recipes: res.data})
//      })
//      .catch(err => console.log(err));
//  };
  loadRecipes = () => {
    console.log("Loading Recipes");
    API.getBooks()
      .then(res => {
       this.setState({ ...this.state, books: res.data})
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log("in submit");
    if (this.state.Title && this.state.Cuisine) {
      API.saveBook({
        UserId: this.state.UserId,
        Cuisine: this.state.Cuisine,
        Title: this.state.Title,
        imageURL:this.state.imageURL,
        InstructionURL: this.state.InstructionURL,                
        Ingredients: this.state.Ingredients
      })
        .then(res => this.loadRecipes())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>I have a Yummy and healhty recipe to share</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.Cuisine}
                onChange={this.handleInputChange}
                name="Cuisine"
                placeholder="Cuisine (required)"
              />
              <Input
                value={this.state.Title}
                onChange={this.handleInputChange}
                name="Title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.imageURL}
                onChange={this.handleInputChange}
                name="imageURL"
                placeholder="imageURL (required)"
              />
              <Input
                value={this.state.InstructionURL}
                onChange={this.handleInputChange}
                name="InstructionURL"
                placeholder="InstructionURL (required)"
              />
              <TextArea
                value={this.state.Ingredients}
                onChange={this.handleInputChange}
                name="Ingredients"
                placeholder="Ingredients (required)"
              />
              <FormBtn
                disabled={!(this.state.Cuisine && this.state.Title)}
                onClick={this.handleFormSubmit}
              >
                Submit Recipe
              </FormBtn>
            </form>
          </Col>

          <Col size="md-6">
            <Jumbotron>
              <h1>My available recipes</h1>
            </Jumbotron>
            {this.state.books ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.Title} || {book.Cuisine}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
