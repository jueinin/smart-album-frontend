import React, {Component} from 'react';
import {NavLink, NavLinkProps} from "react-router-dom";
import style from './customNavLink.module.css';
interface Props extends NavLinkProps{

}
class CustomNavLink extends Component<Props,{}> {
  render() {
    return (
      <NavLink activeClassName={`${style['style']} ${this.props.activeClassName}`} {...this.props}/>
    );
  }
}

export default CustomNavLink;