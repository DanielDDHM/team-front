/**
 *
 * Loader
 *
 */

import React from 'react';
import { connect } from "react-redux";
import { MagicSpinner } from 'react-spinners-kit';
// @ts-ignore
import Variables from "styles/variables.scss";
import './styles.scss';

export class Loader extends React.Component<any, any> {
    componentDidUpdate(prevProps: any) {
        const { loader } = this.props;

        if (prevProps.loader !== loader) {
            if (loader) {
                document.body.classList.add('--app-loading');
            } else {
                document.body.classList.remove('--app-loading');
            }
        }
    }

    render() {
        const { loader } = this.props;

        return (
            <div style={{ opacity: loader ? 1 : 0, pointerEvents: loader ? 'all' : 'none' }} className="Loader">
                <MagicSpinner color={Variables.primaryColor} size={120} />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    loader: state.loader,
});

export default connect(mapStateToProps)(Loader);