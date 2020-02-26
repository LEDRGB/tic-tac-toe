import React, { Component } from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, Button, Text } from 'react-native'
import Modal from "react-native-modal";
import { Grid } from 'react-native-easy-grid';
import { Image  } from 'react-native-elements'
import {
   AdMobBanner
 } from 'expo-ads-admob';
// import cross from '../assets/cross.png';
// import circle from '../assets/circle.png';
import { render } from 'react-dom';

export default class App extends Component {
   state = {
      player : false,
      gameStatus: [],
      selectedInput: "x",
      cross: require('../assets/cross.png'),
      circle: require('../assets/circle.png'),
      backGroundCounter: 1,
      backGrounds: [
         require('../assets/fondoPlanetas.jpg'),
         require('../assets/fondoluna.jpg'),
         require('../assets/fondoSuperheroes.jpg'),
         require('../assets/naturaleza.jpg'),
         require('../assets/art.jpg')
      ],
      backGround:  require('../assets/fondoPlanetas.jpg'),
      transparent: require('../assets/transparent.png'),
      isModalVisible: false,
      modalText: "The winner is no one.",
      iaStatus: false,

   }
  bannerError() {
      console.log("An error");
      return;
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
               this.setState({modalText: "The winner is " + (this.state.player ?  "P2" : "P1"), iaStatus: false})
            }
            else{
               let end = true
               for(let i = 0; i < 9; i++){
                  if(newGameStatus[i] === undefined){
                     end = false
                  }
               }         
               if(end){
                  this.setState({modalText: "The winner is no one.", iaStatus: false})
                  this.toggleModal()
               }
               this.setState({gameStatus: newGameStatus, player: !this.state.player, selectedInput: input})
               if(this.state.iaStatus){
                  newGameStatus = this.calculateIaMovement(newGameStatus)
                  for(let i = 0; i<3; i++){
                     if(!filas && !columnas){
                        columnas = (newGameStatus[i] === newGameStatus[i +3] && newGameStatus[i +3] === newGameStatus[i+6]) &&  (newGameStatus[i] !==undefined && newGameStatus[i +3] !== undefined && newGameStatus[i+6] !== undefined)
                        filas = (newGameStatus[i *3] === newGameStatus[i*3 +1] && newGameStatus[i*3 +1] === newGameStatus[i*3+2]) && ((newGameStatus[i *3] !== undefined && newGameStatus[i*3 +1] !==undefined && newGameStatus[i*3+2] !== undefined))                           
                     }            
                  }
                  let diagonal = ((newGameStatus[0] ===  newGameStatus[4] &&  newGameStatus[4] === newGameStatus[8]) && (newGameStatus[0]  !== undefined && newGameStatus[4] !==undefined &&  newGameStatus[8] !==undefined)) || ((newGameStatus[2] === newGameStatus[4] && newGameStatus[4] === newGameStatus[6]) && (newGameStatus[2] !==undefined && newGameStatus[4] !==undefined && newGameStatus[6] !==undefined ))
                  if(diagonal || columnas || filas){
                     this.toggleModal()
                     this.setState({modalText: "The winner is " + (this.state.player ?  "P2" : "P1"), iaStatus: false})
                  }
                  end = true
                  for(let i = 0; i < 9; i++){
                     if(newGameStatus[i] === undefined){
                        end = false
                     }
                  }         
                  if(end){
                     this.setState({modalText: "The winner is no one.", iaStatus: false})
                     this.toggleModal()
                  }
      
               }
            }
          
       }
   }
   calculateIaMovement = (newGameStatus) => {
      let index = Math.floor(Math.random() * 7);
      console.log(index)
      for(let i = 0; i<9; i++){
         if(newGameStatus[index] === undefined){
            newGameStatus[index] = "x";
            this.setState({gameStatus: newGameStatus, player: true, selectedInput: "o"})
            i = 10
         }
         if(index === 8){
            index = 0
         }else{
            index = index +1
         }
      }
         return newGameStatus
      
      // if(size === 2){
      //    if(newGameStatus[6] === undefined){
      //       newGameStatus[6] = "x";
      //       this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //    }else{
      //       newGameStatus[3] = this.state.selectedInput;
      //       this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //    }
      // }
      // if(size === 4){
      //    if(newGameStatus[6] === undefined){
      //       if(newGameStatus[1] === undefined ){
      //          newGameStatus[1] = "x";
      //          this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //       }
      //       else{
      //          newGameStatus[4] = this.state.selectedInput;
      //          this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //       }               
      //    }else{
      //       if(newGameStatus[3] === undefined ){
      //          newGameStatus[3] = this.state.selectedInput;
      //          this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //       }
      //       else{
      //          newGameStatus[4] = this.state.selectedInput;
      //          this.setState({gameStatus: newGameStatus, player: true, selectedInput: input})
      //       }  
      //    }
      // }
      
   }
   
   toggleModal = () => {
      this.setState({ isModalVisible: !this.state.isModalVisible });
   };
   changeBackground = () => {
      let counter = this.state.backGroundCounter +1
      if(this.state.backGroundCounter >= this.state.backGrounds.length -1){
         counter = 0
      }
      this.setState({ backGround: this.state.backGrounds[counter], backGroundCounter : counter });
   }
   enableIa = () => {
      this.setState({gameStatus: ["x"], player: false, selectedInput: "o", iaStatus: true, player:true}); 
   }
   render(){
      return (
         <Image source={this.state.backGround} style={styles.backGround}>
            <View style={styles.containerView}>
            <View style={styles.playerMarker}>
            {this.state.player ?  <Text style={styles.titlePlayerP2}>{"P2"}</Text> :<Text style={styles.titlePlayerP1}>{"P1"}</Text>}   
            </View>
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
               <TouchableWithoutFeedback onPress={() => this.onPressButton(1)}>
                     <View>
                     {this.state.gameStatus[1] ? <Image  source={this.state.gameStatus[1] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
               <View style = {styles.whitebox}>
               <TouchableWithoutFeedback onPress={() =>this.onPressButton(2)}>
                     <View>
                     {this.state.gameStatus[2] ? <Image  source={ this.state.gameStatus[2] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>            
            </View>
            <View style = {styles.container}>
            <View style = {styles.whitebox} >
                  <TouchableWithoutFeedback onPress={() =>this.onPressButton(3)}>
                     <View>
                     {this.state.gameStatus[3] ? <Image  source={ this.state.gameStatus[3] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
               <View style = {styles.whitebox}>
               <TouchableWithoutFeedback onPress={() =>this.onPressButton(4)}>
                     <View>
                     {this.state.gameStatus[4] ? <Image  source={ this.state.gameStatus[4] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
               <View style = {styles.whitebox}>
               <TouchableWithoutFeedback onPress={() =>this.onPressButton(5)}>
                     <View>
                     {this.state.gameStatus[5] ? <Image  source={ this.state.gameStatus[5] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View> 
            </View>
            <View style = {styles.container} >
               <View style = {styles.whitebox} >
                     <TouchableWithoutFeedback onPress={() =>this.onPressButton(6)}>
                        <View>
                        {this.state.gameStatus[6] ? <Image  source={ this.state.gameStatus[6] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                        </View>
                     </TouchableWithoutFeedback>
                  </View>
                  <View style = {styles.whitebox}>
                     <TouchableWithoutFeedback onPress={() =>this.onPressButton(7)}>
                        <View>
                        {this.state.gameStatus[7] ? <Image  source={ this.state.gameStatus[7] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                        </View>
                     </TouchableWithoutFeedback>
                  </View>
                  <View style = {styles.whitebox}>
                  <TouchableWithoutFeedback onPress={() =>this.onPressButton(8)}>
                     <View>
                     {this.state.gameStatus[8] ? <Image  source={ this.state.gameStatus[8] === 'x' ? this.state.cross : this.state.circle } style={{ width: 100, height: 100 }}/> : <Image  source={this.state.transparent} style={{ width: 100, height: 100 }}/>}
                     </View>
                  </TouchableWithoutFeedback>
               </View>
            </View>                       
            </Grid>
               <Modal isVisible={this.state.isModalVisible}>
                  <View style={{ flex: 1 }}>                  
                     <Button title="Restart" onPress={() => {this.setState({gameStatus: [], player: false, selectedInput: "o"}); this.toggleModal(); }} />
                     <AdMobBanner
                        bannerSize="fullBanner"
                        adUnitID= "ca-app-pub-9330146669440542/5854606848"
                        testDeviceID="EMULATOR"
                        servePersonalizedAds // true or false
                        onDidFailToReceiveAdWithError={this.bannerError} 
                     />
                     <Text style={styles.titleText}>{this.state.modalText}</Text>
                  </View>
               </Modal>
               <View style={styles.iaButton}>
                  <Button style={styles.iaButton} title="Play with the IA" onPress={() => {this.enableIa()}} />
               </View>
               <View style={styles.backGroundButton}>
                  <Button style={styles.backGroundButton} title="Change background" onPress={() => {this.changeBackground()}} />
               </View>
               </View>
         </Image>         
      )
   }
}
const styles = StyleSheet.create ({
   container: {
      flexDirection: 'column',
      justifyContent: 'center',      
      alignItems: 'center',
      marginTop: -350,
      flexGrow : 1,
   },
   backGround: {
      flex: 1,
      width: 500,
      resizeMode: 'stretch',
      flexDirection: 'column',
      justifyContent: 'center',      
      alignItems: 'center',
      
    },
    containerView: {
      flex: 1,
      //resizeMode: 'cover',
      // remove width and height to override fixed static size
      width: 300,
      height: null,
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
   titleText: {
      alignItems: 'center',
      justifyContent: 'center',   
      flexDirection: 'column',
      backgroundColor: 'blue',
      fontSize: 35,
      fontWeight: 'bold',
    },
    titlePlayerP1: {
      alignItems: 'center',
      justifyContent: 'center',   
      flexDirection: 'column',
      width: 50,
      marginTop: -40,
      backgroundColor: 'blue',
      fontSize: 35,
      fontWeight: 'bold',
    },
    titlePlayerP2: {
      alignItems: 'center',
      justifyContent: 'center',   
      flexDirection: 'column',
      marginTop: -40,
      width: 50,
      backgroundColor: 'red',
      fontSize: 35,
      fontWeight: 'bold',
    },
    playerMarker: {
      flexDirection: 'row',
      justifyContent: 'center',      
      alignItems: 'center',
      flexGrow : 1,
    },
    iaButton: {
      marginBottom: 30,
    },
    backGroundButton:  {
      marginBottom: 30,
    },
})


