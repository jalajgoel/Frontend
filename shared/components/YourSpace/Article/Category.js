import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Cookies from 'universal-cookie';
import Dropdown from 'react-dropdown';
import { getQuickCategories_Data } from '../../../actions/quickCategories_action';

class Category extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.fetchCategory();
	}

	detectChange(value){
  	if(this.props.Category.viewquickCategories_Data.result){
  		if(this.props.Category.viewquickCategories_Data.result.length > 0) {
  			var selectedData = this.props.Category.viewquickCategories_Data.result.filter((data) => {
  				return value.value == data.title
  			});
  			localStorage.setItem("category_data",JSON.stringify(selectedData))
  		}
  	}
  }	

	render() {
		var array = [];
	  	if(this.props.Category.viewquickCategories_Data.result){
	  		if(this.props.Category.viewquickCategories_Data.result.length > 0) {
	  			const my = this;
	  			var map = this.props.Category.viewquickCategories_Data.result.map((data) => {
	  				var categoryTitle = data.title;
	  				var newarray = 
	  					{
	  						value: categoryTitle,
	  						label: categoryTitle,
	  					};
	  				array = array.concat(newarray);
	  			});
	  		}
	  	}
		return(
			<div className="parentSection">
	        <div className="childSection1 sub-header">
	          <h6>Select Category <span> * </span></h6>
	        </div>
	        <div className="childsection2">
	          	<Dropdown
	                className="category dropdown"
	                options={array}
	                placeholder="Category Select"
	                onChange= {this.detectChange.bind(this)}
	           	/>
	        </div>
	      </div>
		);
	}
}

function mapStateToProps(state) {
  const Category = state;
  return { Category };
}

function mapDispatchToProps(dispatch, props) {
  return {
  	fetchCategory: () => {
    	dispatch(getQuickCategories_Data())
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Category);


