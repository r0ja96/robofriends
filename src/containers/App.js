import React, {Component} from 'react';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/Scroll';
import ErrorBoundry from "../components/ErrorBoundry";
//import {robots} from './robots';
import './App.css';

class App extends Component{
    constructor(){
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

   async componentDidMount(){
      /*  fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(user => this.setState({ robots: user}));*/

        const res = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await res.json();
        this.setState({ robots: data});
        

       /* const p = Promise.all([fetch('https://jsonplaceholder.typicode.com/users'),fetch('https://jsonplaceholder.typicode.com/posts')]);
        const d = await p;
        const data = await d[0].json();
        this.setState({ robots: data});*/

    }

    onSearchChange = (event) =>{
        this.setState({searchfield: event.target.value});
    }

    render(){
        const {robots, searchfield} = this.state;
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(
                searchfield.toLowerCase()
            );
        });

        return !robots.length ?
        <h1>Loading</h1>:     
            ( 
                <div className ='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange}/>
                    
                <Scroll>
                    <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll> 
                </div>
            );
        
    }
}

export default App;