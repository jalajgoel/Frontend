import React,{ Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

class YourCollection extends Component{
	constructor(props){
		super(props);
		this.state={
			bgcolor:''
		}
	}

	change_color(){
		this.setState({bgcolor:true})
	}
	render(){
		return(
		<div className="sidebar1-1">
			<div className="row no_margin yourCollection_Heading">
				<div className="col-sm-8 no_padding padding_left">
					<p className="text no_padding">Your Collection</p>
				</div>
				<div className="col-sm-4 quick-icon">
					<div className="reset" data-toggle="tooltip" data-placement="top" title="Turn Button">
						<img src="../assets/images/sidebar_icons/reset.png" onClick={this.props.toggleMe}/>
					</div>
				</div>
			</div>
			<div className="row no_margin">
				<div className={this.state.bgcolor?"col-sm-6 no_padding yourCollection_data bg_color":"col-sm-6 no_padding yourCollection_data"}>
					<i 
						onClick={this.change_color.bind(this)} 
						className="ico-icon15 yourCollection-icons" 
						aria-hidden="true" 
						data-toggle="tooltip" 
						data-placement="top" 
						title="Bookmarks">
					</i>
					<span className="yourCollection-subtitles">Bookmarks</span>
				</div>
				<div className="col-sm-6 no_padding yourCollection_data">
					<i 
						onClick={this.change_color.bind(this)}
						className="ico-icon20 
						yourCollection-icons" 
						aria-hidden="true" 
						data-toggle="tooltip" 
						data-placement="top" 
						title="Feeds">
					</i>
					<span className="yourCollection-subtitles">Feeds</span>
				</div>
				<div className="col-sm-6 no_padding yourCollection_data">
					<i 
						onClick={this.change_color.bind(this)}
						className="ico-icon37 yourCollection-icons" 
						aria-hidden="true" 
						data-toggle="tooltip" 
						data-placement="top" 
						title="Notes">
					</i>
					<span className="yourCollection-subtitles">Notes</span>
				</div>
				<div className="col-sm-6 no_padding yourCollection_data">
					<i 
						className="ico-icon27 
						yourCollection-icons" 
						aria-hidden="true" 
						data-toggle="tooltip" 
						data-placement="top" 
						title="Highlighs">
					</i>
					<span className="yourCollection-subtitles">Highlighs</span>
				</div>
			</div>
		</div>
		)
	}
}

export default YourCollection;