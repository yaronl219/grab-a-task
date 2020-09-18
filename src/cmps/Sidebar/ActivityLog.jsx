import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { MemberPreview } from '../BoardHeader/MemberPreview';

export class ActivityLog extends Component {
    render() {
        const { activities, boardId } = this.props;
        return (
            !activities
                ? <div>Loading...</div>
                : <ul className="activity-log">
                    {activities.map(activity => {
                        return <li key={activity.id}>
                            <MemberPreview name={activity.byMember.fullName} />
                            <pre>
                                <Link to={`/board/${boardId}`}>{activity.byMember.fullName}</Link>
                                {` ${activity.txt} of `}
                                <Link to={`/board/${boardId}/${activity.card.id}/`}>
                                    {activity.card.title}
                                </Link>
                                <span className="time-ago">{`\n${timeago.format(activity.createdAt)}`}</span>
                            </pre>
                        </li>
                    })}
                </ul>
        )
    }
}
