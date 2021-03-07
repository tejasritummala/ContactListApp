import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import EmailIcon from '@material-ui/icons/Email';
import Paper from '@material-ui/core/Paper';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


import { connect } from 'react-redux';
import { contactAPI, saveToLocalStorage } from '../redux/actionCreators';
import { bindActionCreators } from 'redux';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ContactDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            open:false
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

    addToFavourites = () => {
        debugger;
        // const {saveToLocalStorage} = this.props;
        // saveToLocalStorage(this.state.contact)
        var newState;
        if (localStorage.getItem("state"))
            newState = localStorage.getItem("state");
        else
            newState = "[]";

        var Arr = [];
        Arr = JSON.parse(newState);
        var isExist = false
        for (var i = 0; i < Arr.length; i++) {
            if (Arr[i].id === this.state.contact.id) {
                isExist = true;
            }
        }
        if (!isExist) {
            Arr.push(this.state.contact)
        }
        const serializedState = Arr;
        localStorage.setItem("state", JSON.stringify(serializedState));
        this.setState({
            open:true
        })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            open:false
        })
    };

    render() {
        return (
            <div className="contactContainer">
                <div className="contactList">
                    <Paper className="iconCls">
                        <div className="header">
                            <Tooltip title="Go Back" placement="top">
                                <ArrowBackIcon className="arrowBackIcon" onClick={this.handleClick}></ArrowBackIcon>
                            </Tooltip>
                            <Tooltip title="Add to Favorites" placement="top">
                                <FavoriteBorderIcon className="favIcon" onClick={this.addToFavourites}></FavoriteBorderIcon>
                            </Tooltip>
                        </div>
                    </Paper>
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

                        {/* <CardActions>
                                <Button className="btnClass" onClick={this.handleClick} variant="contained" color="primary">
                                    Go Back
                               </Button>
                                <Button className="btnClass" onClick={this.addToFavourites} variant="contained" color="primary">
                                    Favourite
                               </Button>
                            </CardActions> */}
                    </Card>
                </div>
                <Snackbar open={this.state.open} autoHideDuration={3000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                       Successfully Added to Favorites!
                   </Alert>
                </Snackbar>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { data: state }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        contactAPI, saveToLocalStorage
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);