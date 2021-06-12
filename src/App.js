import React,{Component,Fragment} from "react";
import Chart from '../node_modules/r-chart'
import './App.css';

export default class App extends Component{
    state = {
        targets:[
            {date:'January',amount:10,size:8},
            {date:'February',amount:30},
            {date:'March',amount:20},
            {date:'May',amount:15},
            {date:'July',amount:50},
            {date:'August',amount:55},
            {date:'September',amount:40},
            {date:'October',amount:20},
            {date:'November',amount:40},
            {date:'December',amount:50},
        ],
        sales:[
            {date:'January',amount:0},
            {date:'February',amount:20},
            {date:'March',amount:40},
            {date:'April',amount:40},
            {date:'May',amount:45},
            {date:'June',amount:30},
            {date:'July',amount:10}
        ],
        logs:[]
    }
    change({point,key,value,dataIndex,pointIndex,drag}){
        var {targets,sales,logs} = this.state;
        if(dataIndex === 0){
            targets[pointIndex].amount = value;
            if(!drag){//drag end
                logs.push(`You changed this.state.targets[${pointIndex}].amount to ${value}`);
            }
            this.setState({targets,logs})    
        }
        else if(dataIndex === 1){
            sales[pointIndex].amount = value;
            if(!drag){//drag end
                logs.push(`You changed this.state.saled[${pointIndex}].amount to ${value}`);
            }
            this.setState({sales,logs})   
        }
    }
    add({key,value,dataIndex,pointIndex}){
        var {logs} = this.state;
        var newPoint = {date:key,amount:value};
        if(dataIndex === 0){
            let {targets} = this.state;
            targets.splice(pointIndex,0,newPoint); 
            logs.push(`You added ${JSON.stringify(newPoint)} to this.state.targets`)
            this.setState({targets,logs})
        }
        else if(dataIndex === 1){
            let {sales} = this.state;
            sales.splice(pointIndex,0,{date:key,amount:value}); 
            logs.push(`You added ${JSON.stringify(newPoint)} to this.state.sales`)
            this.setState({sales,logs})
        }
    }
    remove({point,key,value,dataIndex,pointIndex}){
        var {logs} = this.state;
        if(dataIndex === 0){
            let {targets} = this.state;
            targets.splice(pointIndex,1);
            logs.push(`You removed this.state.targets[${pointIndex}]`);
            this.setState({targets,logs});
        }
        else if(dataIndex === 1){
            let {sales} = this.state;
            sales.splice(pointIndex,1);
            logs.push(`You removed this.state.sales[${pointIndex}]`)
            this.setState({sales,logs});
        }
    }
    render(){
        var {targets,sales,logs} = this.state;
        return (
            <Fragment>
                <h5>Try to drag points or click on points to open popup and edit clicked point (remove or edit)</h5>
                <h5>Try to add point where plus is apear near mouse cursor (you can add point in empty places)</h5>
                <Chart
                    data={[ 
                        {
                            type:'line',
                            color:'#0688f3',
                            pointStyle:{radius:5,fill:'blue'},
                            text:(point)=>{return {value:point.date,y:-20}},
                            title:'Data1',areaOpacity:.1,
                            points:targets
                        },
                        
                    ]} 
                    getKey={({point})=>point.date}
                    getValue={({point})=>point.amount}
                    key_editLabel={(label)=>label.slice(0,3)}
                    value_editLabel={(value)=>value + '%'}
                    value_gridColor='#ddd'
                    key_title='Date'
                    value_title='Amount'
                    keys={['January','February','March','April','May','June','July','August','September','October','November','December']}
                    key_zoom={true}
                    value_zoom={true}
                    onChange={this.change.bind(this)}
                    onAdd={this.add.bind(this)}
                    onRemove={this.remove.bind(this)}
                />
                <h3>Logs</h3>
                <div className='logs'>
                    <ul>
                        {logs.map((log,i)=><li key={i}>{log}</li>)}
                    </ul>
                </div>
            </Fragment> 
        )
    }
}