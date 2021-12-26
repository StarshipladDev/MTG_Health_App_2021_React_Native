import React from 'react';
import { StyleSheet, Text, View, Button, Pressable,Image } from 'react-native';



const MinionTypes = {
    OneOne: '1\\1 ',
    TwoTwo: '2\\2 ',
    ThreeThree: '3\\3 ',
    FourFour: '4\\4 ',
    OneOneFlying: '1\\1F',
    TwoTwoFlying: '2\\2F'
}
//Required as 'require' only takes literal strings
const Images = {
    Image1: require('./images/image1.png'),
    Image2: require('./images/image2.png'),
    Image3: require('./images/image3.png'),
    Image4: require('./images/image6_fourFour.png'),
    Image5: require('./images/image4_flyingOneOne.png'),
    Image6: require('./images/image5_flyingTwoTwo.png')
}
export default class HealthCounter extends React.Component {
    constructor(props) {
        super(props);
        var possibleMinonTypes = [];
        for (var minionIndex in MinionTypes) {
            possibleMinonTypes.push(MinionTypes[minionIndex]);
        }
        this.state = {
            health0: 20,
            health1: 20,
            player1Color:"blue",
            player1ColorIndex:0,
            player2Color:"red",
            player2ColorIndex:1,
            possibleColors:["blue","red","orange","purple","green","yellow","pink"],
            minions1: [],
            minions2: [],
            minions1Grey: [],
            minions2Grey: [],
            possibleMinions: possibleMinonTypes,
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
            this.setState({
                minions1: [...this.state.minions1, this.state.possibleMinions[this.state.minionsIndex1]],
                minions1Grey: [...this.state.minions1Grey, false],
            });
        }
        else {
            this.setState({
                minions2: [...this.state.minions2, this.state.possibleMinions[this.state.minionsIndex2]],
                minions2Grey: [...this.state.minions2Grey, false],

            });
        }
    }
    RemoveMinion(player, indexOfMinion) {
        console.log("In logn press: Index of minion for RemoveMinion fucntion is " + indexOfMinion,"Minions1(blue) is \n",this.state.minions1);

        console.log("calling splice (" + indexOfMinion+",1) on this .state.minons 1");
        if (indexOfMinion!= null) {

            var array = this.state.minions1;
            var arrayGrey = this.state.minions1Grey;
            if (player == 2) {
                var array = this.state.minions2;
                var arrayGrey = this.state.minions2Grey;
            }

            //SPLICE SPECIFIC INDEX FROM THE RIGHT ARRAY
                array.splice(indexOfMinion, 1);
                arrayGrey.splice(indexOfMinion, 1);
            //
            // RESET STATE BASED ON NEW ARRAYS
            //
            if (player == 1) {
                this.setState({ minions1: array, minions1Grey: arrayGrey });
            }
            else {
                this.setState({ minions2: array, minions2Grey: arrayGrey });
            }
        }

    }
    ChangeColor(index) {

        var color = 0;
        if (index == 0) {
            color = this.state.player1ColorIndex;
        }
        else if (index == 1) {
                color = this.state.player2ColorIndex;
        }

        if (color == this.state.possibleColors.length - 1) {
            color = this.state.possibleColors[0];
        }
        else {
            color = color + 1;
        }
        var colorName = this.state.possibleColors[color];

        if (index == 0) {
            this.setState({ player1ColorIndex: color, player1Color: colorName});
        }
        else if (index == 1) {
            this.setState({ player2ColorIndex: color, player2Color: colorName });
        }
    }
    GreyMinion(player, indexOfMinion) {
        var array = [];
        if (player == 1) {
            array = this.state.minions1Grey;
            if (array[indexOfMinion]) {
                array[indexOfMinion] = false;
            }
            else {
                array[indexOfMinion] = true;
            }
            this.setState({ minions1Grey: array });
        }
        else {
            array = this.state.minions2Grey;
            if (array[indexOfMinion]) {
                array[indexOfMinion] = false;
            }
            else {
                array[indexOfMinion] = true;
            }
            this.setState({ minions2Grey: array });
        }
    }
    render() {
        var p1c = this.state.player1Color;

        var p2c = this.state.player2Color;
        return <View>
            <Button color={p1c} onPress={() => { this.ChangeColor(0) }} title={"Color"} />
            <View name="Minion" style={{ flexWrap: 'nowrap', flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Button color={p1c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(false, 0) }} title={"-"} />
                <Button color={p1c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.addMinion(1) }} title={this.state.possibleMinions[this.state.minionsIndex1]}>
                </Button>
                <Button color={p1c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(true, 0) }} title={"+"} />
            </View>
            <Minion colorProp={p1c} playerNumber={1} minion={this.state.minions1} greyFunction={(index) => { this.GreyMinion(1, index) }} removeFunction={(index) => { this.RemoveMinion(1, index) }} minionGreyArray={this.state.minions1Grey} />

