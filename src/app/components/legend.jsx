import React from "react";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {List, ListItem} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import {connect} from 'react-redux'
import _ from 'lodash'

const Legend = React.createClass({

    render() {

        return (
            <Card style={{width: 320, marginBottom: 10}}>
                <CardText style={{padding:0}}>
                    <div>
                        {this.props.labels.map(label => {
                            return <ListItem key={label.title} disabled={true} primaryText={label.title} leftAvatar={<Avatar size={30} src={label.icon} />}></ListItem>
                        })}
                    </div>

                </CardText>
            </Card>
        );
    }
});

const mapStateToProps = (state) => ({
    labels: _.uniqBy(state.maps.markers, 'title').map(marker => ({
        title: marker.title,
        icon: marker.icon
    }))
});

export default connect(mapStateToProps)(Legend);
