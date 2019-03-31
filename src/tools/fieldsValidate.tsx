import {Form, Icon, Input} from "antd";
import {FormComponentProps} from "antd/lib/form";
import React from "react";
import {GetFieldDecoratorOptions, ValidateFieldsOptions} from "antd/lib/form/Form";
interface Props extends FormComponentProps{
  id?:string
}

let usernameVlidate = (rules: any, value: string, callback: any) => {
  if (value.includes("@")) {
    callback("用户名不能有@")
  }
  callback();
};
let usernameOption = () => {
  return {
    rules: [{
      required: true, message: '请输入用户名3-20个字符', min: 3, max: 20
    }, {
      validator: usernameVlidate
    }]
  }
};

let usernameField =()=> <Input prefix={<Icon type={'user'}/>}/>;
let passwordOption=()=>{
  return {
    rules: [{
      required: true, message: "密码至少8位", type: "string", min: 8, max: 20
    }]
  }
}
let passwordField=()=><Input type={'password'} prefix={<Icon type="lock"/>}/>
let compareFirstPassword = (rules: any, value: any, callback: any, password: string) => {
  if (value && value !== password) {
    callback("两次输入密码不一致!")
  }
  callback();
};
{/*那个repasswordoption函数有种mobx的感觉  只要password值变化了 所有依赖于password字段的decorator都会重新跑一遍*/}
let rePasswordOption=(password:string)=>{
  return {
    rules: [
      {
        required: true, message: "请输入确认密码", type: "string"
      },
      {
        validator: (rules, value, callback) => compareFirstPassword(rules, value, callback, password)
      }
    ]
  }
}
let rePasswordField=()=><Input type={'password'} prefix={<Icon type="lock"/>}/>
let emailOption=()=>{
  return {
    rules: [{
      required: true, type: "email", message: "邮箱格式错误哦"
    }]
  }
}
let emailField=()=><Input type={'email'}/>
let photoNameOption=()=>{
  let forreturn:GetFieldDecoratorOptions={
    rules: [
      {
        max: 50,message:"名称最多50个字符哦"
      }
    ]
  }
  return forreturn;
}
let photoNameField = () => <Input prefix={<Icon type="edit"/>}/>
let photoDescriptionOption=():GetFieldDecoratorOptions=>{
  return {
    rules:[
      {
        max:400,message:"描述不超过400字"
      }
    ]
  }
}
let photoDescriptionField=()=><Input prefix={<Icon type="edit"/>}/>
let albumNameOption = () => photoNameOption()
let albumNameField = () => photoNameField();
// let tagNameOption = (): GetFieldDecoratorOptions => {
//   return {
//     rules: [
//       {
//         max: 15, message: "标签过长了!"   //tag不要了把
//       }
//     ]
//   }
// };
// let tagNameField=()=>
let nickNameOption = (): GetFieldDecoratorOptions => {
  return {
    rules: [
      {
        max: 15, message: "昵称太长了啊,取个短点的吧"
      }
    ]
  }
};
let signatureOption=():GetFieldDecoratorOptions=>{
  return {
    rules: [
      {
        max:200,message:"你的签名太长了吧也"
      }
    ]
  }
}
let signatureField = () => nickNameField();
let nickNameField=()=><Input prefix={<Icon type="form" />}/>
export {
  signatureField,
  signatureOption,
  usernameOption,
  usernameField,
  passwordField,
  passwordOption,
  rePasswordOption,
  rePasswordField,
  emailField,
  emailOption,
  photoNameField,
  photoNameOption,
  photoDescriptionField,
  photoDescriptionOption
  ,
  albumNameField,
  albumNameOption,
  nickNameField,
  nickNameOption
};
