import React, {Component} from 'react';
import style from './navbarLink.module.css';
import {Col} from "antd";
import {Link} from "react-router-dom";
interface Props {
  offset?: number;
  title: string;
  path: string;
  className?: string;
  active?: boolean;
  linkClassName?: string;
}
class NavbarLink extends Component<Props,{}> {
  render() {
    return (
      <Col span={2} offset={this.props.offset ? this.props.offset : 0}>
        <Link className={`${style.link} ${this.props.className || ""}`}
              style={this.props.active ? {borderBottom: "3px solid yellow"} : {}}
              to={this.props.path}>
          <span className={this.props.linkClassName || ""}>
          {this.props.title}
        </span>
        </Link>
      </Col>
    );
  }
}

export default NavbarLink;