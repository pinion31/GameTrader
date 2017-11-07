import React, {Component} from 'react';
import {Col, FormControl, FormGroup, Glyphicon, Button} from 'react-bootstrap';

/**
  SearchBar Component to filter out available games based on name of game
*/
export class BrowserSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.filterAvailableGames = this.filterAvailableGames.bind(this);
  }

  /**
   * keeps searchTerm state updated as user enters search input
   * @param e - onChange event object passed from form
   * @return No return
   */
  updateSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  /**
   * function wrapper that calls prop func, fetchGames passed from parent (GameBrowser)
   * fetchGames filters out games using regex from this.state.searchTerm
   * filterAvailableGames is called when user clicks search button rendered on this component
   * @param (indirect) this.state.searchTerm- String used to as regex to filter out games
   * @return No return
   */
  filterAvailableGames() {
    this.props.fetchGames(this.state.searchTerm);
  }

  render() {
    return (
      <div className="nav-search">
        <Button bsStyle="primary" onClick={this.filterAvailableGames}><Glyphicon glyph="search" /></Button>
        <Col sm={10} xs={10} md={10}>
          <FormGroup>
            <FormControl
              onChange={this.updateSearchTerm}
              name="name"
              type="text"
              placeholder="Search Games"
            />
          </FormGroup>
        </Col>
      </div>
    );
  }
}

export default BrowserSearchBar;
