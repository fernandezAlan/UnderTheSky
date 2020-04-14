import React from "react"
import Navbar from "../components/Navbar"
import { connect } from "react-redux";
import Headroom from 'react-headroom'
import {logoutUser,userLogin,addLogin} from "../actions/LoginAction"
import {getCart,cart} from "../actions/cartActions"
import {decrypt} from "../actions/RegisterAction"
import {withRouter} from "react-router-dom"
import {userOrders} from "../actions/orderActions"

const mapStateToProps = (state, ownprops) => {
    return {
        cartItems:state.cart.dataProducts,
        User: state.user.user,
     
    };
};

const mapDispatchToProps=(dispatch)=>{
    return{
        clearOrders:()=>dispatch(userOrders({})),
        getCart: ()=>dispatch(getCart()),
        logoutUser: ()=>dispatch(logoutUser()),
        cart: ()=>dispatch(cart([],[],[])),
        addLogin:(user)=>dispatch(addLogin(user))
    }
}
        


 class NavbarContainer extends React.Component{
     constructor(props){
         super()
             this.state={
                toggleDrop:false
             }
         this.handelLogout= this.handelLogout.bind(this)
         this.handlePerfil= this.handlePerfil.bind(this)
         this.toggleDropdown=this.toggleDropdown.bind(this)
     }

     componentDidMount(){
         let userPassword= localStorage.getItem("pass")
         let email=localStorage.getItem("email")
         
         if(!this.props.emailUser&&email){
            userLogin({email:email,password:decrypt(userPassword)})
            .then(user=> this.props.addLogin(user.data)).then(()=>{
                this.props.getCart()
              })
              .catch(err=>console.error(err))
         }
         
     }
         
    handlePerfil(){
        
        this.props.history.push("/userPerfil")
     }  

    handelLogout(){
       localStorage.removeItem("pass")
       localStorage.removeItem("email")
       this.props.logoutUser()
       this.props.cart()
       this.props.clearOrders()
       this.props.history.push("/")
    }
     
    toggleDropdown(){
        this.setState({toggleDrop:!this.state.toggleDrop})
    }
  
   
     
        
       
        


    render(){
        return (
            <Headroom>
                <Navbar
                    cartItems={this.props.cartItems}
                    User={this.props.User}
                    handelLogout={this.handelLogout}
                    handlePerfil={this.handlePerfil}
                    toggleDrop={this.state.toggleDrop}
                    toggleDropdown={this.toggleDropdown}
                />
            </Headroom>
        )
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavbarContainer))