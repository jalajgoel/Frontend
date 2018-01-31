import React,{ Component,PropTypes } from 'react';
import Helmet from 'react-helmet';
import QuickCategories from './QuickCategories';
import TrendingTopics from './TrendingTopics';
import Spacetab from './Spacetab';

class Sidebar extends Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div className="expert">
				<QuickCategories/>
	            <TrendingTopics/>
	            <Spacetab/>
	        </div>    
		)
	}
}

export default Sidebar;