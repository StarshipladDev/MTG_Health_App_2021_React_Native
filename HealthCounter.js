import React from 'react';
import { StyleSheet, Text,Image, View, Button, Pressable} from 'react-native';


export default class HealthCounter extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            health0: 20,
            health1: 20,
            minions1: [null],
            minions2: [null],
            possibleMinions: [MinionTypes.OneOne, MinionTypes.TwoTwo, MinionTypes.ThreeThree],
            minionsIndex1: 0,
            minionsIndex2: 0
        };
    }
    changeHealth(up, index) {
        switch (index) {
            case 0:

                if (up) {
                    this.setState({ health0: this.state.health0 + 1 });
                }
                
                else {
                    this.setState({ health0: this.state.health0 - 1 });
                }
                break;
            case 1:

                if (up) {
                    this.setState({ health1: this.state.health1 + 1 });
                }
                else {
                    this.setState({ health1: this.state.health1 - 1 });
                }
                break;
            default:
                break;
        }
        
    }
    changeMinion(up, index) {
        var indexToGoTo = 0;
        switch (index) {
            case 0:
                if (up) {
                    indexToGoTo = this.state.minionsIndex1 + 1;
                }

                else {
                    indexToGoTo = this.state.minionsIndex1 - 1;
                }
                break;
            case 1:
                if (up) {
                    indexToGoTo = this.state.minionsIndex2 + 1;
                }

                else {
                    indexToGoTo = this.state.minionsIndex2 - 1;
                }
                break;
            default:
                break;
        }
        if (indexToGoTo == -1) {
            indexToGoTo = this.state.possibleMinions.length - 1;
        }
        if (indexToGoTo == this.state.possibleMinions.length) {
            indexToGoTo = 0;
        }
        switch (index) {
            case 0:
                this.setState({ minionsIndex1: indexToGoTo });
                break;
            case 1:
                this.setState({ minionsIndex2: indexToGoTo });
                break;
            default:
                break;
        }

    }
    addMinion(index) {
        if (index == 1) {
            this.setState({ minions1: [...this.state.minions1,this.state.possibleMinions[this.state.minionsIndex1]] });
        }
        else {
            this.setState({ minions2: [...this.state.minions2,this.state.possibleMinions[this.state.minionsIndex2]] });
        }
    }
    render() {

        console.log("state prop is ", this);
        return <View>
            <Button onPress={() => { this.changeHealth(false, 0) }} title={"-"} />
            <Text style={{ transform: [{ rotate: "180deg" }] }}> Player 1: {this.state.health0}</Text>
            <View name="Minion" style={{flexWrap: 'nowrap', flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Button color={"blue"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap'}} onPress={() => { this.changeMinion(false, 0) }} title={"-"} />
                <Button color={"darkblue"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap'}} onPress={() => { this.addMinion(1) }} title={this.state.possibleMinions[this.state.minionsIndex1] } />
                <Button color={"blue"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(true, 0) }} title={"+"} />
            </View>
            <Minion colorProp={"blue"} minion={this.state.minions1}/>
            <Button onPress={() => { this.changeHealth(true, 0) }} title={"+"} />

            <Button color={"red"} onPress={() => { this.changeHealth(true, 1) }} title={"+"} />
            <Text> Player 2:  {this.state.health1}</Text>
            <View name="Minion" style={{flexWrap: 'nowrap', flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Button color={"red"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap'}} onPress={() => { this.changeMinion(false, 1) }} title={"-"} />
                <Button color={"darkred"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap'}} onPress={() => { this.addMinion(2) }} title={this.state.possibleMinions[this.state.minionsIndex2] } />
                <Button color={"red"} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(true, 1) }} title={"+"} />
            </View>
            <Minion colorProp={"red"} minion={this.state.minions2}/>
            <Button color={"red"} onPress={() => { this.changeHealth(false, 1) }} title={"-"} />
        </View>

    }
   
}
 const  MinionTypes ={
    OneOne : '1\\1',
     TwoTwo: '2\\2',
    ThreeThree: '3\\3'
}
//Required as 'require' only takes literal strings
const Images = {
    Image1: require('./images/image1.png'),
    Image2: require('./images/image2.png'),
    Image3: require('./images/image3.png'),
}
class Minion extends React.Component {
    constructor(props) {
        super(props);
    }
    renderMinion(props,eachMinion,index) {
        console.log("rendering minion", eachMinion);
        if (eachMinion == null) {
            return "";
        }
        console.log("Minon.Redner: Checking minion prop that is ", eachMinion, "comapred to MinionTypes 1 it is ", (this.props.minion == MinionTypes.OneOne));
        var imageSourceToUse = 'Image';
        switch (eachMinion) {
            case MinionTypes.OneOne:
                imageSourceToUse += '1';
                break;

            case MinionTypes.TwoTwo:
                imageSourceToUse += '2';
                break;

            case MinionTypes.ThreeThree:
                imageSourceToUse += '3';
                break;
            default:
                return;
                break;
        }
        if (props.minion && props.colorProp == "blue") {

            return (<Pressable key={index} delayLongPress={500}
                onPress={() => { console.log("on press Blue") }}
                onLongPress={() => { console.log("longpress!"); }} >
                <Text color={props.colorProp} style={{ textAlign: "center", color: props.colorProp, transform: [{ rotate: "180deg" }] }}>
                    <Image
                        style={{ width: 50, height: 50, tintColor: this.props.colorProp }}
                        source={Images[imageSourceToUse]}
                    /> 
                </Text>

            </Pressable>);
        }
        else if (props.minion) {
            return (
                <Pressable key={index} delayLongPress={500} onPress={() => { console.log("on press Red") }} onLongPress={() => { console.log("longpress!"); }}>

                    <Image
                        style={{ width: 50, height: 50, tintColor: this.props.colorProp }}
                        source={Images[imageSourceToUse]}
                    />
                </Pressable>
            );
        }
        else {
            return (<Button key={index} > Minion is {eachMinion}</Button>);
        }
    }
    render() {
        if (this.props.minion != null) {
            console.log("minion prop is ", this);
            return this.props.minion.map((eachMinion,index) => this.renderMinion(this.props, eachMinion,index));
        }
        else {

            console.log("no minion,  prop is: ", this);
            return "";
        }
    }
}