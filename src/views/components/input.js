/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import  Colors  from '../../const/colors'

const Input = ({label,image,error,password,onFocus=()=>{},...props}) =>{
    
    const [isFocused,setIsFocused]= React.useState(false);
    const [hidePassword,setHidePassowrd]= React.useState(password)
    return (
        <View style={{marginBottom:20}}>
            <Text style={style.label}>
                {label}
            </Text>
            <View 
                style={[
                    style.inputContainer,
                    {
                        borderColor:error 
                        ? Colors.red 
                        : isFocused 
                        ? Colors.darkBlue
                        : Colors.light,
                    },
                ]}>
                <Image 
                src={image} 
                style={{resizeMode:'contain',width:25,height:25,margin:10}} 
                />
            <TextInput 
            secureTextEntry={hidePassword}
            autoCorrect={false}
            onFocus={()=>{
                onFocus();
                setIsFocused(true);
            }}
            onBlur={()=>                                
                setIsFocused(false)
            }
            style={{color:Colors.black,flex:1}} 
            {...props}
            />
            {label == 'Password' ? <>
            <TouchableOpacity onPress={()=>setHidePassowrd(!hidePassword)} >
            <Image 
            
            src={hidePassword? "https://e7.pngegg.com/pngimages/869/354/png-clipart-computer-icons-eye-hiding-people-logo.png":"https://png.pngtree.com/png-vector/20190215/ourmid/pngtree-vector-eye-icon-png-image_515473.jpg"}
            style={{resizeMode:'contain',width:25,height:25,margin:10}}
            
            />

            </TouchableOpacity>

            </>:<></>}
            
            </View>
            {error && (<Text style={{color:Colors.red,fontSize:12,marginTop:7}}>
                {error}
                </Text>)}
            
        </View>
    )
}

const style = StyleSheet.create({
    label:{
        marginVertical:5,
        fontSize:14,
        color:Colors.black,
    },
    inputContainer:{
        height:55,
        backgroundColor:Colors.light,
        flexDirection:'row',
        paddingHorizontal:15,
        borderWidth:0.5,
        alignItems:'center',
    }
})
export default Input;