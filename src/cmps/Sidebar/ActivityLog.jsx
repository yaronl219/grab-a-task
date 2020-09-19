import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { MemberPreview } from '../BoardHeader/MemberPreview';

export class ActivityLog extends Component {
    render() {
        const { activities, boardId, displayMode } = this.props;
        return (
            !activities
                ? <div>Loading...</div>
                : <ul className="activity-log">
                    {activities.map(activity => {
                        return <li key={activity.id}>
                            <MemberPreview name={activity.byMember.fullName} />
                            <pre>
                                <div>
                                    <Link to={`/board/${boardId}`}>{activity.byMember.fullName} </Link>
                                    <span>
                                        {activity.commentTxt ? 'commented:' : `${activity.txt} `}
                                    </span>
                                    {activity.commentTxt && <div className="comment-txt">
                                        {activity.commentTxt}
                                    </div>}
                                    {displayMode !== 'card' && <span>
                                        {'in '}
                                        <Link to={`/board/${boardId}/${activity.card.id}/`}>
                                            {activity.card.title}
                                        </Link>
                                    </span>}
                                </div>
                                <span className="time-ago">{timeago.format(activity.createdAt)}</span>
                            </pre>
                        </li>
                    })}
                </ul>
        )
    }
}
