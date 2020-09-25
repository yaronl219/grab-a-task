import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import * as timeago from 'timeago.js';
import { MemberPreview } from '../BoardHeader/MemberPreview';

export function ActivityLog({ boardId, displayMode, activities }) {
    if (!activities) return <div><CircularProgress /></div>;
    if (activities && activities.length > 15) activities = activities.slice(0, 14);
    
    return (
        <ul className="activity-log">
            {activities.map(activity => {
                return <li key={activity.id}>
                    <MemberPreview name={activity.byMember.fullName} />
                    <pre>
                        <div>
                            <Link to={`/board/${boardId}`}>{activity.byMember.fullName + ' '}</Link>
                            <span>{activity.commentTxt ? 'commented:' : activity.txt + ' '}</span>
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
