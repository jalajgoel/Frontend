// to create routes ----demo home file

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Switch from 'react-router-dom/Switch';
import Route from 'react-router-dom/Route';
import Helmet from 'react-helmet';
import ContentCard from './ContentCard';
import Header from './Header';
import Sidebar from './Sidebar';
import ParentLogin from './ParentLogin';
import config from '../../config';

class Home extends Component {



	render(){
		return(
		<div>
			<div className="col-sm-2 no_padding">
            	<Sidebar/>
          	</div>
         	<div className="col-xs-10 no_padding">
            	<div className="row no_margin">
            		<Switch>

              			<Route exact path="/" render={(props) =>(<ContentCard 
                                                          component={ContentCard}  
                                                          layout3={this.state.showLayoutOf3} 
                                                          layout4={this.state.showLayoutOf4} 
                                                          like={this.state.likeSort} 
                                                          trend={this.state.trendSort} /> ) } />
              			<Route  path="/login" component={ParentLogin} />
            		</Switch>
            	</div>
          	</div>
        </div>




			)
	}




}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(Home)