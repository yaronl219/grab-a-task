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
        const n = (Math.random() * 0xfffff * 1000000).toString(16);
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
    dashboardNumbers = (board) => {
        if (!board || !board.members || !board.groups) return;
        let numOfMembers = board.members.length;
        let unarchivedCardsCount = 0;
        let archivedCardsCount = 0;
        board.groups.forEach(group => {
            const archivedCards = group.cards.filter(card => card.archivedAt);
            archivedCardsCount += archivedCards.length;
            unarchivedCardsCount += group.cards.length - archivedCards.length;
        })
        const cards = board.groups.reduce((acc, group) => [...acc, ...group.cards], []);
        const todosCount = cards.reduce((acc, card) => {
            if (!card.checklists) return acc;
            card.checklists.forEach(checklist => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) acc.checked++;
                    acc.total++;
                })
            })
            return acc;
        }, { checked: 0, total: 0 });
        if (todosCount.checked / todosCount.total > 0.75) todosCount.colorClass = 'todos-green';
        if (todosCount.checked / todosCount.total <= 0.5) todosCount.colorClass = 'todos-red';
        console.log(todosCount)
        return { numOfMembers, archivedCardsCount, unarchivedCardsCount, todosCount };
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
        return {
            data: this.getDataForChart(cardsByMembersMap),
            options: {
                legend: { display: false },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        };
    }
    timeInGroups = (groups) => {
        if (!groups) return;
        const groupIdNameMap = groups.reduce((acc, group) => {
            acc[group.id] = group.title;
            return acc
        }, {})
        let cards = groups.reduce((acc, group) => {
            return [...acc, ...group.cards];
        }, []);
        cards = cards.filter(card => !card.archivedAt);
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
        const clr1 = '#40d0e0';
        const clr2 = '#008493';
        return {
            data: {
                labels: Object.keys(timeInGroupsMap),
                datasets: [{
                    label: 'Average time in group (Hrs)',
                    type: 'line',
                    data: lineData,
                    fill: false,
                    borderColor: clr1,
                    pointBorderColor: clr1,
                    pointBackgroundColor: clr1,
                    pointHoverBackgroundColor: clr1,
                    pointHoverBorderColor: clr1,
                    yAxisID: 'y-axis-1'
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
                        }
                    ]
                }
            }
        }
    }
    cardsByLabels = (groups, labels) => {
        if (!groups || !labels) return;
        const colorsMap = {
            green: '#61BD4F',
            yellow: '#F2D600',
            orange: '#FF9F1A',
            red: '#EB5A46',
            purple: '#C377E0',
            blue: '#028ad8',
            grey: '#a7a7a7',
            black: '#202020'
        }
        let cards = groups.reduce((acc, group) => [...acc, ...group.cards], []);
        cards = cards.filter(card => !card.archivedAt);
        const labelsMap = labels.reduce((acc, currLabel) => {
            let cardsWithLabelCount = 0;
            cards.forEach(card => {
                if (card.labels.some(label => label.id === currLabel.id)) cardsWithLabelCount++;
            })
            acc[currLabel.id] = { name: currLabel.name, color: currLabel.color, count: cardsWithLabelCount };
            return acc;
        }, {})
        return {
            data: {
                labels: Object.keys(labelsMap).map(label => labelsMap[label].name),
                datasets: [
                    {
                        borderWidth: 1,
                        backgroundColor: Object.keys(labelsMap).map(label => colorsMap[labelsMap[label].color]),
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: Object.keys(labelsMap).map(label => labelsMap[label].count),
                    }
                ]
            },
            options: {
                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            min: 0
                        }
                    }]
                }
            }
        }

    }
    render() {
        const { board, style } = this.props;
        if (!board) return <div>Loading...</div>;
        const dashboardNumbers = this.dashboardNumbers(board);
        const cardsByGroups = this.cardsByGroups(board.groups);
        const cardsByMembers = this.cardsByMembers(board);
        const timeInGroups = this.timeInGroups(board.groups);
        const cardsByLabels = this.cardsByLabels(board.groups, board.labels)
        return !board
            ? <div>Loading...</div>
            : <div className="page-container">
                <h2 style={{ color: style.fontClr }}>{board.title} - Data Analysis</h2>
                <div className="analysis-dashboard-container">
                    {dashboardNumbers && <div className="chart-container summary-numbers-conatiner">
                        <div><h3>{dashboardNumbers.numOfMembers}</h3><span>Total Members</span></div>
                        <div>
                            <h3>
                                {dashboardNumbers.unarchivedCardsCount}
                                <span className="total">{` (${dashboardNumbers.archivedCardsCount} archived)`}</span>
                            </h3>
                            <span>Cards On Board</span>
                        </div>
                        <div>
                            <h3 className={dashboardNumbers.todosCount.colorClass}>
                                {`${dashboardNumbers.todosCount.checked}`}
                                <span className="total">{` /${dashboardNumbers.todosCount.total}`}</span>
                            </h3><span>To-Dos Checked</span></div>
                    </div>}
                    {cardsByGroups && <div className="chart-container cards-by-group-container">
                        <h3>Cards Per Group</h3>
                        <Doughnut data={cardsByGroups} />
                    </div>}
                    {cardsByMembers && <div className="chart-container cards-by-member-container">
                        <h3>Cards Per Member</h3>
                        <HorizontalBar data={cardsByMembers.data} options={cardsByMembers.options} />
                    </div>}
                    {timeInGroups && <div className="chart-container time-in-groups-container">
                        <h3>Groups' Time Analysis</h3>
                        <Bar data={timeInGroups.data} options={timeInGroups.options} />
                    </div>}
                    {cardsByLabels && <div className="chart-container cards-by-labels-container">
                        <h3>Labels Summary</h3>
                        <Bar data={cardsByLabels.data} options={cardsByLabels.options} />
                    </div>}
                </div>
            </div>
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