            <Button color={p1c} onPress={() => { this.changeHealth(false, 0) }} title={"-"} />
            <Text style={{ transform: [{ rotate: "180deg" }], color: "black", backgroundColor: p1c }}> Player 1: {this.state.health0}</Text>
            <Button color={p1c} onPress={() => { this.changeHealth(true, 0) }} title={"+"} />


            <Button color={p2c} onPress={() => { this.changeHealth(true, 1) }} title={"+"} />
            <Text style={{ color: "black", backgroundColor: p2c }}> Player 2:  {this.state.health1}</Text>
            <Button color={p2c} onPress={() => { this.changeHealth(false, 1) }} title={"-"} />
            <View name="Minion" style={{ flexWrap: 'nowrap', flexDirection: 'row', alignSelf: 'flex-start' }}>
                <Button color={p2c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(false, 1) }} title={"-"} />
                <Button color={ p2c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.addMinion(2) }} title={this.state.possibleMinions[this.state.minionsIndex2]}>
                </Button>
                <Button color={p2c} style={{ transform: [{ rotate: "180deg" }], display: "inline-block", width: "30%", flexWrap: 'nowrap' }} onPress={() => { this.changeMinion(true, 1) }} title={"+"} />
            </View>
            <Minion colorProp={p2c} playerNumber={2} minion={this.state.minions2} greyFunction={(index) => { this.GreyMinion(2, index) }} removeFunction={(index) => { this.RemoveMinion(2, index) }} minionGreyArray={this.state.minions2Grey} />

            <Button color={p2c} onPress={() => { this.ChangeColor(1) }} title={"Color"} />

        </View>

    }
}
function getImage(eachMinion) {

    var imageSourceToUse = 'Image';
    switch (eachMinion) {
        case MinionTypes.OneOne:
            imageSourceToUse += 1;
            break;
        case MinionTypes.TwoTwo:
            imageSourceToUse += 2;
            break;
        case MinionTypes.ThreeThree:
            imageSourceToUse += 3;
            break;
        case MinionTypes.FourFour:
            imageSourceToUse += 4;
            break;

        case MinionTypes.OneOneFlying:
            imageSourceToUse += 5;
            break;

        case MinionTypes.TwoTwoFlying:
            imageSourceToUse += 6;
            break;
    }
    var image = Images[imageSourceToUse];
    return image;
}
class Minion extends React.Component {
    constructor(props) {
        super(props);
    }
    renderMinion(color, minionGreyArray, isPlayer1, eachMinion, index, removeFunction, greyFunction) {

        var image = getImage(eachMinion);
        if (minionGreyArray[index] == true) {
            color = "gray";
        }
        //Get right image
        if (eachMinion == null) {
            return null;
        }

        if (isPlayer1) {
            return (
                <Pressable style={{ margin: "5%" }} key={index} delayLongPress={500} onPress={() => { greyFunction(index) }} onLongPress={() => { removeFunction(index) }} >
                    <Image
                        style={{ width: 50, height: 50, tintColor: color }}
                        source={image}
                    />
                </Pressable>
            );
        }
        else {
            return (
                <Pressable style={{ margin: "5%" }} key={index} delayLongPress={500} onPress={() => { greyFunction(index) }} onLongPress={() => { removeFunction(index) }}>
                <Image
                        style={{ width: 50, height: 50, tintColor: color }}
                        source={image}
                    />
                </Pressable >
            );
        }
    }
    render() {
        if (this.props.minion != null) {
            console.log("Drawing the following props: ", this.props.minion, "\n grey array ", this.props.minionGreyArray);
            return this.props.minion.map((eachMinion, index) => this.renderMinion(this.props.colorProp, this.props.minionGreyArray, (this.props.playerNumber ==1), eachMinion, index, this.props.removeFunction, this.props.greyFunction));
        }
        else {
            return null;
        }
    }
}