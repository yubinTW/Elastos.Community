import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import { Form, Col, Row, List, Avatar, Icon, Divider, Button, Input, Mention } from 'antd'
import config from '@/config'
import './style.scss'
import moment from 'moment'
import _ from 'lodash'
import I18N from '@/I18N'

const TextArea = Input.TextArea
const FormItem = Form.Item

class C extends BaseComponent {

    componentDidMount() {
        this.props.listUsers()
    }

    componentWillUnmount() {
    }

    // only wraps loading / renderMain
    ord_render () {
        return (
            this.renderMain()
        )
    }

    // header + main area
    renderMain() {
        return (
            <div className="c_Comments">
                {this.renderHeader()}
                {this.renderComments()}
            </div>
        )
    }

    renderHeader() {
        return (
            <h3 className="no-margin">Comments</h3>
        )
    }

    getInputProps() {
        const allUsers = _.map(this.props.all_users, (user) => user.username)
        const {getFieldDecorator} = this.props.form
        const comment_fn = getFieldDecorator('comment', {
            rules: [
                {required: true, message: 'Please input your comment!'}
            ],
            initialValue: Mention.toContentState('')
        })
        const comment_el = (
            <Mention
                multiLines
                style={{ width: '100%', height: 100 }}
                suggestions={allUsers}
                placeholder="Comments or updates"/>
        )

        const headline_fn = getFieldDecorator('headline', {
            rules: [{
                max: 100, message: 'Headline is too long'
            }],
            initialValue: ''
        })
        const headline_el = (
            <Input placeholder="Headline"/>
        )

        return {
            comment: comment_fn(comment_el),
            headline: headline_fn(headline_el)
        }
    }

    isUserSubscribed() {
        const curDetail = this.props[this.props.reduxType || this.props.type]
        const subscribers = curDetail.subscribers || []
        return !!_.find(subscribers, (subscriber) => {
            return subscriber.user && subscriber.user._id === this.props.currentUserId
        })
    }

    isLoading() {
        return this.props.loading[this.props.reduxType || this.props.type]
    }

    getSubscribeButton() {
        if (this.isUserSubscribed() && this.props.canSubscribe) {
            return (
                <Button className="ant-btn-ebp pull-left" size="small"
                    onClick={this.unsubscribe.bind(this)} loading={this.isLoading()}>
                    Unsubscribe
                </Button>
            )
        }

        return this.props.canSubscribe ?
            (<Button className="ant-btn-ebp pull-left" size="small"
                onClick={this.subscribe.bind(this)} loading={this.isLoading()}>
                Subscribe
            </Button>) : null
    }

    getFooter() {
        if (!this.props.currentUserId) {
            return <div/>
        }

        const p = this.getInputProps()
        const subscribeButton = this.getSubscribeButton()

        // TODO - canSubscribe requires canPost here, could be improved
        return this.props.canPost ?
            (<Form onSubmit={this.handleSubmit.bind(this)} className="c_commentForm">
                { this.props.headlines &&
                    <FormItem>
                        {p.headline}
                    </FormItem>
                }
                <FormItem>
                    {p.comment}
                </FormItem>
                <FormItem>
                    {subscribeButton}
                    <Button className="ant-btn-ebp pull-right" type="primary" size="small"
                        htmlType="submit" loading={this.isLoading()}>
                        Post
                    </Button>
                </FormItem>
            </Form>) : null;
    }

    getModelId() {
        return _.isString(this.props.model) // Bit naive IMPROVEME
            ? this.props.model
            : this.props.model._id
    }

    subscribe() {
        this.props.subscribe(this.props.type, this.getModelId())
    }

    unsubscribe() {
        this.props.unsubscribe(this.props.type, this.getModelId())
    }

    renderComments() {
        let curDetail = this.props[this.props.reduxType || this.props.type]

        if (this.props.detailReducer) {
            curDetail = this.props.detailReducer(curDetail) || {}
        }

        const comments = curDetail.comments || []
        const dateFormatter = (createdAt) => createdAt ? moment(createdAt).format('MMM D - h:mma') : ''

        const footer = this.getFooter()

        const enrichComment = (comment) => {
            if (!comment) {
                return
            }

            const words = comment.match(/@*\w+/g)

            if (words) {
                return (
                    <div>
                        {_.map(words, (word, ind) => /@\w+/.test(word)
                            ? <a key={ind} onClick={() => this.showUserProfile(word.replace('@', ''))}>{word} </a>
                            : <span key={ind}>{word} </span>
                        )}
                    </div>
                )
            }

            return
        }

        const commentItems = _.map(comments, (comment, ind) =>
        {
            const thread = _.first(comment)
            const createdByUsername = (thread.createdBy && thread.createdBy.username) || ''
            const avatar = (thread.createdBy && thread.createdBy.profile && thread.createdBy.profile.avatar) || '/assets/images/Elastos_Logo.png'
            const createdById = (thread.createdBy && thread.createdBy._id)
            const dateFormatted = dateFormatter(thread.createdAt)

            return {
                comment: thread.comment,
                headline: thread.headline,
                description: (
                    <div className="commenter-info">
                        <a onClick={() => {createdById && this.props.history.push(`/member/${createdById}`)}}>
                            {createdByUsername}
                        </a>
                        {dateFormatted &&
                        <span>
                            <span className="date-colon">, </span>
                            <span className="date">{dateFormatted}</span>
                        </span>}
                    </div>
                ),
                avatar
            }
        })

        // Show in reverse chronological order
        commentItems && commentItems.reverse();

        return <List
                    size="large"
                    itemLayout="horizontal"
                    locale={{
                        emptyText: I18N.get('comments.noComments')
                    }}
                    dataSource={commentItems}
                    header={footer}
                    renderItem={(item, ind) => (
                        <List.Item key={ind}>
                            <Avatar className="comment-avatar pull-left" src={item.avatar} shape="circle" size={64}/>
                            <div className="comment-content pull-left">
                                { item.headline &&
                                    <h4>
                                        {item.headline}
                                    </h4>
                                }
                                <h5>
                                    {enrichComment(item.comment)}
                                </h5>
                                <hr/>
                                {item.description}
                            </div>
                        </List.Item>
                    )}
                />
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.postComment(this.props.type,
                    this.props.reduxType,
                    this.props.detailReducer,
                    this.props.returnUrl,
                    this.getModelId(),
                    values.comment && values.comment.getPlainText(),
                    values.headline).then(() => {
                        this.props.form.resetFields()
                    })
            }
        })
    }

    showUserProfile(username) {
        const user = _.find(this.props.all_users, { username })
        if (user) {
            this.props.history.push(`/member/${user._id}`)
        }
    }
}

export default Form.create()(C)
