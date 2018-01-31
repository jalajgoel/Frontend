import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';


class TrendingTopics extends Component {
	render() {
		return(
			<div className="sidebar2">
				<div className="row no_margin">
					<div className="col-sm-12 no_padding">
						<div className="row trending-heading no_margin">
							<div className="col-sm-12">
								<p className="text trending_text">Trending Topics</p>
							</div>
						</div>
						<div className="sidebar_content1">
							<div className="trending_input">
								<form>
									<div className="input-group">
										<input type="text" name="trendingSearch" placeholder="Search All Topics" className="form-control trending_search"/>
										<span className="input-group-addon trending_search_icon"><i className="fa fa-search" aria-hidden="true" data-toggle="tooltip" data-placement="top" title="Search Trending Topics"></i></span>
									</div>
								</form>
							</div>
							<ul className="tending_content no_padding no_margin">
								<li className="trending_data">
									<p>#livefood</p>
								</li>
								<li className="trending_data">
									<p>#food</p>
								</li>
								<li className="trending_data">
									<p>#news</p>
								</li>
								<li className="trending_data">
									<p>#channelturkey</p>
								</li>
								<li className="trending_data">
									<p>#colorfashion</p>
								</li>
								<li className="trending_data">
									<p>#livefoood</p>
								</li>
								<li className="trending_data">
									<p>#livefoood</p>
								</li>
								<li className="trending_data">
									<p>#livefoood</p>
								</li>
								<li className="trending_data">
									<p>#livefoood</p>
								</li>
							</ul>	
						</div>
					</div>
				</div>
			</div>	
		)
	}
}

export default TrendingTopics;