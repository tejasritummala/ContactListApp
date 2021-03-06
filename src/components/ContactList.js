import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { connect } from 'react-redux';
import { contactListAPI } from '../redux/actionCreators';
import { bindActionCreators } from 'redux';

class ContactList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inboxData: []
        }
    }

    componentWillMount() {

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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    handleClick = contactID => () => {
        window.open("/users/" + contactID, "_self")
    }

    render() {
        return (
            <div className="container">
                <div className="contactList">
                    <List id="listDiv">
                        {
                            this.state.inboxData.map((data, index) => (
                                <Paper key={data.id}  onClick={this.handleClick(data.id)}>
                                    <ListItem key={data.id} alignItems="flex-start" className="contactListItem">
                                         <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={data.avatar}/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={data.first_name +" " + data.last_name}
                                            secondary= {data.email}
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

ContactList.propTypes = {

};

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