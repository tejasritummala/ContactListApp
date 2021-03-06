import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmailIcon from '@material-ui/icons/Email';
import { connect } from 'react-redux';
import { contactAPI } from '../redux/actionCreators';
import { bindActionCreators } from 'redux';

class ContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {}
        }

    }

    componentDidMount() {
        var self = this;
        const { contactAPI } = this.props;
        contactAPI(this.props.match.params.name);
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        console.log(nextProps.data.contactItem.data);
        self.setState({ contact: nextProps.data.contactItem.data });

    }

    handleClick = () => {
        window.open("/", "_self")
    }


    render() {
        return (
            <div className="contactContainer">
                <div className="contactList">
                    {this.state.contact ?
                        <Card className="card">
                            <div className="card-inner">
                                <CardMedia className="userImage"
                                    image={this.state.contact.avatar}
                                    title="Contemplative Reptile"
                                />
                                <div id="avatar">
                                    <Avatar src={this.state.contact.avatar} />
                                </div>
                                <CardContent id="cardContent">
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {this.state.contact.first_name + " " + this.state.contact.last_name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Designer,Cat Lover, Bookworm , Apple Pie fanatic and nature enthusiast
                                    </Typography>
                                </CardContent>
                            </div>
                            <ul className="nav">
                                <li>
                                    <LocationOnIcon></LocationOnIcon>
                                </li>
                                <li> Hungary</li>
                                <li><EmailIcon></EmailIcon></li>
                                <li>
                                    Send Email
                                </li>

                            </ul>
                            <CardActions>
                                <Button className="btnClass" onClick={this.handleClick} variant="contained" color="primary">
                                    Go Back
                               </Button>
                            </CardActions>
                        </Card> : <p>no data</p>}
                </div>
            </div>
        );
    }
}

ContactDetails.propTypes = {

};


const mapStateToProps = (state) => {
    return { data: state }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        contactAPI
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);