import React, { Component } from 'react';
import { loadBoard, setStyle } from '../store/actions/boardActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Doughnut, HorizontalBar, Bar } from 'react-chartjs-2';


export default class _AnalysisDashboard extends Component {
    async componentDidMount() {
        const boardId = this.props.match.params.id;
        try {
            await this.props.loadBoard(boardId);
            this.props.setStyle(this.props.board.style);
        } catch (err) {
            toast.error('Oops! we seem to be missing the board you\'re looking for. going back to board selection.', {
                position: "bottom-right",
                autoClose: 3500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setTimeout(() => {
                this.props.history.push('/board')
            }, 1000)
        }
    }
    getRndHexColor = () => {
        let n = (Math.random() * 0xfffff * 1000000).toString(16);
        return '#' + n.slice(0, 6);
    }
    getDataForChart = (mapObject) => {
        const rndClrs = Object.keys(mapObject).map(key => this.getRndHexColor())
        return {
            labels: Object.keys(mapObject),
            datasets: [{
                data: Object.values(mapObject),
                backgroundColor: rndClrs,
                hoverBackgroundColor: rndClrs,
            }]
        };
    }
    cardsByGroups = (groups) => {
        if (!groups) return;
        const cardsByGroupsMap = groups.reduce((acc, group) => {
            const unArchivedCards = group.cards.filter(card => !card.archivedAt)
            acc[group.title] = unArchivedCards.length;
            return acc;
        }, {});
        return this.getDataForChart(cardsByGroupsMap);
    }
    cardsByMembers = (board) => {
        if (!board.members) return;
        const cardsByMembersMap = board.members.reduce((acc, member) => {
            let memberCardsCount = 0;
            for (let i = 0; i < board.groups.length; i++) {
                const unArchivedCards = board.groups[i].cards.filter(card => !card.archivedAt)
                for (let j = 0; j < unArchivedCards.length; j++) {
                    if (unArchivedCards[j].members.some(currMember => currMember._id === member._id)) memberCardsCount++;
                }
            }
            acc[member.fullName] = memberCardsCount;
            return acc;
        }, {});
        return this.getDataForChart(cardsByMembersMap);
    }
    timeInGroup = (groups) => {
        if (!groups) return;
        const groupIdNameMap = groups.reduce((acc, group) => {
            acc[group.id] = group.title;
            return acc
        }, {})
        const cards = groups.reduce((acc, group) => {
            return [...acc, ...group.cards];
        }, []);
        const timeInGroupsMap = cards.reduce((acc, card) => {
            if (!card.timeAnalysis || !card.timeAnalysis.currGroup) return acc;
            const currGroupName = groupIdNameMap[card.timeAnalysis.currGroup.groupId];
            acc[currGroupName] = {};
            const timeSpent = Date.now() - card.timeAnalysis.currGroup.enteredAt;
            acc[currGroupName].time = acc[currGroupName].time ? acc[currGroupName].time + timeSpent : timeSpent;
            acc[currGroupName].count = acc[currGroupName].count ? acc[currGroupName].count + 1 : 1;
            if (!card.timeAnalysis.timeInGroupsMap) return acc;
            for (const groupId in card.timeAnalysis.timeInGroupsMap) {
                const currPastGroupName = groupIdNameMap[groupId];
                acc[currPastGroupName] = acc[currPastGroupName] ? acc[currPastGroupName] : {};
                const timeCardSpentInCurrGroup = card.timeAnalysis.timeInGroupsMap[groupId];
                acc[currPastGroupName].time = acc[currPastGroupName].time ? acc[currPastGroupName].time + timeCardSpentInCurrGroup : timeCardSpentInCurrGroup;
                acc[currPastGroupName].count = acc[currPastGroupName].count ? acc[currPastGroupName].count + 1 : 1;
            }
            return acc;
        }, {})
        const lineData = Object.keys(timeInGroupsMap).map(group => ((timeInGroupsMap[group].time / (1000 * 60 * 60)) / timeInGroupsMap[group].count).toFixed(2));
        const barsData = Object.keys(timeInGroupsMap).map(group => (timeInGroupsMap[group].time / (1000 * 60 * 60)).toFixed(2));
        const clr1 = this.getRndHexColor();
        const clr2 = this.getRndHexColor();
        return {
            data: {
                labels: Object.keys(timeInGroupsMap),
                datasets: [{
                    label: 'Average time in group (Hrs)',
                    type: 'line',
                    data: lineData,
                    fill: false,
                    borderColor: clr1,
                    backgroundColor: clr1,
                    pointBorderColor: clr1,
                    pointBackgroundColor: clr1,
                    pointHoverBackgroundColor: clr1,
                    pointHoverBorderColor: clr1,
                    yAxisID: 'y-axis-2'
                }, {
                    type: 'bar',
                    label: 'Total hours in Group (Hrs)',
                    data: barsData,
                    fill: false,
                    backgroundColor: clr2,
                    borderColor: clr2,
                    hoverBackgroundColor: clr2,
                    hoverBorderColor: clr2,
                    yAxisID: 'y-axis-1'
                }]
            },
            options: {
                responsive: true,
                tooltips: { mode: 'label' },
                elements: { line: { fill: false } },
                scales: {
                    xAxes: [{ display: true, gridLines: { display: true } }],
                    yAxes: [
                        {
                            type: 'linear',
                            display: true,
                            position: 'left',
                            id: 'y-axis-1',
                            gridLines: { display: false },
                            labels: { show: true }
                        },
                        {
                            type: 'linear',
                            display: false,
                            position: 'right',
                            id: 'y-axis-2',
                            gridLines: { display: false },
                            labels: { show: true }
                        }
                    ]
                }
            }
        }
    }
    render() {
        const { board, style } = this.props;
        if (!board) return <div>Loading...</div>
        const cardsByMemberOptions = {
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        min: 0
                    }
                }]
            }
        };
        const cardsByGroup = this.cardsByGroups(board.groups);
        const cardsByMember = this.cardsByMembers(board);
        const timeInGroups = this.timeInGroup(board.groups);
        return (
            !board
                ? <div>Loading...</div>
                : <div className="page-container">
                    <h1 style={{ color: style.fontClr }}>{board.title} - Data Analysis</h1>
                    <div className="analysis-dashboard-container">
                        {cardsByGroup && <div className="chart-container cards-by-group-container">
                            <h3>Cards Per group</h3>
                            <Doughnut data={cardsByGroup} />
                        </div>}
                        {cardsByMember && <div className="chart-container cards-by-member-container">
                            <h3>Cards Per Member</h3>
                            <HorizontalBar data={cardsByMember} options={cardsByMemberOptions} />
                        </div>}
                        {timeInGroups && <div className="chart-container time-in-groups-container">
                            <h3>Cards' time analysis</h3>
                            <Bar data={timeInGroups.data} options={timeInGroups.options} height="" />
                        </div>}
                    </div>
                </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        board: state.boardReducer.board,
        style: state.boardReducer.style
    };
};
const mapDispatchToProps = {
    loadBoard,
    setStyle
};

export const AnalysisDashboard = connect(mapStateToProps, mapDispatchToProps)(_AnalysisDashboard);