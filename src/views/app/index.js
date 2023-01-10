import React, { Suspense, useContext } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { context } from 'App';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Gogo = React.lazy(() =>
    import( /* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
    import( /* webpackChunkName: "viwes-second-menu" */ './student')
);
const BlankPage = React.lazy(() =>
    import( /* webpackChunkName: "viwes-blank-page" */ './operator/blank-page')
);

const App = ({ match }) => {
    const [data, setData] = useContext(context)
    return (<
                AppLayout >
        <
                div className="dashboard-wrapper" >
            <
                Suspense fallback={< div className="loading" />} >
                <
                Switch > {
                        data.role === "admin" && < Redirect exact from={`${match.url}/`}
                            to={`${match.url}/admin`}
                        />} {
                        data.role === "student" && < Redirect exact from={`${match.url}/`}
                            to={`${match.url}/student`}
                        />} {
                        data.role === "course_operator" && < Redirect exact from={`${match.url}/`}
                            to={`${match.url}/operator`}
                        />} {
                        data.role === "admin" && < Route
                            path={`${match.url}/admin`}
                            render={
                                (props) => < Gogo {...props}
                                />} />
                    } {
                        data.role === "student" && < Route
                            path={`${match.url}/student`}
                            render={
                                (props) => < SecondMenu {...props}
                                />} />
                    } {
                        data.role === "course_operator" && < Route
                            path={`${match.url}/operator`}
                            render={
                                (props) => < BlankPage {...props}
                                />} />
                    } <
                        Redirect to="/error" />
                    <
                                /Switch> < /
                                Suspense > <
                                /div> < /
                                AppLayout >
                    );
                    };

                    const mapStateToProps = ({menu}) => {
                        const {containerClassnames} = menu;
                    return {containerClassnames};
                    };

                    export default withRouter(connect(mapStateToProps, { })(App));