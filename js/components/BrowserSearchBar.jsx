import React, {Component} from 'react';
import {Col, FormControl, FormGroup, Glyphicon, Button} from 'react-bootstrap';

class BrowserSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.filterAvailableGames = this.filterAvailableGames.bind(this);
  }

  updateSearchTerm(e) {
    this.setState({
      searchTerm: e.target.value,
    });
  }

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
