import React, { Component } from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, Button, Text, Alert } from 'react-native'
import Modal from "react-native-modal";
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Image  } from 'react-native-elements'
// import cross from '../assets/cross.png';
// import circle from '../assets/circle.png';
import { render } from 'react-dom';

export default class App extends Component {
   state = {
      player : true,
      gameStatus: [],
      selectedInput: "o",
      cross: require('../assets/cross.png'),
      circle: require('../assets/circle.png'),
      transparent: require('../assets/transparent.png'),
      isModalVisible: false,
   }

   onPressButton = (pos) => {
      //console.log('Click');
       if(this.state.gameStatus[pos] !== undefined ){
          console.log('Casilla ocupada', this.state.gameStatus[pos] );
        }else{
          let newGameStatus = this.state.gameStatus;
          let input = this.state.selectedInput === "x" ? "o" : "x"
          newGameStatus[pos] = this.state.selectedInput;
          let columnas
          let filas
          for(let i = 0; i<3; i++){
            if(!filas && !columnas){
               columnas = (newGameStatus[i] === newGameStatus[i +3] && newGameStatus[i +3] === newGameStatus[i+6]) &&  (newGameStatus[i] !==undefined && newGameStatus[i +3] !== undefined && newGameStatus[i+6] !== undefined)
               filas = (newGameStatus[i *3] === newGameStatus[i*3 +1] && newGameStatus[i*3 +1] === newGameStatus[i*3+2]) && ((newGameStatus[i *3] !== undefined && newGameStatus[i*3 +1] !==undefined && newGameStatus[i*3+2] !== undefined))                           
            }            
          }
          let diagonal = ((newGameStatus[0] ===  newGameStatus[4] &&  newGameStatus[4] === newGameStatus[8]) && (newGameStatus[0]  !== undefined && newGameStatus[4] !==undefined &&  newGameStatus[8] !==undefined)) || ((newGameStatus[2] === newGameStatus[4] && newGameStatus[4] === newGameStatus[6]) && (newGameStatus[2] !==undefined && newGameStatus[4] !==undefined && newGameStatus[6] !==undefined ))
          if(diagonal || columnas || filas){
            this.toggleModal()
            console.log("Ha ganado el jugador con " + this.state.selectedInput)
          }
          let end = true
          for(let i = 0; i < 9; i++){
            if(newGameStatus[i] === undefined){
               end = false
            }
          }
         //    if(item === undefined){
         //       end = false
         //    }
         //  })
          if(end){
             console.log('toggle')
             this.toggleModal()
          }
          this.setState({gameStatus: newGameStatus, player: false, selectedInput: input})
       }
   }
   
   toggleModal = () => {
      console.log('modaaaal')
      this.setState({ isModalVisible: !this.state.isModalVisible });
   };
   render(){
      return (
         <View>
            <Grid >            
            <View style = {styles.container}>
               <View style = {styles.whitebox} >
                  <TouchableWithoutFeedback onPress={() => this.onPressButton(0)}>
                     <View>
                        {this.state.gameStatus[0] ? <Image  source={ this.state.gameStatus[0] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
               <View style = {styles.whitebox}>
               <TouchableHighlight onPress={() => this.onPressButton(1)}>
                     <View>
                     {this.state.gameStatus[1] ? <Image  source={this.state.gameStatus[1] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View>
               <View style = {styles.whitebox}>
               <TouchableHighlight onPress={() =>this.onPressButton(2)}>
                     <View>
                     {this.state.gameStatus[2] ? <Image  source={ this.state.gameStatus[2] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View>            
            </View>
            <View style = {styles.container}>
            <View style = {styles.whitebox} >
                  <TouchableHighlight onPress={() =>this.onPressButton(3)}>
                     <View>
                     {this.state.gameStatus[3] ? <Image  source={ this.state.gameStatus[3] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View>
               <View style = {styles.whitebox}>
               <TouchableHighlight onPress={() =>this.onPressButton(4)}>
                     <View>
                     {this.state.gameStatus[4] ? <Image  source={ this.state.gameStatus[4] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View>
               <View style = {styles.whitebox}>
               <TouchableHighlight onPress={() =>this.onPressButton(5)}>
                     <View>
                     {this.state.gameStatus[5] ? <Image  source={ this.state.gameStatus[5] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View> 
            </View>
            <View style = {styles.container} >
               <View style = {styles.whitebox} >
                     <TouchableHighlight onPress={() =>this.onPressButton(6)}>
                        <View>
                        {this.state.gameStatus[6] ? <Image  source={ this.state.gameStatus[6] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                        </View>
                     </TouchableHighlight>
                  </View>
                  <View style = {styles.whitebox}>
                     <TouchableHighlight onPress={() =>this.onPressButton(7)}>
                        <View>
                        {this.state.gameStatus[7] ? <Image  source={ this.state.gameStatus[7] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                        </View>
                     </TouchableHighlight>
                  </View>
                  <View style = {styles.whitebox}>
                  <TouchableHighlight onPress={() =>this.onPressButton(8)}>
                     <View>
                     {this.state.gameStatus[8] ? <Image  source={ this.state.gameStatus[8] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableHighlight>
               </View>
            </View>                       
            </Grid>
               <Modal isVisible={this.state.isModalVisible}>
                  <View style={{ flex: 1 }}>                  
                     <Button title="Restart" onPress={() => {this.setState({gameStatus: [], player: false, selectedInput: "o"}); this.toggleModal()}} />
                     {/* <Text>I am the modal content!</Text> */}
                  </View>
               </Modal>
            {/* <Button
               title="Restart"
               // color="#f194ff"
               onPress={() => {this.setState({gameStatus: [], player: false, selectedInput: "o"}); this.toggleModal()}}               
               // onPress={() => Alert.alert('Button with adjusted color pressed')}
            /> */}
         </View>         
      )
   }
}
const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      justifyContent: 'center',      
      alignItems: 'center',
      flexGrow : 1,
   },
   containerCol: {
      flexDirection: 'column',
      justifyContent: 'space-around',
   },
   whitebox: {
      width: 100,
      height: 100,
      borderColor: 'black',
      borderWidth: 2,
      backgroundColor: 'white'
   },
   blackbox: {
      width: 100,
      height: 100,
      backgroundColor: 'black'
   },
})


