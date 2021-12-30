import React from "react";

import axios from 'axios';

import { Link } from 'react-router-dom';

class ViewPost extends React.Component{

    constructor(props){
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.onChangeComment = this.onChangeComment.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.state = {
            post: {},
            comment: '',
            commentError: '',
            error: ''
        };
    }

    onChangeComment(e){
        this.setState({
            comment: e.target.value,
            commentError: ''
        });
    }

    onSubmit(e){
        e.preventDefault();
        let data = { content: this.state.comment };
        axios.post('https://amersblog.herokuapp.com/api/comments/'+this.props.match.params.id, data)
        .then(res => {
             let post  = this.state.post;
             post.comments.push({
                 _id: res.data._id,
                 content: res.data.content,
                 author: { _id: localStorage.getItem('_id')}
             });
             this.setState({
                 post: post, 
                 commentError: '',
                 comment: ''
             });
        })
        .catch(err => {
            this.setState({
                commentError: <blockquote>{err.response.data.message}</blockquote>
            });
        });
    }

    deletePost(){
        axios.delete('https://amersblog.herokuapp.com/api/posts/'+this.state.post._id)
        .then(res => {
            this.props.history.push('/');
        })
    }

    componentDidMount(){
        let postId = this.props.match.params.id;
        axios.get('https://amersblog.herokuapp.com/api/posts/'+postId)
        .then(res => {
            this.setState({
                post: res.data,
                error: ''
            });
        })

        .catch(err => {
            this.setState({
                error: err.response.data.message
            });
        });
    }

    renderActions(){
        if(localStorage.getItem('token') && localStorage.getItem('_id') === this.state.post.author._id){
            return(
                <span>
                    <Link to={'https://amersblog.herokuapp.com/post/edit/'+this.state.post._id}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={this.deletePost}>Delete</button>
                </span>
            );
        }
    }

    renderComments(){
        let comments = <p>there are no comments</p>
        if(this.state.post.comments.length){
            comments = this.state.post.comments.map(comment =>{
                return(
                    <p key={comment._id}>
                        <strong className="title">
                            {comment.author._id === localStorage.getItem('_id') ? "i'am" : comment.author.name}
                        </strong>
                        <br/>
                        {comment.content}
                    </p>
                );
            });
        }
        return comments;
    }

    renderCommentForm(){
        if(!localStorage.getItem('token')){
            return(<p>Please login to add a comment on this post</p>);
        }
        return(
            <div>
                <h4>Add a comment</h4>
                {this.state.commentError}
                <form onSubmit={this.onSubmit}>
                    <textarea value={this.state.comment} onChange={this.onChangeComment}></textarea>
                    <input className="button-primary" type="submit" value="send" />
                </form>
            </div>
        )
    }

    render (){
        if(this.state.error){
            return(<blockquote>{this.state.error}</blockquote>);
        }

        if(!this.state.post.title){
            return(<h4>Please waite!</h4>);
        }

        return(
            <div className="column">
                <h4>{this.state.post.title}</h4>
                <h6 className="title">{this.state.post.author.name}</h6>
                <p>{this.state.post.content}</p>
                {this.renderActions()}
                <hr/>
                <h4>Comments</h4>
                {this.renderComments()}
                {this.renderCommentForm()}
            </div>
        );
    }
}

export default ViewPost