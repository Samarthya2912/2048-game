import React, { useCallback, useState } from 'react'
import { Input } from "baseui/input";
import { Button } from 'baseui/button';
import { gql, useApolloClient } from '@apollo/client';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { Toast, KIND } from 'baseui/toast';

const GET_AUTHENTICATED_USER = gql`
    query GetAuthenticatedUser($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            id
            username
            max_score
        }
    }
`

function Login() {
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const { setAuthState } = useAuthContext();

    const apolloClient = useApolloClient();

    const setUsername = useCallback((username: string) => {
        setLoginFormData({ ...loginFormData, username })
    }, [loginFormData])

    const setPassword = useCallback((password: string) => {
        setLoginFormData({ ...loginFormData, password })
    }, [loginFormData])

    const submitHandler = () => {
        apolloClient.query({
            query: GET_AUTHENTICATED_USER,
            variables: { ...loginFormData }
        })
            .then(res => {
                setAuthState({ ...res.data.user, isAuthenticated: true })
                navigate("/play");
            })
            .catch(err => {
                console.log(err)
                setError(err.message)
            })
    }

    return (
        <div>
            <h1>Login to play!</h1>
            {error && <Toast kind={KIND.negative}>{error}</Toast>}
            <Input
                value={loginFormData.username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                clearOnEscape
            />
            <Input
                value={loginFormData.password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                clearOnEscape
                type='password'
            />
            <Button onClick={submitHandler}>Submit</Button>
        </div>
    )
}

export default Login