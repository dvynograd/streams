import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from "../../history";
import { deleteStream, fetchStream } from "../../actions";
import connect from "react-redux/es/connect/connect";

const goBack = () => history.push('/');




class StreamDelete extends Component {

    deleteStream = () => {
        this.props.deleteStream(this.props.match.params.id);
    };
    renderActions () {
        return (
            <Fragment>
                <button onClick={this.deleteStream} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </Fragment>
        );
    }
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete stream?"
        }
        return `Are you sure you want to delete the stream with title ${this.props.stream.title}?`;
    }

    render() {
        return (
            <div>
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={goBack}
                />
            </div>
        );
    }
}
const mapStateToProps = (state, { match }) => ({ stream: state.streams[match.params.id]});


export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);
