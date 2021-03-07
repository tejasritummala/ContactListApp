import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from '@material-ui/core/Tooltip';
class FavoriteContacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favList: [],
        }
    }


    componentDidMount() {
        var newState;
        if (localStorage.getItem("state"))
            newState = localStorage.getItem("state");
        else
            newState = "[]";
        console.log(JSON.parse(newState).length);
        this.setState({ favList: JSON.parse(newState) })
    }

    deleteFromFavorites = (evt) => {
        var localState = localStorage.getItem("state");
        var Arr = JSON.parse(localState);
        var index;
        for (var i = 0; i < Arr.length; i++) {
            if (Arr[i].id === parseInt(evt.currentTarget.parentElement.id)) {
                index = i;
            }
        }
        if (index !== undefined) {
            Arr.splice(index, 1)
        }
        const serializedState = Arr;
        console.log(serializedState)
        localStorage.setItem("state", JSON.stringify(serializedState));
        this.setState({ favList: Arr })
    }
    handleClick = () => {
        window.open("/", "_self")
    }

    render() {
        return (
            <div className="container">
                <div className="contactList">
                    <div className="header">
                        <Tooltip title="Go Back" placement="top">
                            <ArrowBackIcon onClick={this.handleClick}></ArrowBackIcon>
                        </Tooltip>
                    </div>
                    {this.state.favList.length > 0 ?
                        <List id="favContactList">
                            {
                                this.state.favList.map((data) => (
                                    <Paper key={data.id}>
                                        <ListItem id={data.id} key={data.id} alignItems="flex-start" className="contactListItem">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={data.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.first_name + " " + data.last_name}
                                                secondary={data.email}
                                            />
                                            <Tooltip title="Delete Contact From Favorites" placement="top">
                                                <DeleteOutlineIcon className="deleteIcon" onClick={this.deleteFromFavorites}></DeleteOutlineIcon>
                                            </Tooltip>
                                        </ListItem>
                                    </Paper>
                                ))
                            }
                        </List>
                        :
                        <div className="noDataContainer">
                            <h1 className="noData">No Favorites to Show</h1>
                        </div>
                    }

                </div>
               
            </div>
        );
    }
}

export default FavoriteContacts;