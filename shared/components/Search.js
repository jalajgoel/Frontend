import React, { Component } from 'react';

export default class Search extends Component{

	render(){
		return(
			<form>
	      		<div className="input-group">
			      <input type="text" className="form-control search-input" name="search"  placeholder="Search Topics, Channels, People..." aria-label="Search for..." />
			      <span className="input-group-btn search-icon" data-toggle="tooltip" data-placement="top" title="Search">
			        <input type="submit" className="searchInput-button" value="" />
			      </span>
			    </div>
		    </form>

		)
	}
}
