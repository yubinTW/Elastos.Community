import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'
import _ from 'lodash'
import { Col, Row, Button, Spin, Divider, message, List, Icon, Tooltip, Popconfirm, Card, Avatar, InputNumber } from 'antd'
import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_TYPE, TASK_CANDIDATE_STATUS} from '@/constant'
import Comments from '@/module/common/comments/Container'
import './style.scss'
import I18N from '@/I18N'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {
    ord_states() {
        return {
        }
    }

    ord_render () {
        return this.renderMain()
    }

    isTaskOwner() {
        return this.props.detail.createdBy._id === this.props.userId
    }

    getApplicant () {
        return _.find(this.props.detail.candidates, { _id: this.props.applicantId })
    }

    renderMain () {
        const applicant = this.getApplicant()
        if (!applicant) {
            return ''
        }
        const appliedDate = moment(applicant.createdAt).format('MMM D, YYYY')

        return (
            <div className="public">
                <Row>
                    <Col span={24} className="gridCol main-area">
                        <Row>
                            <Col>
                                <Card title={`Applied on ${appliedDate}`} extra={
                                    <div>

                                    </div>
                                }>
                                    {applicant.user &&
                                        <a onClick={this.linkUserDetail.bind(this, applicant.user)}>
                                            <Avatar className="gap-right" src={applicant.user.profile.avatar}/>
                                            {`${applicant.user.profile.firstName} ${applicant.user.profile.lastName}`}
                                        </a>
                                    }
                                    <h5>
                                        {applicant.applyMsg}
                                    </h5>
                                    { this.props.detail.bidding &&
                                        <div>
                                            { !this.isTaskOwner() && _.indexOf(['PENDING', 'CREATED'], this.props.detail.status) >= 0 && (applicant.type !== TASK_CANDIDATE_TYPE.TEAM || applicant.team.owner._id === this.props.userId)
                                                ? <div>
                                                    <span>{I18N.get('project.detail.your_bid')}: </span>
                                                    <InputNumber onChange={_.debounce((value) => this.changeBid(value), 2000)}
                                                        defaultValue={applicant.bid}/>
                                                    <span> ELA</span>
                                                </div>
                                                : <div>
                                                    <h5>
                                                        Bid: {applicant.bid} ELA
                                                    </h5>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {
                                        this.showAttachment()
                                    }
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Comments type="taskCandidate" reduxType="task" canPost={true} model={applicant}
                                detailReducer={(detail) => _.find(detail.candidates, { _id: this.props.applicantId })}
                                returnUrl={`/project-detail/${this.props.detail._id}`}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }

    async changeBid(bid) {
        await this.props.updateApplication(this.props.detail._id, {
            taskCandidateId: this.props.applicantId,
            bid
        })

        message.success(I18N.get('project.detail.bid_updated'))
    }

    showAttachment() {
        const applicant = this.getApplicant()
        const {attachment, attachmentFilename} = applicant

        return attachment
            ? <h5><a href={attachment} target="_blank">{attachmentFilename}</a></h5>
            : <h5>{I18N.get('project.detail.no_attachments')}</h5>
    }

    linkUserDetail(user) {
        this.props.history.push(`/member/${user._id}`)
    }

    async withdrawApplication() {
        // const taskId = this.props.task._id
        // this.props.pullCandidate(taskId, tcId).then(() => {
        //     const prefix = this.props.page === 'LEADER'
        //         ? '/profile' : ''
        //     this.props.history.push(`${prefix}/task-detail/${this.props.task._id}`)
        // })
    }

    async rejectApplication() {

    }
}
