import React, { Component } from "react";

export default class AsyncRender extends Component {
    render() {
        const { isLoading, loaderFunc, renderFunc } = this.props;

        if (isLoading) {
            return loaderFunc();
        } else {
            return renderFunc();
        }
    }
}
