import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import FavoriteBorderIcon from '@material-ui/icons/Favorite';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { contactListAPI } from '../redux/actionCreators';
import { bindActionCreators } from 'redux';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxData: [],
            sortOrder: ""
        }
    }

    componentDidMount() {
        var self = this;
        const { contactListAPI } = this.props;
        contactListAPI();
    }

    componentWillReceiveProps(nextProps) {
        var self = this;
        console.log(nextProps.data.contactList.data);
        self.setState({ inboxData: nextProps.data.contactList.data });
    }

    handleClick = contactID => () => {
        window.open("/users/" + contactID, "_self")
    }

    handleChange = (event) => {
        this.setState({ sortOrder: event.target.value });
        var sortedData = this.state.inboxData.sort((a, b) => {
            if (a.first_name < b.first_name) { return -1 }
            if (a.first_name > b.first_name) { return 1 }
            return 0
        })
        if (event.target.value === "Descending") {
            sortedData.reverse();
        }
        this.setState({ inboxData: sortedData });
    };

    onIconClick = (event) =>{
        window.open("/favorites" , "_self")
    }


    render() {
        return (
            <div className="container">
                <div className="contactList">
                    <div className="header">
                        <FormControl className="formControl">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.sortOrder}
                                onChange={this.handleChange}
                            >
                                <MenuItem value="Ascending">Ascending</MenuItem>
                                <MenuItem value="Descending">Descending</MenuItem>
                            </Select>
                        </FormControl>
                        <Tooltip title="Go to Favourites Page" placement="top">
                            <FavoriteBorderIcon onClick={this.onIconClick}></FavoriteBorderIcon>
                        </Tooltip>
                    </div>
                    <List id="listDiv">
                        {
                            this.state.inboxData.map((data) => (
                                <Paper key={data.id} onClick={this.handleClick(data.id)}>
                                    <ListItem key={data.id} alignItems="flex-start" className="contactListItem">
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={data.avatar} />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={data.first_name + " " + data.last_name}
                                            secondary={data.email}
                                        />
                                    </ListItem>
                                </Paper>
                            ))
                        }

                    </  List >
                </div>
            </div>
        );
    }
}
// export default ContactList;

const mapStateToProps = (state) => {
    return { data: state }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        contactListAPI
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ContactList);